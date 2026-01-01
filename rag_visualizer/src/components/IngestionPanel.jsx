import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ingestDocument } from '../services/api';
import { twMerge } from 'tailwind-merge';

const IngestionPanel = ({ accessLevel = 'private', defaultUserId = 'user_123' }) => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(defaultUserId);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setMessage('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        try {
            const response = await ingestDocument(file, userId, accessLevel);
            if (response.data.code === 200) {
                setStatus('success');
                setMessage(`Successfully ingested ${file.name}. ${response.data.data.chunks_count} chunks created.`);
            } else {
                setStatus('error');
                setMessage(response.data.message || 'Upload failed');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage('Network error or server unavailable.');
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                <Upload className="w-5 h-5 text-purple-600" />
                {accessLevel === 'common' ? 'Common Knowledge Ingestion' : 'Document Ingestion'}
            </h2>

            <div className="space-y-4">
                {accessLevel !== 'common' && (
                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                        <label className="text-sm font-medium text-slate-600">User ID (for private access)</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="glass-input rounded-xl px-4 py-2 text-sm"
                        />
                    </div>
                )}

                <div className="border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-purple-500 transition-all cursor-pointer relative hover:bg-white group shadow-inner">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".txt,.pdf,.md"
                    />
                    <FileText className="w-8 h-8 text-slate-400 group-hover:text-purple-500 transition-colors" />
                    <span className="text-sm text-slate-500 group-hover:text-purple-700 font-medium">
                        {file ? file.name : "Click to select or drag file here"}
                    </span>
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file || status === 'uploading'}
                    className={twMerge(
                        "w-full py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm",
                        !file || status === 'uploading'
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "glass-btn-primary"
                    )}
                >
                    {status === 'uploading' && <Loader2 className="w-4 h-4 animate-spin" />}
                    {status === 'uploading' ? 'Ingesting...' : 'Ingest Document'}
                </button>

                {status === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm flex items-start gap-2 shadow-sm">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{message}</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm flex items-start gap-2 shadow-sm">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IngestionPanel;
