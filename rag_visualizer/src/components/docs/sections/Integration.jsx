import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const Integration = () => {
  return (
    <DocSection
      id="integration"
      title="Client Integration"
      description="Code examples for connecting your applications to TheUltimateRAG."
    >
      <div className="space-y-12">
        {/* Python */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Python Client
          </h3>
          <p className="text-slate-600 mb-4">
            Ideal for backend-to-backend communication or data science
            notebooks.
          </p>
          <CodeBlock
            title="client.py"
            language="python"
            code={`import requests

API_URL = "http://localhost:8000/api/v1/chat"
headers = {"Content-Type": "application/json"}

payload = {
    "session_id": "session_001",
    "query": "How do I configure Redis?",
    "user_id": "dev_team",
    "temperature": 0.5
}

response = requests.post(API_URL, json=payload)

if response.status_code == 200:
    data = response.json()
    print("Answer:", data["data"]["answer"])
    print("Sources:", [doc["metadata"]["source"] for doc in data["data"]["visualization"]["retrieved_docs"]])
else:
    print("Error:", response.text)`}
          />
        </div>

        {/* JavaScript */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            JavaScript / React
          </h3>
          <p className="text-slate-600 mb-4">
            Direct browser integration using `fetch`.
          </p>
          <CodeBlock
            title="api.js"
            language="javascript"
            code={`const queryRAG = async (query, sessionId) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        session_id: sessionId,
        include_visualization: true
      }),
    });

    if (!response.ok) throw new Error("Network response was not ok");
    
    return await response.json();
  } catch (error) {
    console.error("RAG Error:", error);
    return null;
  }
};`}
          />
        </div>
      </div>
    </DocSection>
  )
}

export default Integration
