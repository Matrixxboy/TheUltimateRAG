import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const Architecture = () => {
  return (
    <DocSection
      id="architecture"
      title="System Architecture"
      description="Deep dive into the modular design patterns and component interactions."
    >
      <div className="space-y-12">
        {/* Core Principles */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Core Design Patterns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PatternCard
              title="Factory Pattern"
              desc="We use Factory classes (LLMFactory, VectorDBFactory) to abstract away provider specifics. This allows switching between OpenAI, Ollama, or Postgres without changing the core business logic."
            />
            <PatternCard
              title="Singleton Pattern"
              desc="The `RAGPipeline` (in `container.py`) is instantiated once as a singleton. This ensures database connections and heavy model loaders are only initialized once during app startup."
            />
            <PatternCard
              title="Dependency Injection"
              desc="All configuration is injected via the `Settings` pydantic model. Components do not read env vars directly but rely on this typed configuration object."
            />
          </div>
        </div>

        {/* Extending */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Extending the System
          </h3>
          <p className="text-slate-600 mb-4">
            Since we use the Factory pattern, adding a new provider (e.g., a
            custom locally hosted LLM) is straightforward.
          </p>
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-2">
                1. Implement Interface
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Create a new class that inherits from <code>BaseLLM</code>.
              </p>
              <CodeBlock
                title="src/providers/my_llm.py"
                language="python"
                code={`class MyCustomLLM(BaseLLM):
    def invoke(self, prompt: str) -> str:
        # Call your custom model API
        return call_my_model(prompt)`}
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-2">
                2. Register in Factory
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Add your key to the <code>LLMFactory</code> dispatcher.
              </p>
              <CodeBlock
                title="src/core/factory.py"
                language="python"
                code={`class LLMFactory:
    @staticmethod
    def create(provider: str, **kwargs):
        if provider == "my_custom":
            return MyCustomLLM(**kwargs)
        # ... existing providers`}
              />
            </div>
          </div>
        </div>
      </div>
    </DocSection>
  )
}

const PatternCard = ({ title, desc }) => (
  <div className="p-5 bg-white border-l-4 border-indigo-500 rounded-r-lg shadow-sm">
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-slate-600 text-sm">{desc}</p>
  </div>
)

export default Architecture
