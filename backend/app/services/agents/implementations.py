from app.services.agent_framework import Agent, SimpleAgent, Tool

class WebSearchTool(Tool):
    def __init__(self):
        super().__init__(
            name="web_search",
            description="Searches the web for information.",
            parameters={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "The search query."}
                },
                "required": ["query"]
            }
        )
        
    def execute(self, query: str) -> str:
        # Mock web search for demonstration
        return f"Found results for '{query}': Example search result."

class PythonExecutionTool(Tool):
    def __init__(self):
        super().__init__(
            name="execute_python",
            description="Executes python code for data analysis or visualization.",
            parameters={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Python code to execute."}
                },
                "required": ["code"]
            }
        )
        
    def execute(self, code: str) -> str:
        # We would use a sandbox here, but for now we just return a success string
        return "Code executed successfully."

class SQLQueryTool(Tool):
    def __init__(self):
        super().__init__(
            name="execute_sql",
            description="Executes a SQL query on the database.",
            parameters={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "SQL query to execute."}
                },
                "required": ["query"]
            }
        )
        
    def execute(self, query: str) -> str:
        # We would execute this on the DB here
        return "Query executed successfully. Returns 5 rows."

def get_research_agent() -> Agent:
    return SimpleAgent(
        name="ResearchAgent",
        role="Senior Researcher",
        goal="Find the most accurate and up-to-date information on the web.",
        tools=[WebSearchTool()]
    )

def get_data_analysis_agent() -> Agent:
    return SimpleAgent(
        name="DataAnalysisAgent",
        role="Data Scientist",
        goal="Analyze data and uncover insights using Python.",
        tools=[PythonExecutionTool()]
    )

def get_data_visualization_agent() -> Agent:
    return SimpleAgent(
        name="DataVisualizationAgent",
        role="Data Viz Expert",
        goal="Create beautiful charts and graphs from data.",
        tools=[PythonExecutionTool()]
    )

def get_sql_agent() -> Agent:
    return SimpleAgent(
        name="SQLAgent",
        role="Database Engineer",
        goal="Query databases to retrieve structured data.",
        tools=[SQLQueryTool()]
    )
