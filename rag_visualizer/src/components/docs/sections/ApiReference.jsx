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
        {/* POST /chat */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg text-sm">
              POST
            </span>
            <h3 className="text-2xl font-semibold text-slate-800 font-mono">
              /api/v1/chat
            </h3>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed">
            The primary interface for RAG interactions. It accepts a natural
            language query, retrieves relevant context from the configured
            Vector Store, and generates a response using the active LLM
            Provider.
          </p>

          <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
            Request Body (JSON)
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded-xl mb-8 bg-white shadow-sm">
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
                    Unique identifier for conversation history.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-600">query</td>
                  <td className="px-6 py-4 text-slate-500">string</td>
                  <td className="px-6 py-4 text-red-500 font-bold">Yes</td>
                  <td className="px-6 py-4 text-slate-600">
                    The user's question.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-600">
                    user_id
                  </td>
                  <td className="px-6 py-4 text-slate-500">string</td>
                  <td className="px-6 py-4 text-slate-400">Optional</td>
                  <td className="px-6 py-4 text-slate-600">
                    Used for data isolation (RBAC).
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-600">
                    system_prompt
                  </td>
                  <td className="px-6 py-4 text-slate-500">string</td>
                  <td className="px-6 py-4 text-slate-400">Optional</td>
                  <td className="px-6 py-4 text-slate-600">
                    Override the default system persona.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-600">
                    temperature
                  </td>
                  <td className="px-6 py-4 text-slate-500">float</td>
                  <td className="px-6 py-4 text-slate-400">Default: 0.7</td>
                  <td className="px-6 py-4 text-slate-600">
                    Controls generation creativity (0.0 to 1.0).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
            Response Model
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CodeBlock
              title="Curl"
              language="bash"
              code={`curl -X POST "http://localhost:8080/api/v1/chat" \\
  -H "Content-Type: application/json" \\
  -d '{
    "session_id": "sess_001",
    "query": "Hello",
    "include_visualization": true
  }'`}
            />
            <CodeBlock
              title="Python"
              language="python"
              code={`import requests

resp = requests.post(
    "http://localhost:8080/api/v1/chat",
    json={
        "session_id": "sess_001",
        "query": "Hello",
        "include_visualization": True
    }
)
print(resp.json())`}
            />
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* POST /ingest */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-sm">
              POST
            </span>
            <h3 className="text-2xl font-semibold text-slate-800 font-mono">
              /api/v1/ingest
            </h3>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Uploads and processes a file (PDF, TXT) into the Vector Store. The
            file is chunked, embedded, and indexed.
          </p>

          <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">
            Form Data
          </h4>
          <ul className="list-disc list-inside space-y-2 mb-6 text-slate-600 text-sm">
            <li>
              <code>file</code> (File): The document to upload.
            </li>
            <li>
              <code>user_id</code> (String): Owner of the document.
            </li>
          </ul>

          <CodeBlock
            title="Example Curl"
            code={`curl -X POST "http://localhost:8000/api/v1/ingest" \\
  -H "Authorization: Bearer <token>" \\
  -F "file=@./contract.pdf" \\
  -F "user_id=user_123"`}
          />
        </div>
      </div>
    </DocSection>
  )
}

export default ApiReference
