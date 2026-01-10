import React from 'react';
import { motion } from 'framer-motion';
import { BsDatabaseGear } from "react-icons/bs"
import {
  SiPytorch,
  SiRedis,
  SiLangchain,
  SiFastapi,
  SiOpenai,
  SiHuggingface,
  SiPython,
  SiReact,
  SiPostgresql,
  SiPydantic,
  SiGunicorn,
  SiOllama,
  SiAnthropic,
  SiPypi,
} from "react-icons/si"

const techs = [
  { name: "Python", icon: SiPython },
  { name: "Pydantic", icon: SiPydantic },
  { name: "Gunicorn", icon: SiGunicorn },
  { name: "OpenAI", icon: SiOpenai },
  { name: "LangChain", icon: SiLangchain },
  { name: "FastAPI", icon: SiFastapi },
  { name: "PyTorch", icon: SiPytorch },
  { name: "HuggingFace", icon: SiHuggingface },
  { name: "Redis", icon: SiRedis },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "React", icon: SiReact },
  { name: "Chroma", icon: BsDatabaseGear },
  { name: "Ollama", icon: SiOllama },
  { name: "Anthropic", icon: SiAnthropic },
  { name: "PyPI", icon: SiPypi },
]

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
