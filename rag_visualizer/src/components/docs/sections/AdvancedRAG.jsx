import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const AdvancedRAG = () => {
  return (
    <DocSection
      title="Advanced Self-Correction"
      description="Utilize the Graph-based Workflow Engine for complex, multi-step reasoning."
    >
      <div className="space-y-12">
        {/* Intro */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Direct Workflow Usage
          </h3>
          <p className="text-slate-600 mb-4">
            You can bypass the simplified RAG engine and use the{" "}
            <code>WorkflowEngine</code> directly for full control over the
            retrieval-grading-generation loop.
          </p>
        </div>

        {/* Import */}
        <div>
          <h4 className="font-bold text-slate-700 mb-2">1. Import Module</h4>
          <CodeBlock
            title="Python"
            language="python"
            code={`from ultimaterag.core.workflows.engine import WorkflowEngine

# Initialize the engine (loads graders and rewriters)
workflow = WorkflowEngine()`}
          />
        </div>

        {/* Execution */}
        <div>
          <h4 className="font-bold text-slate-700 mb-2">2. Execute Graph</h4>
          <p className="text-slate-600 mb-4 text-sm">
            The <code>run()</code> method accepts a query and returns the final
            synchronization state, including the steps taken (e.g., if it had to
            rewrite the query).
          </p>
          <CodeBlock
            title="Python"
            language="python"
            code={`# Run the self-correcting loop
result = workflow.run("Explain the impact of quantum computing on cryptography")

# Inspect the path taken
print("Steps Taken:", result["steps"]) 
# Output: ['retrieve', 'transform_query', 'retry_retrieve', 'generate']

# Get the final answer
print("Answer:", result["generation"])`}
          />
        </div>

        {/* Customization */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Customizing the Graph
          </h3>
          <p className="text-slate-600 mb-4">
            You can override the default node logic by subclassing{" "}
            <code>WorkflowEngine</code>.
          </p>
          <CodeBlock
            title="Python"
            language="python"
            code={`class CustomWorkflow(WorkflowEngine):
    def grade_documents(self, documents, query):
        # Implement custom grading logic here
        pass`}
          />
        </div>
      </div>
    </DocSection>
  )
}

export default AdvancedRAG
