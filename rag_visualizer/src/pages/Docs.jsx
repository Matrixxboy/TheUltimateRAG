import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Book,
  Code,
  Terminal,
  AlertCircle,
  CheckCircle,
  Cpu,
  Database,
  Layers,
  Search,
  Menu,
  X,
  ChevronRight,
  Copy,
  ChevronDown,
  LayoutGrid,
  Download,
  Server,
} from "lucide-react"
import { Link } from "react-router-dom"

const Docs = () => {
  const [activeSection, setActiveSection] = useState("introduction")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveSection(id)
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "introduction",
        "getting-started",
        "core-concepts",
        "api-reference",
        "troubleshooting",
      ]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sidebarLinks = [
    { id: "introduction", label: "Project Overview", icon: Book },
    { id: "tech-stack", label: "Tech Stack", icon: LayoutGrid },
    { id: "installation", label: "Installation", icon: Download },
    { id: "api-reference", label: "API Reference", icon: Code },
    { id: "troubleshooting", label: "Troubleshooting", icon: AlertCircle },
  ]

  return (
    /* FIX 1 & 2: Added max-w-[100vw] and overflow-x-hidden. 
           Removed 'flex-col' for mobile (default block is safer) */
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden pt-20 md:pt-24 pb-12 px-4 md:px-8 mx-auto md:flex md:gap-8 relative bg-slate-50/30">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-xl hover:bg-slate-800 transition-transform active:scale-95"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside
        className={`
                fixed inset-y-0 left-0 z-40 w-[280px] bg-white border-r border-slate-200 shadow-2xl 
                transform transition-transform duration-300 ease-in-out 
                md:transform-none md:static md:bg-transparent md:border-none md:w-64 md:shadow-none shrink-0
                ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full overflow-y-auto md:overflow-visible pt-24 md:pt-0 pb-8 px-6 md:px-0 md:sticky md:top-24 space-y-1">
          <nav className="space-y-1 fixed w-[250px]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Documentation
          </h3>
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeSection === link.id
                    ? "bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100"
                    : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                }`}
              >
                <link.icon
                  size={18}
                  className={
                    activeSection === link.id
                      ? "text-indigo-600"
                      : "text-slate-400"
                  }
                />
                {link.label}
              </button>
            ))}

            <div className="mt-8 px-2">
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
                <h4 className="font-bold flex items-center gap-2 mb-2 text-sm">
                  <Terminal size={16} /> Need help?
                </h4>
                <p className="text-xs text-indigo-100 mb-3 leading-relaxed opacity-90">
                  Check our detailed guides or contact support for assistance.
                </p>
                <Link
                  to="/contact"
                  className="text-xs bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2 rounded-lg transition-colors block text-center w-full font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      {/* FIX 3: Added min-w-0 to prevent flex blowout and w-full */}
      <main className="flex-1 w-full min-w-0 space-y-16 pb-24 md:pb-0">
        <Section id="introduction" title="Project Overview">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            <strong>TheUltimateRAG (TUG)</strong> is a production-ready, modular
            RAG system designed for enterprise-grade applications. It bridges
            the gap between simple tutorials and complex, scalable deployments
            with native multi-user isolation, organizational memory, and a
            high-performance FastAPI backend.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <FeatureCard
              icon={Database}
              title="Hybrid Vector Store"
              description="Seamlessly switches between ChromaDB for local development and PostgreSQL (pgvector) for production scale."
            />
            <FeatureCard
              icon={Server}
              title="FastAPI Backend"
              description="Asynchronous, high-concurrency API designed for real-time LLM interactions and heavy data processing."
            />
          </div>
        </Section>

        <Section id="tech-stack" title="Tech Stack">
          <p className="text-slate-600 mb-8">
            Built with the latest robust technologies for reliability and scale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TechCard
              title="Frontend"
              items={["React 19", "Vite", "TailwindCSS", "Framer Motion"]}
              color="bg-blue-50 text-blue-700"
            />
            <TechCard
              title="Backend"
              items={["FastAPI", "Python 3.10+", "Uvicorn", "Pydantic"]}
              color="bg-emerald-50 text-emerald-700"
            />
            <TechCard
              title="AI & Data"
              items={["LangChain", "OpenAI", "ChromaDB", "PostgreSQL"]}
              color="bg-purple-50 text-purple-700"
            />
            <TechCard
              title="DevOps"
              items={["Docker", "Redis", "GitHub Actions", "ESLint"]}
              color="bg-amber-50 text-amber-700"
            />
          </div>
        </Section>

        <Section id="installation" title="Installation Guide">
          <div className="space-y-8">
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Terminal size={18} /> Backend Setup
              </h3>
              <div className="space-y-4">
                <Step index="1" title="Clone & Install">
                  Clone the repository and install Python dependencies.
                  <div className="mt-3">
                    <CodeBlock
                      title="Terminal"
                      code={`git clone https://github.com/Matrixxboy/TheUnltimateRAG.git\ncd TheUnltimateRAG\npip install -r requirements.txt`}
                    />
                  </div>
                </Step>
                <Step index="2" title="Environment Setup">
                  Create your .env file and add your API keys.
                  <div className="mt-3">
                    <CodeBlock
                      title=".env"
                      code={`OPENAI_API_KEY=sk-...\nDATABASE_URL=postgresql://user:pass@localhost:5432/db`}
                    />
                  </div>
                </Step>
                <Step index="3" title="Run Server">
                  Start the FastAPI server.
                  <div className="mt-3">
                    <CodeBlock
                      title="Terminal"
                      code={`uvicorn app:app --reload`}
                    />
                  </div>
                </Step>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <LayoutGrid size={18} /> Frontend Setup
              </h3>
              <div className="space-y-4">
                <Step index="1" title="Install Dependencies">
                  Navigate to the visualizer directory.
                  <div className="mt-3">
                    <CodeBlock
                      title="Terminal"
                      code={`cd rag_visualizer\nnpm install`}
                    />
                  </div>
                </Step>
                <Step index="2" title="Start Dev Server">
                  Run the React development server.
                  <div className="mt-3">
                    <CodeBlock title="Terminal" code={`npm run dev`} />
                  </div>
                </Step>
              </div>
            </div>
          </div>
        </Section>

        <Section id="api-reference" title="API Reference">
          <p className="text-slate-600 mb-6">
            Core endpoints for interacting with the RAG system.
          </p>
          <div className="space-y-6">
            <div>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold mb-2">
                POST /api/v1/ingest
              </span>
              <p className="text-sm text-slate-600 mb-3">
                Upload and process documents into the vector store.
              </p>
              <CodeBlock
                title="Request"
                code={`curl -X POST "http://localhost:8000/api/v1/ingest" \\
  -F "file=@/path/to/doc.pdf" \\
  -F "user_id=usr_123"`}
              />
            </div>

            <div>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold mb-2">
                POST /api/v1/chat
              </span>
              <p className="text-sm text-slate-600 mb-3">
                Query the RAG system with natural language.
              </p>
              <CodeBlock
                title="Request"
                code={`{
  "query": "What are the project requirements?",
  "user_id": "usr_123",
  "top_k": 3
}`}
              />
            </div>
          </div>
        </Section>

        <Section id="troubleshooting" title="Troubleshooting">
          <div className="space-y-4">
            <TroubleshootItem
              question="Why are my results irrelevant?"
              answer="Check your chunk size (too small loses context, too large hurts precision) and ensure your embedding model matches your domain language."
            />

            <TroubleshootItem
              question="The visualizer is slow."
              answer="Enable hardware acceleration for WebGL rendering and reduce the number of vectors displayed at once."
            />

            <TroubleshootItem
              question="My model ignores retrieved context."
              answer="Ensure retrieved chunks are injected clearly into the prompt and not truncated by token limits."
            />

            <TroubleshootItem
              question="Responses feel repetitive or generic."
              answer="Lower temperature slightly and verify that top-k retrieval is not pulling near-duplicate chunks."
            />

            <TroubleshootItem
              question="Embedding search returns empty results."
              answer="Confirm vectors are indexed correctly and that the same embedding model is used for both indexing and querying."
            />

            <TroubleshootItem
              question="High latency during queries."
              answer="Reduce chunk count, cache frequent queries, and consider using approximate nearest neighbor (ANN) search."
            />

            <TroubleshootItem
              question="Answers contradict my source data."
              answer="Lower model creativity and increase reliance on retrieved context by reinforcing source-grounded instructions in the prompt."
            />

            <TroubleshootItem
              question="Memory usage is too high."
              answer="Use smaller embedding dimensions, prune old vectors, and limit historical context passed to the model."
            />

            <TroubleshootItem
              question="Updates to documents are not reflected."
              answer="Re-embed updated documents and rebuild or refresh the vector index."
            />

            <TroubleshootItem
              question="RAG works locally but fails in production."
              answer="Check environment differences, model versions, vector store persistence, and API rate limits."
            />
          </div>
        </Section>
      </main>
    </div>
  )
}

// --- Subcomponents ---

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 md:scroll-mt-28 mt-5">
    <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200/60">
      {title}
    </h2>
    <div className="space-y-6">{children}</div>
  </section>
)

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-3">
      <Icon size={20} />
    </div>
    <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
)

const Step = ({ index, title, children }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md">
      {index}
    </div>
    <div>
      <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
      <div className="text-slate-600 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
)

const ConceptNode = ({ label, color }) => (
  <div
    className={`px-6 py-3 rounded-lg border ${color} font-medium text-sm shadow-sm w-full md:w-auto text-center`}
  >
    {label}
  </div>
)

const Arrow = () => (
  <div className="text-slate-300">
    <ChevronRight size={20} className="hidden md:block" />
    <ChevronDown size={20} className="block md:hidden" />
  </div>
)

const CodeBlock = ({ title, code }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 w-full max-w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400 truncate">
          {title}
        </span>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white"
        >
          {copied ? (
            <CheckCircle size={14} className="text-emerald-400" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      {/* Added overflow-x-auto to wrapper to contain long lines */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

const TroubleshootItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-medium text-slate-800 text-sm pr-4">
          {question}
        </span>
        <ChevronRight
          size={18}
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-slate-600 text-sm bg-slate-50/50 border-t border-slate-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TechCard = ({ title, items, color }) => (
  <div
    className={`p-6 rounded-xl border border-slate-200/60 shadow-sm ${
      color.split(" ")[0]
    } bg-opacity-30`}
  >
    <h3 className={`font-semibold mb-3 ${color.split(" ")[1]}`}>{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
          <div
            className={`w-1.5 h-1.5 rounded-full ${color
              .split(" ")[1]
              .replace("text", "bg")}`}
          />
          {item}
        </li>
      ))}
    </ul>
  </div>
)

export default Docs
