from typing import List, Dict, Any
import os
import litellm

# Configure API keys (In production, these come from environment variables)
litellm.api_key = os.getenv("OPENAI_API_KEY", "sk-mock-openai")
litellm.gemini_key = os.getenv("GEMINI_API_KEY", "mock-gemini")
litellm.anthropic_key = os.getenv("ANTHROPIC_API_KEY", "mock-anthropic")

class GenAIService:
    def __init__(self):
        # Allow default provider logic if not set in call
        self.default_model = os.getenv("DEFAULT_MODEL", "gpt-4o-mini")
        
        # Fallback list for resilience
        self.fallbacks = [
            {"model": "gemini/gemini-1.5-flash"},
            {"model": "claude-3-haiku-20240307"}
        ]
        
    def generate_completion(self, prompt: str, max_tokens: int = 100, model: str = None) -> str:
        """Real LLM completion using litellm with fallback support"""
        try:
            target_model = model or self.default_model
            response = litellm.completion(
                model=target_model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=max_tokens,
                fallbacks=self.fallbacks
            )
            return response.choices[0].message.content
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Error calling {target_model} and fallbacks: {e}")
            return f"Error processing request: {str(e)}"

    def generate_embeddings(self, texts: List[str], model: str = "text-embedding-3-small") -> List[List[float]]:
        """Real Embeddings generation using litellm"""
        try:
            response = litellm.embedding(
                model=model,
                input=texts
            )
            return [data['embedding'] for data in response.data]
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Error calling embedding model {model}: {e}")
            # Fallback to zeros if everything fails
            return [[0.0] * 1536 for _ in texts]

