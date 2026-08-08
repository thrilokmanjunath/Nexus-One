from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
import uuid
import json
import litellm
import os

class Tool(ABC):
    def __init__(self, name: str, description: str, parameters: dict = None):
        self.name = name
        self.description = description
        # JSON Schema for parameters
        self.parameters = parameters or {"type": "object", "properties": {}}
        
    @abstractmethod
    def execute(self, **kwargs) -> Any:
        pass

    def to_openai_tool(self) -> dict:
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": self.parameters
            }
        }

class Agent(ABC):
    def __init__(self, name: str, role: str, goal: str, tools: List[Tool] = None, model: str = None):
        self.id = str(uuid.uuid4())
        self.name = name
        self.role = role
        self.goal = goal
        self.tools = tools or []
        self.model = model or os.getenv("DEFAULT_MODEL", "gpt-4o-mini")
        
    @abstractmethod
    def run(self, input_data: str) -> str:
        """Executes the agent's primary loop."""
        pass

class SimpleAgent(Agent):
    def run(self, input_data: str) -> str:
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"Agent '{self.name}' starting execution with goal: {self.goal}")
        
        messages = [
            {"role": "system", "content": f"You are {self.name}, {self.role}. Your goal is: {self.goal}. Always structure your final answer clearly."},
            {"role": "user", "content": input_data}
        ]
        
        litellm_tools = [tool.to_openai_tool() for tool in self.tools] if self.tools else None
        
        max_loops = 5
        loop_count = 0
        
        while loop_count < max_loops:
            loop_count += 1
            logger.debug(f"Agent '{self.name}' execution loop {loop_count}/{max_loops}")
            
            try:
                response = litellm.completion(
                    model=self.model,
                    messages=messages,
                    tools=litellm_tools if litellm_tools else None
                )
                
                message = response.choices[0].message
                messages.append(message.model_dump(exclude_none=True))
                
                if message.tool_calls:
                    for tool_call in message.tool_calls:
                        func_name = tool_call.function.name
                        try:
                            func_args = json.loads(tool_call.function.arguments)
                        except:
                            func_args = {}
                            
                        logger.info(f"Agent '{self.name}' invoking tool: {func_name} with args: {func_args}")
                        
                        # Find and execute tool
                        tool_result = f"Error: Tool {func_name} not found."
                        for t in self.tools:
                            if t.name == func_name:
                                try:
                                    tool_result = str(t.execute(**func_args))
                                except Exception as e:
                                    logger.error(f"Error executing tool {func_name}: {e}")
                                    tool_result = f"Error executing tool: {e}"
                                break
                                
                        messages.append({
                            "role": "tool",
                            "tool_call_id": tool_call.id,
                            "content": tool_result
                        })
                else:
                    final_answer = message.content or "No response generated."
                    logger.info(f"Agent '{self.name}' completed execution successfully.")
                    return final_answer
                    
            except Exception as e:
                logger.error(f"Agent '{self.name}' encountered an error: {e}")
                return f"Agent encountered an error: {e}"
                
        logger.warning(f"Agent '{self.name}' stopped after reaching maximum iteration limit.")
        return "Agent stopped after reaching maximum iteration limit."

class AgentCrew:
    """Manages a group of agents."""
    def __init__(self, agents: List[Agent]):
        self.agents = agents
        
    def execute_task(self, task_description: str) -> str:
        # Simplified sequential execution
        if not self.agents:
            return "No agents available."
            
        current_input = task_description
        for agent in self.agents:
            current_input = agent.run(current_input)
            
        return current_input
