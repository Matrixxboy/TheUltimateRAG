import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
load_dotenv()

class Settings(BaseSettings):
    TERM: str = os.getenv("TERM", "unknown") # woeking on this
    SHELL: str = os.getenv("SHELL", "unknown") # working on this
    # Application Settings
    APP_NAME: str = os.getenv("APP_NAME", "TheUltimateRAG")
    APP_ENV: str = os.getenv("APP_ENV", "development")
    DEBUG: bool = os.getenv("DEBUG", "True")
    
    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    MODEL_NAME: str = os.getenv("MODEL_NAME", "gpt-3.5-turbo")
    
    # Vector Store
    VECTOR_DB_PATH: str = os.getenv("VECTOR_DB_PATH")
    COLLECTION_NAME: str = os.getenv("COLLECTION_NAME")
    EMBEDDING_DIMENSION: int = int(os.getenv("EMBEDDING_DIMENSION", 384))
    
    # Memory
    MEMORY_WINDOW_SIZE: int = int(os.getenv("MEMORY_WINDOW_SIZE", 10))
    SHORT_TERM_MEMORY_LIMIT: int = int(os.getenv("SHORT_TERM_MEMORY_LIMIT", 5)) # Legacy fallback
    MEMORY_WINDOW_LIMIT: int = int(os.getenv("MEMORY_WINDOW_LIMIT", 5)) # N threshold for moving window

    # Postegresql VectorDB
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB","Vector_DB")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER","postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD","postgres")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT","5432")

    # Redis (Short-Term Memory)
    REDIS_HOST: str = os.getenv("REDIS_HOST", "redis-19385.c270.us-east-1-3.ec2.cloud.redislabs.com")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", 19385))
    REDIS_PASSWORD: str = os.getenv("REDIS_PASSWORD", "CrKtQrNr4ChEFaLaz7K8qDRcXr4QqtcG")
    REDIS_USER: str = os.getenv("REDIS_USER", "default")
    REDIS_DB: str = os.getenv("REDIS_DB", "0")

    @property
    def REDIS_URL(self) -> str:
        try:
            if self.REDIS_PASSWORD:
                return f"redis://{self.REDIS_USER}:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
            return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
        except Exception:
            # Fallback or logging could go here, but avoiding print for cleanliness
            return ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
