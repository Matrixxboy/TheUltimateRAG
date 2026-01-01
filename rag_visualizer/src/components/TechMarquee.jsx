import React from 'react';
import { motion } from 'framer-motion';
import { Database, Code, Brain, Server, Cloud, Cpu, Globe, Lock } from 'lucide-react';

const techs = [
    { name: 'React', icon: Code },
    { name: 'Python', icon: Server },
    { name: 'OpenAI', icon: Brain },
    { name: 'FAISS', icon: Database },
    { name: 'LangChain', icon: Layers },
    { name: 'FastAPI', icon: Zap },
    { name: 'PyTorch', icon: Cpu },
    { name: 'HuggingFace', icon: Heart },
];

// Fallback icons if specific libs aren't available, or just generic ones
import { Layers, Zap, Heart } from 'lucide-react';

const TechMarquee = () => {
    return (
        <div className="py-12 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/10 z-10 pointer-events-none"></div>

            {/* Gradient Fade Edges */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-20"></div>
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-20"></div>

            <motion.div
                className="flex items-center gap-16 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30,
                }}
            >
                {[...techs, ...techs, ...techs, ...techs].map((tech, idx) => ( // Quadruple for safety loop
                    <div key={idx} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
                        <tech.icon className="w-8 h-8 text-purple-400" />
                        <span className="text-xl font-bold text-slate-300 font-mono tracking-tight">{tech.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default TechMarquee;
