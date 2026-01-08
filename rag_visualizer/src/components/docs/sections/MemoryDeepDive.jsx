import React from "react"
import DocSection from "../DocSection"
import CodeBlock from "./CodeBlock"

const MemoryDeepDive = () => {
  return (
    <DocSection
      id="memory"
      title="Memory & Persistence"
      description="How TheUltimateRAG manages conversation history and long-term storage."
    >
      <div className="space-y-12">
        {/* Dual Layer Strategy */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Dual-Layer Memory Strategy
          </h3>
          <p className="text-slate-600 mb-6 w-full max-w-3xl">
            TUG uses a sophisticated hybrid approach to memory, balancing fast
            retrieval for active conversations with scalable storage for
            long-term recall.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-red-50 border border-red-100 rounded-xl">
              <h4 className="font-bold text-red-700 mb-2">Short-Term (Hot)</h4>
              <p className="text-sm text-slate-600 mb-3">
                <strong>Backend:</strong> Redis
              </p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>
                  Stores the last <code>N</code> messages (sliding window).
                </li>
                <li>Ultra-low latency for real-time chat.</li>
                <li>Automatically trims older messages.</li>
              </ul>
            </div>

            <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
              <h4 className="font-bold text-blue-700 mb-2">Long-Term (Cold)</h4>
              <p className="text-sm text-slate-600 mb-3">
                <strong>Backend:</strong> PostgreSQL (Optional)
              </p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>Stores summarized conversations.</li>
                <li>Activated only when window size is exceeded.</li>
                <li>Persisted indefinitely for recall.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Moving Window Logic */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            The "Moving Window" Algorithm
          </h3>
          <p className="text-slate-600 mb-4">
            When the conversation exceeds <code>MEMORY_WINDOW_LIMIT</code>{" "}
            (default: 10), the system triggers a background consolidation task.
          </p>
          <CodeBlock
            title="Consolidation Logic"
            language="python"
            code={`def enforce_memory_consolidation(self, session_id):
    # 1. Check Threshold
    if len(messages) > self.threshold:
        
        # 2. Slice Oldest
        to_archive = messages[:self.threshold]
        
        # 3. Summarize with LLM
        summary = llm.invoke(f"Summarize: {to_archive}")
        
        # 4. Store in Postgres
        db.insert("long_term_memories", summary)
        
        # 5. Flush Redis
        redis.lpop(count=self.threshold)`}
          />
        </div>

        {/* Database Schema */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Database Schema
          </h3>
          <p className="text-slate-600 mb-4">
            The PostgreSQL schema for storing long-term memories.
          </p>
          <CodeBlock
            title="schema.sql"
            language="sql"
            code={`CREATE TABLE IF NOT EXISTS long_term_memories (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) INDEX,
    summary_chunk TEXT,
    key_concepts JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
          />
        </div>
      </div>
    </DocSection>
  )
}

export default MemoryDeepDive
