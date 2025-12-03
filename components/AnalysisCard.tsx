import React from 'react';
import { ScriptAnalysis } from '../types';
import { BarChart3, Zap, Activity, Layers } from 'lucide-react';

interface AnalysisCardProps {
  analysis: ScriptAnalysis;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-brand-500" />
        성공 요인 분석
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" /> 후킹 전략 (Hook)
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">{analysis.hookStrategy}</p>
          </div>
          
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> 톤 앤 매너 & 페이스
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">{analysis.pacingAndTone}</p>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 h-full">
            <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" /> 구조 분석
            </h4>
            <ul className="space-y-2">
              {analysis.structureBreakdown.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-700">
                    {idx + 1}
                  </span>
                  <span className="mt-0.5">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-700">
         <p className="text-sm text-slate-400 italic">
           <span className="font-bold text-yellow-500">🔥 핵심 포인트:</span> {analysis.keyViralFactors}
         </p>
      </div>
    </div>
  );
};

export default AnalysisCard;