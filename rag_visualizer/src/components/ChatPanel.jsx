import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { chat } from '../services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatPanel = ({ setVisualizationData, messages, setMessages, sessionId }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = { role: 'user', content: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setLoading(true);

        try {
            const userId = 'user_123';

            const response = await chat({
                query: userMsg.content,
                sessionId: sessionId,
                userId: userId
            });

            if (response.data.meta.http_code === 200) {
                const aiMsg = {
                    role: 'assistant',
                    content: response.data.data.answer
                };
                setMessages(prev => [...prev, aiMsg]);

                // Update Visualization
                if (response.data.data.visualization) {
                    setVisualizationData(response.data.data.visualization);
                }
            } else {
                setMessages(prev => [...prev, { role: 'error', content: 'Failed to get response.' }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'error', content: 'Network error.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel rounded-2xl flex flex-col h-[600px] overflow-hidden relative group border-slate-200/60 shadow-lg">


            {/* Header */}
            <div className="p-4 border-b border-slate-200/60 flex items-center justify-between bg-white/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg border border-purple-200 text-purple-600">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800 tracking-wide">RAG Assistant</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs text-slate-500 font-medium">Online & Ready</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth custom-scrollbar bg-slate-50/50">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                            <Bot className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="max-w-xs text-sm text-slate-500">
                            I'm ready to help you explore your documents. Ask me anything to get started!
                        </p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role !== 'user' && (
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-slate-200 shadow-sm mt-1">
                                <Bot className="w-5 h-5 text-purple-600" />
                            </div>
                        )}

                        <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm/relaxed border ${msg.role === 'user'
                                    ? 'bg-slate-900 text-white rounded-tr-none border-transparent font-medium shadow-md'
                                    : msg.role === 'error'
                                        ? 'bg-red-50 text-red-600 border-red-100 rounded-tl-none'
                                        : 'bg-white text-slate-700 rounded-tl-none border-slate-100 shadow-sm'
                                }`}>
                                {msg.role === 'user' ? (
                                    msg.content
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-100 prose-pre:border prose-pre:border-slate-200 prose-pre:text-slate-700"
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
                                                return !inline ? (
                                                    <div className="relative group/code my-2">
                                                        <code className={`${className} block bg-slate-100 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto`} {...props}>
                                                            {children}
                                                        </code>
                                                    </div>
                                                ) : (
                                                    <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-pink-600 font-medium border border-slate-200" {...props}>
                                                        {children}
                                                    </code>
                                                )
                                            }
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                            {msg.role !== 'user' && (
                                <span className="text-[10px] text-slate-400 mt-1 ml-1">AI Assistant</span>
                            )}
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 border border-slate-300 shadow-sm mt-1">
                                <User className="w-4 h-4 text-slate-600" />
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-4 justify-start">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-slate-200 shadow-sm">
                            <Bot className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-4 flex items-center gap-3 border border-slate-100 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-xs text-slate-500 font-medium">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-200/60 bg-white/60 backdrop-blur-md z-10">
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask a meaningful question..."
                        className="glass-input w-full pl-5 pr-12 py-3.5 rounded-xl text-sm transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 border-slate-200 bg-white/80 shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="absolute right-2 p-2 bg-slate-900 rounded-lg text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatPanel;
