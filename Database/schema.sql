CREATE TABLE IF NOT EXISTS long_term_memories (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    summary_chunk TEXT NOT NULL,
    key_concepts JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table for RAG
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    metadata JSONB,
    embedding VECTOR({{EMBEDDING_DIMENSION}}), -- Configurable Dimension
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster search (HNSW)
CREATE INDEX IF NOT EXISTS documents_embedding_hnsw 
ON documents 
USING hnsw (embedding vector_cosine_ops);

