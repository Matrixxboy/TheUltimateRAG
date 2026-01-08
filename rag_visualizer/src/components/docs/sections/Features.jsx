import React from "react"
import DocSection from "../DocSection"

const Features = () => {
  return (
    <DocSection
      id="features"
      title="Core Features"
      description="Detailed breakdown of the advanced capabilities."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="Multi-User Isolation"
          desc="Data is strictly segregated by `user_id`. One user cannot access another's documents, making it safe for SaaS."
        />
        <FeatureCard
          title="Organizational Memory"
          desc="Shared 'Global' knowledge base accessible to all users, perfect for company policies or standard operating procedures."
        />
        <FeatureCard
          title="Self-Correction"
          desc="If the retrieved documents are irrelevant, the system detects this, rewrites the query, and searches again automatically."
        />
        <FeatureCard
          title="Agentic API"
          desc="Exposes endpoints (`/agent/tools`) specifically designed for OpenAI Assistants to 'discover' and use this RAG system as a tool."
        />
      </div>
    </DocSection>
  )
}

const FeatureCard = ({ title, desc }) => (
  <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
)

export default Features
