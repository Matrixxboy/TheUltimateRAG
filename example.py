from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from langchain_core.messages import HumanMessage

# Import UltimateRAG components
from ultimaterag.core.container import rag_engine
from ultimaterag.utils.Response_Helper import make_response
from ultimaterag.utils.Response_Helper_Model import HTTPStatusCode, APICode

# Create a new FastAPI app
app = FastAPI(title="UltimateRAG Custom Example")

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
async def ask_agent(request: QueryRequest):
    """
    Custom endpoint using the UltimateRAG engine to answer a query.
    1. Retrieves relevant documents using vector_manager.
    2. Generates an answer using the LLM.
    """
    try:
        # 1. Retrieval
        print(f"Searching for: {request.query}")
        docs = rag_engine.vector_manager.similarity_search(
            query=request.query,
            k=3,
            filter={"access_level": "common"} # Basic filtering
        )
        
        context = "\n\n".join([doc.page_content for doc in docs])
        
        # 2. Generation
        prompt = f"""You are a helpful assistant. Use the context below to answer the user's question.
        
Context:
{context}

Question: 
{request.query}

Answer:"""
        
        response = rag_engine.llm.invoke([HumanMessage(content=prompt)])
        
        return make_response(
            status=HTTPStatusCode.OK,
            code=APICode.OK,
            message="Query processed successfully",
            data={
                "answer": response.content,
                "retrieved_context": [doc.page_content for doc in docs]
            }
        )

    except Exception as e:
        return make_response(
            status=HTTPStatusCode.INTERNAL_SERVER_ERROR,
            code=APICode.INTERNAL_SERVER_ERROR,
            message="Failed to process query",
            error=str(e)
        )

@app.get("/health")
async def health_check():
    return {"status": "ok", "rag_engine_initialized": rag_engine is not None}

if __name__ == "__main__":
    # Run on a different port (8001) to avoid conflict with main app
    print("Starting Custom UltimateRAG Example on port 8001...")
    uvicorn.run(app, host="0.0.0.0", port=8001)
