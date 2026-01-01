from typing import List, Optional
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from config.settings import settings
import chromadb
import numpy as np
from sklearn.decomposition import PCA

class VectorManager:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(api_key=settings.OPENAI_API_KEY)
        self.client = chromadb.PersistentClient(path=settings.VECTOR_DB_PATH)
        self.collection_name = settings.COLLECTION_NAME
        
        self.vector_store = Chroma(
            client=self.client,
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
        )

    def add_documents(self, documents: List[Document], user_id: Optional[str] = None, access_level: str = "private"):
        """
        Add a list of documents to the vector store.
        """
        if not documents:
            return
        
        # Add metadata
        for doc in documents:
            if access_level == "private" and not user_id:
                raise ValueError("User ID must be provided for private documents.")
                
            if user_id:
                doc.metadata["user_id"] = user_id
            doc.metadata["access_level"] = access_level
        
        self.vector_store.add_documents(documents)
        # self.vector_store.persist()

    def similarity_search(self, query: str, k: int = 4) -> List[Document]:
        """
        Perform a similarity search on the vector store.
        """
        return self.vector_store.similarity_search(query, k=k)

    def get_retriever(self, search_kwargs: Optional[dict] = None):
        """
        Get the retriever interface for LangChain chains.
        """
        _kwargs = {"k": 4}
        if search_kwargs:
            _kwargs.update(search_kwargs)
            
        return self.vector_store.as_retriever(search_kwargs=_kwargs)

    def perform_pca(self, vectors: List[List[float]], n_components: int = 2) -> List[List[float]]:
        """
        Perform PCA to reduce dimensions of vectors.
        """
        if len(vectors) < n_components:
            return vectors # Not enough data to reduce
        
        pca = PCA(n_components=n_components)
        reduced = pca.fit_transform(np.array(vectors))
        return reduced.tolist()

    def search_with_embeddings(self, query: str, user_id: str = None, k: int = 10) -> dict:
        """
        Search and return documents WITH embeddings and PCA visualization data.
        """
        # 1. Embed Query
        query_embedding = self.embeddings.embed_query(query)
        
        # 2. Define Filter
        filter_criteria = {}
        if user_id:
            filter_criteria = {
                "$or": [
                    {"user_id": user_id},
                    {"access_level": "common"}
                ]
            }
        else:
            filter_criteria = {"access_level": "common"}

        # 3. Query Chroma directly to get embeddings
        results = self.vector_store._collection.query(
            query_embeddings=[query_embedding],
            n_results=k,
            where=filter_criteria,
            include=["documents", "metadatas", "embeddings", "distances"]
        )
        
        # 4. Process Results
        if not results['ids'] or not results['ids'][0]:
            return {"query_point": [0,0], "points": []}

        retrieved_embeddings = results['embeddings'][0]
        documents = results['documents'][0]
        metadatas = results['metadatas'][0]
        
        # 5. Combine for PCA
        # We want to visualize: Query + Retrieved Docs
        all_vectors = [query_embedding] + retrieved_embeddings
        
        # 6. Reduce Dimensions
        reduced_vectors = self.perform_pca(all_vectors, n_components=3) # reducing to 3D for x,y,z
        
        # 7. Format Output
        query_point = {
            "x": reduced_vectors[0][0],
            "y": reduced_vectors[0][1],
            "z": reduced_vectors[0][2] if len(reduced_vectors[0]) > 2 else 0,
            "type": "query",
            "text": query
        }
        
        doc_points = []
        for i, (vec, doc_text, meta) in enumerate(zip(reduced_vectors[1:], documents, metadatas)):
            doc_points.append({
                "x": vec[0],
                "y": vec[1],
                "z": vec[2] if len(vec) > 2 else 0,
                "type": "doc",
                "text": styles_text_preview(doc_text),
                "metadata": meta
            })
            
        return {
            "query_point": query_point,
            "points": doc_points
        }

def styles_text_preview(text: str, length: int = 100) -> str:
    return text[:length] + "..." if len(text) > length else text
