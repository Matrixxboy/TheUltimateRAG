import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const ApiReference = () => {
  return (
    <DocSection
      id="api"
      title="API Reference"
      description="Complete specification of the REST API endpoints, parameters, and response models."
    >
      <div className="space-y-16">
        {/* --- Ingestion --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-slate-800">Ingestion</h2>
          </div>

          {/* POST /ingest/upload */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-sm">
                POST
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/ingest/upload
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Upload a file to be processed and indexed.
            </p>

            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
              Request Body (Multipart Form-Data)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Field
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Type
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Required
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      file
                    </td>
                    <td className="px-6 py-4 text-slate-500">File</td>
                    <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                    <td className="px-6 py-4 text-slate-600">
                      The document to ingest (PDF, TXT, etc.).
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      user_id
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">Optional</td>
                    <td className="px-6 py-4 text-slate-600">
                      User ID for RBAC.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      access_level
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">
                      Default: "private"
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      "private" or "common".
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              title="Curl"
              language="bash"
              code={`curl -X POST "http://localhost:8000/api/v1/ingest/upload" \\
  -F "file=@./document.pdf" \\
  -F "user_id=usr_01"`}
            />
          </div>
        </div>

        {/* --- Chat --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-slate-800">Chat</h2>
          </div>

          {/* POST /chat/chat */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg text-sm">
                POST
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/chat/chat
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Interact with the RAG system using natural language.
            </p>

            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
              Request Body (JSON)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Field
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Type
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Required
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      session_id
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                    <td className="px-6 py-4 text-slate-600">
                      Target session.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      query
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                    <td className="px-6 py-4 text-slate-600">User question.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      user_id
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">Optional</td>
                    <td className="px-6 py-4 text-slate-600">
                      User ID for RBAC.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      system_prompt
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">Optional</td>
                    <td className="px-6 py-4 text-slate-600">
                      Override system prompt.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      temperature
                    </td>
                    <td className="px-6 py-4 text-slate-500">float</td>
                    <td className="px-6 py-4 text-slate-400">Optional (0-1)</td>
                    <td className="px-6 py-4 text-slate-600">
                      Generation creativity.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              title="Curl"
              language="bash"
              code={`curl -X POST "http://localhost:8000/api/v1/chat/chat" \\
  -H "Content-Type: application/json" \\
  -d '{
    "session_id": "sess_1", 
    "query": "Hello world",
    "temperature": 0.7
  }'`}
            />
          </div>
        </div>

        {/* --- Memory --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-slate-800">Memory</h2>
          </div>

          {/* DELETE /memory/{session_id} */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-lg text-sm">
                DELETE
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/memory/{"{session_id}"}
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Clear the conversation memory for a specific session.
            </p>
          </div>

          {/* GET /memory/{session_id} */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-sm">
                GET
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/memory/{"{session_id}"}
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Retrieve the conversation history for a session.
            </p>
          </div>

          {/* POST /memory/{session_id} */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-sm">
                POST
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/memory/{"{session_id}"}
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Manually add a message to the session history.
            </p>

            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
              Request Body (JSON)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Field
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Type
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Required
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      message
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                    <td className="px-6 py-4 text-slate-600">
                      The content of the message.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      type
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">
                      Default: "human"
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      "human" or "ai".
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Agent --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-slate-800">Agent</h2>
          </div>

          {/* POST /agent/search */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg text-sm">
                POST
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/agent/search
              </h3>
            </div>
            <p className="text-slate-600 mb-4">Perform a semantic search.</p>

            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
              Request Body (JSON)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Field
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Type
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Required
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      query
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                    <td className="px-6 py-4 text-slate-600">Search query.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">k</td>
                    <td className="px-6 py-4 text-slate-500">int</td>
                    <td className="px-6 py-4 text-slate-400">Default: 5</td>
                    <td className="px-6 py-4 text-slate-600">
                      Number of results.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      user_id
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">Optional</td>
                    <td className="px-6 py-4 text-slate-600">
                      RBAC filtering.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* POST /agent/summarize */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg text-sm">
                POST
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/agent/summarize
              </h3>
            </div>
            <p className="text-slate-600 mb-4">Summarize text.</p>

            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
              Request Body (JSON)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Field
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Type
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Required
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      text
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                    <td className="px-6 py-4 text-slate-600">
                      Text to summarize.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      instruction
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">Optional</td>
                    <td className="px-6 py-4 text-slate-600">
                      Custom prompt instructions.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* GET /agent/tools */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-sm">
                GET
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/agent/tools
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Get a list of available tools for the agent.
            </p>
          </div>

          {/* POST /agent/workflow */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg text-sm">
                POST
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /api/v1/agent/workflow
              </h3>
            </div>
            <p className="text-slate-600 mb-4">Trigger workflow.</p>

            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
              Request Body (JSON)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Field
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Type
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Required
                    </th>
                    <th className="px-6 py-3 font-semibold text-slate-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      query
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                    <td className="px-6 py-4 text-slate-600">
                      Input query for the workflow.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-indigo-600">
                      workflow_type
                    </td>
                    <td className="px-6 py-4 text-slate-500">string</td>
                    <td className="px-6 py-4 text-slate-400">
                      Default: "self-correcting"
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      Type of workflow to run.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Default --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-slate-800">System</h2>
          </div>

          {/* GET / */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-sm">
                GET
              </span>
              <h3 className="text-xl font-semibold text-slate-800 font-mono">
                /
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              Root endpoint. Check if API is running.
            </p>
          </div>
        </div>
      </div>
    </DocSection>
  )
}

export default ApiReference
