import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const EnvSetup = () => {
  return (
    <DocSection
      title="Environment Configuration"
      description="Configure your LLM providers, Database connections, and System settings."
    >
      <div className="space-y-12">
        {/* Usage Explanation */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Setup Instructions
          </h3>
          <p className="text-slate-600 mb-4">
            Create a file named <code>.env</code> in your project root. The
            application automatically loads this file at startup using{" "}
            <code>pydantic-settings</code>.
          </p>
        </div>

        {/* The .env File */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Complete .env Reference
          </h3>
          <CodeBlock
            title=".env"
            language="bash"
            code={`# --- Core App Settings ---
APP_NAME="TheUltimateRAG"
APP_ENV="development" # or production
DEBUG=True

# --- LLM Provider (Choose one) ---
LLM_PROVIDER="openai" # options: openai, ollama, anthropic
OPENAI_API_KEY="sk-..."
# OLLAMA_BASE_URL="http://localhost:11434"
# ANTHROPIC_API_KEY="sk-ant-..."

# --- Embedding Provider ---
EMBEDDING_PROVIDER="openai" # options: openai, ollama, huggingface
EMBEDDING_DIMENSION=1536 # Must match your model

# --- Vector Database ---
VECTOR_DB_TYPE="chroma" # options: chroma, postgres
VECTOR_DB_PATH="./chroma_db"
COLLECTION_NAME="rag_collection"

# --- Memory (Redis) ---
REDIS_URL="redis://localhost:6379/0"
MEMORY_WINDOW_LIMIT=10 # Number of turns to keep in hot memory

# --- Long Term Memory (Postgres - Optional) ---
# POSTGRES_USER="postgres"
# POSTGRES_PASSWORD="password"
# POSTGRES_DB="rag_memory"
# POSTGRES_HOST="localhost"
# POSTGRES_PORT=5432`}
          />
        </div>

        {/* Python Usage */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Accessing Settings in Code
          </h3>
          <p className="text-slate-600 mb-4">
            You can access these validated settings anywhere in your python code
            using the singleton instance.
          </p>
          <CodeBlock
            title="Python"
            language="python"
            code={`from theultimaterag.config import settings

# Access typed configuration
print(f"Current LLM: {settings.LLM_PROVIDER}")
print(f"Debug Mode: {settings.DEBUG}")

# Database connection string construction
db_url = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}..."`}
          />
        </div>
      </div>
    </DocSection>
  )
}

export default EnvSetup
