import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const CliReference = () => {
  return (
    <DocSection
      id="cli-reference"
      title="CLI Command Reference"
      description="Manage your UltimateRAG instance via the command line."
    >
      <div className="space-y-12">
        {/* Helper Commands */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            General Commands
          </h3>
          <p className="text-slate-600 mb-4">
            Basic commands to check the system status and information.
          </p>
          <CodeBlock
            title="Bash"
            language="bash"
            code={`# Show version
ultimaterag version

# Show project info
ultimaterag about

# Display license
ultimaterag license

# Show full help guide
ultimaterag help`}
          />
        </div>

        {/* Start Server */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Starting the Server
          </h3>
          <p className="text-slate-600 mb-4">
            Launch the API server and RAG engine.
          </p>
          <CodeBlock
            title="Bash"
            language="bash"
            code={`# Default start (Host: 0.0.0.0, Port: 8000)
ultimaterag start

# Custom host and port with reload disabled
ultimaterag start --host 127.0.0.1 --port 8080 --no-reload`}
          />
        </div>

        {/* Custom Example */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Running Custom Examples
          </h3>
          <p className="text-slate-600 mb-4">
            You can run standalone scripts that use the <code>ultimaterag</code>{" "}
            library directly.
          </p>
          <CodeBlock
            title="Bash"
            language="bash"
            code={`# Run the provided example.py
python example.py`}
          />
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-900">
            <p>
              <strong>Note:</strong> <code>example.py</code> starts a separate
              server on port <strong>8001</strong>.
            </p>
          </div>
        </div>
      </div>
    </DocSection>
  )
}

export default CliReference
