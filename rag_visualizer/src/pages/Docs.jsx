import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Docs = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setMobileMenuOpen(false);
        }
    };

    // Spy on scroll to update active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['introduction', 'getting-started', 'core-concepts', 'api-reference', 'troubleshooting'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sidebarLinks = [
        { id: 'introduction', label: 'Introduction', icon: Book },
        { id: 'getting-started', label: 'Getting Started', icon: Layers },
        { id: 'core-concepts', label: 'Core Concepts', icon: Cpu },
        { id: 'api-reference', label: 'API Reference', icon: Code },
        { id: 'troubleshooting', label: 'Troubleshooting', icon: AlertCircle },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex gap-8">
            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-3 rounded-full shadow-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Navigation */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:bg-transparent md:border-none md:w-64 md:block
                ${mobileMenuOpen ? 'translate-x-0 pt-24 px-6' : '-translate-x-full'}
            `}>
                <div className="sticky top-24 space-y-1">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Documentation</h3>
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeSection === link.id
                                ? 'bg-indigo-50 text-indigo-600 font-medium shadow-sm'
                                : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                                }`}
                        >
                            <link.icon size={18} />
                            {link.label}
                        </button>
                    ))}

                    <div className="mt-8 px-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                            <h4 className="font-bold flex items-center gap-2 mb-2">
                                <Terminal size={16} /> Need help?
                            </h4>
                            <p className="text-xs text-indigo-100 mb-3">
                                Check our detailed guides or contact support.
                            </p>
                            <Link to="/contact" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors inline-block text-center w-full">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full md:w-[calc(100%-18rem)] space-y-16">

                {/* Introduction */}
                <Section id="introduction" title="Introduction">
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Welcome to the <strong>The Ultimate RAG (TUG)</strong> documentation. This visualizer tool bridges the gap between complex AI concepts and understandable visual representations, helping you master Retrieval-Augmented Generation.
                    </p>

                    <div className="space-y-8 mb-12">
                        <div className="glass-panel p-8 border-l-4 border-l-red-400">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">The Problem: LLM Hallucinations</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Large Language Models (LLMs) like GPT-4 are powerful, but they have a fatal flaw: <strong>they don't know what they don't know</strong>. Trained on static data cut off at a specific point in time, they often confidently invent facts ("hallucinate") when asked about recent events or private data.
                            </p>
                        </div>

                        <div className="glass-panel p-8 border-l-4 border-l-emerald-500">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">The Solution: Retrieval-Augmented Generation (RAG)</h3>
                            <div className="text-slate-600 leading-relaxed">
                                RAG gives the LLM an "open book" exam. Instead of relying solely on its training memory, the system:
                                <ol className="list-decimal pl-5 mt-3 space-y-2">
                                    <li><strong>Retrieves</strong> relevant trustworthy information from your document base.</li>
                                    <li><strong>Augments</strong> the prompt with this factual context.</li>
                                    <li><strong>Generates</strong> a grounded answer based <em>only</em> on the provided facts.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FeatureCard
                            icon={Database}
                            title="Vector Database"
                            description="Visualize how text is converted into numbers (embeddings) and stored in high-dimensional space for semantic lookup."
                        />
                        <FeatureCard
                            icon={Search}
                            title="Semantic Search"
                            description="See how the AI finds the most relevant information for your query, not just matching keywords but matching meaning."
                        />
                    </div>
                </Section>

                {/* Getting Started */}
                <Section id="getting-started" title="Getting Started">
                    <p className="text-slate-600 mb-8">
                        Follow these simple steps to start visualizing your first RAG pipeline. The visualizer allows you to see the invisible "brain" operations of the AI.
                    </p>

                    <div className="space-y-6">
                        <Step index="1" title="Upload Documents">
                            <div className="mb-2">Upload your PDF, TXT, or MD files to the knowledge base.</div>
                            <ul className="text-xs text-slate-500 list-disc pl-5 space-y-1">
                                <li><strong>Chunking:</strong> The system splits your text into smaller, manageable pieces (chunks) suitable for analysis.</li>
                                <li><strong>Embedding:</strong> Each chunk is converted into a vector (a list of numbers) representing its meaning.</li>
                            </ul>
                        </Step>
                        <Step index="2" title="Configure Embeddings">
                            Choose your preferred embedding model (e.g., OpenAI, HuggingFace) from the settings panel. Different models map language to numbers differently, affecting retrieval accuracy.
                        </Step>
                        <Step index="3" title="Run a Query">
                            Type a natural language question in the search bar.
                            <div className="mt-2 p-3 bg-slate-50 rounded-lg text-sm border border-slate-200">
                                <strong>Tip:</strong> Try asking "What is the main conclusion?" to see how the system aggregates information across the entire document.
                            </div>
                        </Step>
                        <Step index="4" title="Analyze the Visualization">
                            Interact with the 3D Vector Space graph.
                            <ul className="text-xs text-slate-500 list-disc pl-5 space-y-1 mt-2">
                                <li><strong>Blue Dots:</strong> Your document chunks.</li>
                                <li><strong>Pink Dot:</strong> Your current question.</li>
                                <li><strong>Proximity:</strong> The closer the dots are, the more semantically similar they are.</li>
                            </ul>
                        </Step>
                    </div>
                </Section>

                {/* Core Concepts */}
                <Section id="core-concepts" title="Core Concepts">
                    <p className="text-slate-600 mb-8">
                        Understanding the fundamental building blocks of RAG systems is crucial for debugging and optimization.
                    </p>

                    <div className="space-y-12">
                        {/* Concept 1: Embeddings */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">1. Embeddings & Vector Space</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Computers can't understand text; they understand numbers. An <strong>Embedding Model</strong> translates text into a long list of numbers called a <em>vector</em>.
                            </p>
                            <div className="glass-panel p-6 bg-slate-50/50">
                                <p className="font-mono text-sm text-slate-600 mb-2">"The cat sits on the mat"</p>
                                <div className="flex items-center gap-2 text-xs font-mono text-indigo-500 overflow-x-auto pb-2">
                                    <span className="bg-white p-1 rounded border shadow-sm">[0.12,</span>
                                    <span className="bg-white p-1 rounded border shadow-sm">-0.45,</span>
                                    <span className="bg-white p-1 rounded border shadow-sm">0.88,</span>
                                    <span className="bg-white p-1 rounded border shadow-sm">...</span>
                                    <span className="bg-white p-1 rounded border shadow-sm">0.03]</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                    Similar concepts end up with similar numbers, placing them close together in the "Vector Space."
                                </p>
                            </div>
                        </div>

                        {/* Concept 2: Cosine Similarity */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">2. Vector Search (Cosine Similarity)</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                To find the most relevant document, we don't look for matching keywords. We calculate the <strong>angle</strong> between the "Question Vector" and all "Document Vectors".
                            </p>
                            <ul className="list-disc pl-5 text-slate-600 space-y-2">
                                <li><strong>Small semantic distance</strong> (Close together) = High Relevance</li>
                                <li><strong>Large semantic distance</strong> (Far apart) = Low Relevance</li>
                            </ul>
                        </div>

                        {/* Concept 3: The Workflow */}
                        <div className="glass-panel p-6 overflow-hidden">
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Terminal size={18} className="text-purple-500" /> The RAG Workflow
                            </h3>
                            {/* Mermaid-like visualization using pure CSS/HTML for aesthetic consistency */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-4 min-h-[120px]">
                                <ConceptNode label="User Query" color="bg-blue-100 text-blue-700 border-blue-200" />
                                <Arrow />
                                <ConceptNode label="Retrieval" color="bg-purple-100 text-purple-700 border-purple-200" />
                                <Arrow />
                                <ConceptNode label="Augmentation" color="bg-amber-100 text-amber-700 border-amber-200" />
                                <Arrow />
                                <ConceptNode label="Generation" color="bg-emerald-100 text-emerald-700 border-emerald-200" />
                            </div>
                            <p className="text-sm text-slate-500 mt-6 text-center italic">
                                Figure 1: The standard data flow. The Retrieved chunks are injected into the Prompt before Generation.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Comparison Table</h3>
                        <div className="glass-panel overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Feature</th>
                                        <th className="p-4 font-semibold">Fine-Tuning</th>
                                        <th className="p-4 font-semibold text-purple-600">RAG (TUG)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                                    <tr>
                                        <td className="p-4 font-medium text-slate-800">Note</td>
                                        <td className="p-4">Teaching the model new <strong>behavior</strong></td>
                                        <td className="p-4 bg-purple-50/30 font-medium text-purple-700">Giving the model new <strong>facts</strong></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-slate-800">Knowledge Freshness</td>
                                        <td className="p-4">Static (Cut-off date)</td>
                                        <td className="p-4 bg-purple-50/30 font-medium text-purple-700">Real-time</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-slate-800">Hallucinations</td>
                                        <td className="p-4">High risk</td>
                                        <td className="p-4 bg-purple-50/30 font-medium text-purple-700">Reduced (Grounded)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Section>

                {/* API Reference */}
                <Section id="api-reference" title="API Reference">
                    <p className="text-slate-600 mb-6">
                        Integrate TUG directly into your application using our REST API.
                    </p>

                    <CodeBlock
                        language="javascript"
                        title="Querying the Knowledge Base"
                        code={`// Example: Send a query to the RAG pipeline
                        const response = await fetch('https://api.tug.com/v1/query', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer YOUR_API_KEY'
                        },
                        body: JSON.stringify({
                            query: "How does vector search work?",
                            top_k: 5
                        })
                        });

                        const data = await response.json();
                        console.log(data.answer);`}
                    />

                    <div className="mt-6 space-y-2">
                        <h4 className="font-medium text-slate-800">Parameters</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex gap-2"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">query</code> (string, required): The user's question.</li>
                            <li className="flex gap-2"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">top_k</code> (number, optional): Number of documents to retrieve. Default is 3.</li>
                        </ul>
                    </div>
                </Section>

                {/* Troubleshooting */}
                <Section id="troubleshooting" title="Troubleshooting">
                    <div className="space-y-4">
                        <TroubleshootItem
                            question="Why are my results irrelevant?"
                            answer={
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Chunk Size:</strong> If chunks are too small, they lack context. If too large, they confuse the model with noise.</li>
                                    <li><strong>Query Vagueness:</strong> Vague queries lead to vague results. Be specific.</li>
                                    <li><strong>Bad Embeddings:</strong> The chosen embedding model might not be suitable for your specific domain jargon.</li>
                                </ul>
                            }
                        />
                        <TroubleshootItem
                            question="The visualizer isn't loading or is slow."
                            answer="TUG uses WebGL for 3D rendering. Ensure hardware acceleration is enabled in your browser settings. If you have thousands of documents, the initial projection might take a few seconds."
                        />
                        <TroubleshootItem
                            question="What do I do if I get 'No Vectors Found'?"
                            answer="This means the indexing process failed or wasn't run. Go to the 'Upload' tab and ensure you see a success message after uploading files. Check your API key quotas if using OpenAI."
                        />
                        <TroubleshootItem
                            question="API returns 401 Unauthorized."
                            answer="Verify your API key in the dashboard settings. Keys expire every 30 days for security purposes. Generate a new key if necessary."
                        />
                    </div>
                </Section>

            </main>
        </div>
    );
};

// --- Subcomponents for Cleanliness ---

const Section = ({ id, title, children }) => (
    <section
        id={id}
        className="
        scroll-mt-20 md:scroll-mt-28
        px-4 sm:px-6 lg:px-0
        py-10 sm:py-12
        "
    >
        <h2
            className="
            text-xl sm:text-2xl md:text-3xl
            font-bold text-slate-900
            mb-4 sm:mb-6
            pb-2
            border-b border-slate-200/60
        "
        >
            {title}
        </h2>

        <div className="space-y-6 ">
            {children}
        </div>
    </section>
);


const FeatureCard = ({ icon, title, description }) => {
    const Icon = icon;
    return (
        <div className="glass-panel p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                <Icon size={24} />
            </div>
            <h3 className="font-semibold text-slate-800 text-lg mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

const Step = ({ index, title, children }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
            {index}
        </div>
        <div>
            <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
            <div className="text-slate-600 text-sm">{children}</div>
        </div>
    </div>
);

const ConceptNode = ({ label, color }) => (
    <div className={`px-6 py-3 rounded-xl border ${color} font-medium shadow-sm w-full md:w-auto text-center`}>
        {label}
    </div>
);

const Arrow = () => (
    <div className="hidden md:block text-slate-300">
        <ChevronRight size={24} />
    </div>
);

const CodeBlock = ({ title, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <span className="text-xs font-mono text-slate-400">{title}</span>
                <button
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

const TroubleshootItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="glass-panel overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="font-medium text-slate-800">{question}</span>
                <ChevronRight
                    size={20}
                    className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 text-slate-600 text-sm border-t border-slate-100 bg-slate-50/50">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Docs;
