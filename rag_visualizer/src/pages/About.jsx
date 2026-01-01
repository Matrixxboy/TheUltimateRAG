import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe, Heart, Code2, Cpu, Sparkles, Layers, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-20">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4 border border-indigo-100">
                            <Sparkles size={14} /> The Story
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">TUG</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            The comprehensive boilerplate designed to jumpstart your AI development. Not just a demo—a production-ready foundation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <Zap size={18} />
                                </span>
                                Our Mission
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Building RAG applications involves complex plumbing: vector stores, ingestion pipelines, and frontend interfaces.
                                <br /><br />
                                <strong>TUG</strong> solves this by providing a unified, modular starter kit. It includes a powerful visualization layer to help you debug data flows, but the core value lies in the robust codebase.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors duration-500"></div>

                            <h3 className="font-bold text-slate-900 mb-6 text-lg relative">Tech Stack</h3>
                            <div className="flex flex-wrap gap-3 relative">
                                {["React 18", "TailwindCSS", "Framer Motion", "Vite", "OpenAI API", "LangChain", "Vector DB"].map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Inside the Boilerplate</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                        <FeatureBox
                            title="1. Ingestion"
                            desc="Documents are parsed, chunked, and embedded into vector representations."
                            delay={0.1}
                        />
                        <FeatureBox
                            title="2. Storage"
                            desc="Vectors are stored in high-dimensional space (visualized via PCA)."
                            delay={0.2}
                        />
                        <FeatureBox
                            title="3. Retrieval"
                            desc="Queries are embedded and mathematically matched to nearest chunks."
                            delay={0.3}
                        />
                        <FeatureBox
                            title="4. Generation"
                            desc="LLM uses retrieved context to generate grounded answers."
                            delay={0.4}
                        />
                    </div>

                    {/* Creator Section */}
                    <div className="border-t border-slate-200 pt-20">
                        <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 -z-10"></div>
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

                            <div className="flex flex-col md:flex-row items-center gap-10 relative">
                                <div className="relative group shrink-0">
                                    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-70 blur group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative">
                                        <img
                                            src="https://github.com/Matrixxboy.png"
                                            alt="Utsav Lankapati"
                                            className="w-48 h-48 rounded-full border-[6px] border-white shadow-2xl object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-2 right-4 bg-white p-1.5 rounded-full border border-slate-100 shadow-lg" title="Verified Creator">
                                            <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center md:text-left flex-1">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
                                        <Code2 size={12} /> Full Stack Developer
                                    </div>

                                    <h3 className="text-3xl font-bold text-slate-900 mb-1">Utsav Lankapati</h3>
                                    <p className="text-indigo-600 font-medium text-lg mb-6 flex items-center justify-center md:justify-start gap-1">
                                        @Matrixxboy
                                        {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-2 animate-pulse"></span>
                                        <span className="text-xs text-slate-400 font-normal">Open to work</span> */}
                                    </p>

                                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                                        I'm a developer and AI enthusiast who loves building <span className="text-slate-900 font-semibold underline decoration-indigo-300 decoration-2 underline-offset-2">beautiful, fast, and intelligent</span> digital experiences. My focus is blending clean UI/UX with powerful tech — turning complex ideas into simple products.
                                    </p>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <SocialLink href="https://github.com/Matrixxboy" icon={Github} label="GitHub" />
                                        <SocialLink href="https://linkedin.com/in/utsav-lankapati" icon={Linkedin} label="LinkedIn" />
                                        <SocialLink href="https://x.com/mmatrixxboy" icon={Twitter} label="X (Twitter)" />
                                        <SocialLink href="https://huggingface.co/Matrixxboy" icon={Cpu} label="HuggingFace" />
                                        <SocialLink href="https://utsav-lankapati.onrender.com/" icon={Globe} label="Portfolio" />
                                        <SocialLink href="https://patreon.com/Matrixxboy" icon={Heart} label="Support Me" className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


const FeatureBox = ({ title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass-panel p-6 hover:shadow-lg transition-shadow border-t-2 border-t-transparent hover:border-t-indigo-500"
    >
        <h3 className="font-bold text-slate-900 mb-3 text-lg">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

const SocialLink = ({ href, icon: Icon, className = "text-slate-500 hover:bg-slate-100 hover:text-slate-900 hover:scale-110", label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 rounded-xl transition-all duration-200 border border-slate-200/50 shadow-sm bg-white hover:shadow-md ${className}`}
        aria-label={label}
        title={label}
    >
        <Icon size={22} />
    </a>
);

export default About;
