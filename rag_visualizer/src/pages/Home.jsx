import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Database, Brain, Zap, Layers, Terminal, Star, GitFork, Scale, Code , Command ,Box ,Check } from 'lucide-react';
import TechMarquee from '../components/TechMarquee';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
    const [stats, setStats] = useState({ stars: 0, forks: 0, loading: true });

    const command = "git clone https://github.com/Matrixxboy/TheUnltimateRAG";
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(command);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
        } catch (err) {
        console.error("Copy failed", err);
        }
    };
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/Matrixxboy/TheUnltimateRAG');
                if (response.ok) {
                    const data = await response.json();
                    setStats({ stars: data.stargazers_count, forks: data.forks_count, loading: false });
                } else {
                    setStats(prev => ({ ...prev, loading: false }));
                }
            } catch (error) {
                console.error("Failed to fetch GitHub stats", error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };
        fetchStats();
    }, []);

    // Mouse Follow Logic for Parallax Background
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const moveX = clientX - window.innerWidth / 2;
        const moveY = clientY - window.innerHeight / 2;
        mouseX.set(moveX);
        mouseY.set(moveY);
    };

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const moveBackgroundX = useTransform(springX, (value) => value / 20);
    const moveBackgroundY = useTransform(springY, (value) => value / 20);
    const moveBackgroundXReverse = useTransform(springX, (value) => -value / 30);
    const moveBackgroundYReverse = useTransform(springY, (value) => -value / 30);

    return (
        <div className="min-h-screen pt-28 overflow-x-hidden" onMouseMove={handleMouseMove}>
            {/* Hero Section */}
            <section className="min-h-[90vh] flex flex-col items-center justify-center relative px-6 text-center">
                <motion.div style={{ scale, opacity }} className="z-10 w-full max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 text-slate-600 text-sm font-semibold border border-slate-200">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            v1.0 Production Ready
                        </span>
                    </motion.div>
                    <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='flex mb-8 items-center justify-center'>
                        <img src="/mainLOGO.png" alt="" className="md:w-48 md:h-48 w-28 h-28" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tight mb-8"
                    >
                        The Ultimate
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 ml-2">
                            RAG
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Stop building integration glue. Start shipping features. <br />
                        A modular, pre-configured foundation for scalable AI applications.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
                    >
                        <NavLink to="/demo" className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 md:hidden lg:hidden">
                            View Live Demo
                            <ArrowRight className="w-5 h-5" />
                        </NavLink>

                        {/* Real Terminal Command */}
                        <div className="w-full md:w-auto group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-30 blur group-hover:opacity-60 transition duration-200"></div>
                            <div className="relative flex items-center bg-white border border-slate-200 rounded-full px-6 py-4 font-mono text-slate-600 text-sm shadow-sm md:min-w-[400px]">
                            <Terminal className="w-4 h-4 text-slate-400 mr-3" />

                            <span className="mr-auto truncate select-all">
                                {command}
                            </span>

                            <button
                                onClick={copyToClipboard}
                                className={`ml-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                                copied
                                    ? "text-emerald-600"
                                    : "text-indigo-600 hover:text-indigo-700"
                                }`}
                            >
                                {copied ? (
                                <>
                                    <Check className="w-3 h-3" />
                                    Copied
                                </>
                                ) : (
                                "Copy"
                                )}
                            </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Abstract Interactive Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                    <motion.div style={{ x: moveBackgroundX, y: moveBackgroundY }} className="absolute top-20 left-10 w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px]" />
                    <motion.div style={{ x: moveBackgroundXReverse, y: moveBackgroundYReverse }} className="absolute top-40 right-10 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px]" />
                </div>
            </section>

            <TechMarquee />

            {/* Features Grid */}
            <section className="py-32 px-6 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Engineered for Production</h2>
                        <p className="text-lg text-slate-600">
                            We've handled the complexities of RAG architectures so you don't have to.
                            From vector database hosting to efficient context window management.
                        </p>
                    </div>
                    {/* Stats Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-6 bg-white/50 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-lg max-w-4xl mb-10 mx-auto"
                    >
                        <StatItem icon={Star} label="GitHub Stars" value={stats.loading ? "..." : stats.stars} />
                        <StatItem icon={GitFork} label="Forks" value={stats.loading ? "..." : stats.forks} />
                        <StatItem icon={Scale} label="License" value="MIT" />
                        <StatItem icon={Code} label="Core Stack" value="Python" />
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Database}
                            title="Vector Operations"
                            desc="Pre-configured integrations with Pinecone, Milvus, and Weaviate. Switch providers with a single environment variable."
                        />
                        <FeatureCard
                            icon={Brain}
                            title="Model Agnostic"
                            desc="Plug and play any LLM. Supports OpenAI GPT-4, Anthropic Claude, and local Llama 3 models via Ollama."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Ingestion Pipeline"
                            desc="Robust document processing that handles PDFs, Markdown, and TXT files with smart chunking strategies."
                        />
                        <FeatureCard
                            icon={Layers}
                            title="Modular Backend"
                            desc="Built on FastAPI. Fully typed, documented, and ready to scale with Docker Compose configurations."
                        />
                        <FeatureCard
                            icon={Command}
                            title="Developer Experience"
                            desc="Includes a CLI tool for scaffolding new endpoints and a dedicated visual debugger for vector proximity."
                        />
                        <FeatureCard
                            icon={Box}
                            title="Docker Ready"
                            desc="One command startup. Independent containers for API, Frontend, and Vector DB ensure isolation."
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 bg-slate-50/50">
                <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(79,70,229,0.2)_0%,transparent_100%)]"></div>
                        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to build?</h2>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Join thousands of developers building the next generation of intelligent applications with TUG.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <NavLink to="/demo" className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors">
                                Try Interactive Demo
                            </NavLink>
                            <NavLink to="/docs" className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-lg text-white border border-white/20 hover:bg-white/10 transition-colors">
                                Read Documentation
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const StatItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-center justify-center p-2">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xl mb-1">
            <Icon size={20} className="text-indigo-500" />
            {value}
        </div>
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-panel p-8 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all"
    >
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </motion.div>
);

export default Home;
