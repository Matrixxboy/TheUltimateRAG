import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const Intro = () => {
  return (
    <DocSection
      title="Getting Started"
      description="Install, Launch, and Chat in under 2 minutes."
    >
      <div className="space-y-12">
        {/* 1. Installation */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-800">Installation</h3>
          </div>

          <p className="text-slate-600 mb-4 ml-11">
            Install the package from PyPI. We recommend using a virtual
            environment (venv or conda).
          </p>

          <div className="ml-11">
            <CodeBlock
              title="Terminal"
              language="bash"
              code="pip install ultimaterag"
            />
          </div>
        </div>

        {/* 2. Launch */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Launch the Server
            </h3>
          </div>

          <p className="text-slate-600 mb-4 ml-11">
            Run the built-in CLI command to start the API server. By default, it
            runs on port 8080.
          </p>

          <div className="ml-11 space-y-4">
            <CodeBlock
              title="Terminal"
              language="bash"
              code="ultimaterag start"
            />

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
              <p className="mb-2 font-bold">Options:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>--host</code>: Bind address (default: 0.0.0.0)
                </li>
                <li>
                  <code>--port</code>: Port number (default: 8080)
                </li>
                <li>
                  <code>--reload</code>: Enable auto-reload for dev
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Usage */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-800">First Chat</h3>
          </div>

          <p className="text-slate-600 mb-4 ml-11">
            Send a POST request to the chat endpoint.
          </p>

          <div className="ml-11">
            <CodeBlock
              title="Interact via Curl"
              language="bash"
              code={`curl -X POST "http://localhost:8080/api/v1/chat" \\
  -H "Content-Type: application/json" \\
  -d '{
    "session_id": "test_session",
    "query": "What is TheUltimateRAG?"
  }'`}
            />
          </div>
        </div>
      </div>
    </DocSection>
  )
}

export default Intro
