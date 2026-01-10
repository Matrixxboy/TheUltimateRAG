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
        {/* Internal Library Usage */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Internal Library Usage (example.py)
          </h3>
          <p className="text-slate-600 mb-4">
            You can import <code>ultimaterag</code> components directly into
            your Python application to build custom implementations.
          </p>
          <CodeBlock
            title="example.py"
            language="python"
            code={`from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from langchain_core.messages import HumanMessage

# Import UltimateRAG components
from ultimaterag.core.container import rag_engine
from ultimaterag.utils.Response_Helper import make_response
from ultimaterag.utils.Response_Helper_Model import HTTPStatusCode, APICode

app = FastAPI(title="UltimateRAG Custom Example")

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
async def ask_agent(request: QueryRequest):
    # 1. Retrieval
    docs = rag_engine.vector_manager.similarity_search(
        query=request.query,
        k=3,
        filter={"access_level": "common"}
    )
    
    context = "\\n\\n".join([doc.page_content for doc in docs])
    
    # 2. Generation
    prompt = f"""Use the context below to answer the user's question.
    
Context:
{context}

Question: 
{request.query}"""
    
    response = rag_engine.llm.invoke([HumanMessage(content=prompt)])
    
    return make_response(
        status=HTTPStatusCode.OK,
        code=APICode.OK,
        message="Query processed",
        data={"answer": response.content}
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)`}
          />
        </div>

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
