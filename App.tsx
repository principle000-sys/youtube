import React, { useState } from 'react';
import { generateViralScript } from './services/geminiService';
import { AppState, ViralResponse } from './types';
import AnalysisCard from './components/AnalysisCard';
import ScriptOutput from './components/ScriptOutput';
import { Sparkles, FileText, ArrowRight, RefreshCw, Zap } from './components/Icons';

const EXAMPLE_SCRIPT = `(오프닝 - 빠른 컷 전환)
여러분, 이 물건 하나로 인생이 바뀐다면 믿으시겠습니까? 
단돈 5천 원입니다. 다이소에서 파는 건데, 이거 진짜 미쳤습니다.
오늘 제가 직접 써보고 확실하게 검증해드립니다.
안 보면 진짜 후회합니다. 바로 가시죠!`;

function App() {
  const [originalScript, setOriginalScript] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<ViralResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!originalScript.trim() || !newTopic.trim()) {
      alert("대본과 주제를 모두 입력해주세요.");
      return;
    }

    setState(AppState.ANALYZING);
    setErrorMsg(null);

    try {
      const response = await generateViralScript(originalScript, newTopic);
      setResult(response);
      setState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setState(AppState.ERROR);
      setErrorMsg("오류가 발생했습니다. 잠시 후 다시 시도해주세요. (API Key 확인 필요)");
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setResult(null);
    setErrorMsg(null);
  };

  const fillExample = () => {
    setOriginalScript(EXAMPLE_SCRIPT);
    setNewTopic("스마트폰 배터리 오래 쓰는 숨겨진 꿀팁");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/30 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            Viral Script Generator
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight">
            유튜브 떡상 대본 복제기
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            성공한 영상의 <span className="text-brand-400 font-semibold">DNA</span>를 추출하세요.<br />
            당신의 주제에 맞춰 완벽하게 새로운 대본으로 재탄생시킵니다.
          </p>
        </header>

        {/* Input Section (Hidden when Success) */}
        {state !== AppState.SUCCESS && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            
            {/* Input Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-500" />
                      원본 떡상 대본 (복사/붙여넣기)
                    </label>
                    <button 
                      onClick={fillExample}
                      className="text-xs text-brand-400 hover:text-brand-300 underline underline-offset-2 transition-colors"
                    >
                      예시 채우기
                    </button>
                  </div>
                  <textarea
                    value={originalScript}
                    onChange={(e) => setOriginalScript(e.target.value)}
                    placeholder="여기에 성공한 영상의 대본을 붙여넣으세요... (예: 오프닝 멘트, 핵심 내용 등)"
                    className="w-full h-48 bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none text-base leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    새로 만들 주제
                  </label>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="예: 아이폰 싸게 사는 법, 자취생 필수템 추천..."
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-4 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-lg"
                  />
                </div>
              </div>

              {state === AppState.ERROR && (
                <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <div className="mt-8">
                <button
                  onClick={handleGenerate}
                  disabled={state === AppState.ANALYZING}
                  className={`w-full py-5 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    state === AppState.ANALYZING
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-500/25'
                  }`}
                >
                  {state === AppState.ANALYZING ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      구조 분석 및 생성 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      떡상 대본 생성하기
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Features/Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-slate-500 text-sm">
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <strong className="block text-slate-300 mb-1">구조 복제</strong>
                성공한 훅과 흐름을 그대로 적용
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                 <strong className="block text-slate-300 mb-1">톤앤매너 유지</strong>
                 특유의 말투와 분위기 재현
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                 <strong className="block text-slate-300 mb-1">초고속 생성</strong>
                 Gemini AI로 5초 만에 완성
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {state === AppState.SUCCESS && result && (
          <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-slate-700 transition-colors">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                </div>
                <span>다시 만들기</span>
              </button>
              
              <div className="text-sm text-slate-500">
                AI Generated Context
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Analysis */}
              <div className="lg:col-span-4 space-y-6">
                <AnalysisCard analysis={result.analysis} />
                <div className="bg-gradient-to-br from-brand-900/50 to-slate-900/50 p-6 rounded-xl border border-brand-500/20">
                  <h4 className="font-bold text-white mb-2">💡 팁</h4>
                  <p className="text-sm text-slate-300">
                    생성된 대본을 바탕으로 본인의 경험담을 한 두 문장 섞어주면 진정성이 올라가 시청 지속 시간이 더 길어집니다.
                  </p>
                </div>
              </div>
              
              {/* Right Column: Generated Script */}
              <div className="lg:col-span-8 h-full min-h-[500px]">
                <ScriptOutput data={result.newScript} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;