import React, { useState } from 'react';
import { GeneratedScript } from '../types';
import { Copy, Check, Youtube } from 'lucide-react';

interface ScriptOutputProps {
  data: GeneratedScript;
}

const ScriptOutput: React.FC<ScriptOutputProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`# ${data.title}\n\n${data.scriptContent}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full">
      <div className="bg-slate-900/80 border-b border-slate-700 p-4 flex justify-between items-center backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-1.5 rounded-lg">
            <Youtube className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white truncate max-w-[200px] sm:max-w-md">
            {data.title}
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            copied 
              ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.5)]' 
              : 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? '복사 완료!' : '대본 복사'}
        </button>
      </div>

      <div className="p-8 overflow-y-auto max-h-[600px] bg-slate-800 custom-scrollbar">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="mb-8 p-4 bg-brand-900/20 border border-brand-500/20 rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-100 m-0 leading-tight">
              {data.title}
            </h1>
          </div>
          
          <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans">
            {/* Simple markdown parser for bolding since we don't use external lib */}
            {data.scriptContent.split('**').map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="text-white font-bold bg-slate-700/50 px-1 rounded">{part}</strong> : part
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptOutput;