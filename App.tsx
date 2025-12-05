import React, { useState, useEffect } from 'react';
import { generateViralScript } from './services/geminiService';
import { AppState, ViralResponse } from './types';
import AnalysisCard from './components/AnalysisCard';
import ScriptOutput from './components/ScriptOutput';
import { Sparkles, FileText, ArrowRight, RefreshCw, Zap, Key } from './components/Icons';

const EXAMPLE_SCRIPT = `(오프닝 - 빠른 컷 전환)
여러분, 이 물건 하나로 인생이 바뀐다면 믿으시겠습니까? 
단돈 5천 원입니다. 다이소에서 파는 건데, 이거 진짜 미쳤습니다.
오늘 제가 직접 써보고 확실하게 검증해드립니다.
안 보면 진짜 후회합니다. 바로 가시죠!`;

const API_KEY_STORAGE = 'gemini_api_key';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [rememberKey, setRememberKey] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  const [originalScript, setOriginalScript] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<ViralResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE);
    if (savedKey) {
      setApiKey(savedKey);
      setRememberKey(true);
    } else {
      setShowApiInput(true);
    }
  }, []);

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    if (rememberKey) {
      localStorage.setItem(API_KEY_STORAGE, value);
    }
  };

  const handleRememberChange = (checked: boolean) => {
    setRememberKey(checked);
    if (checked && apiKey) {
      localStorage.setItem(API_KEY_STORAGE, apiKey);
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
    }
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      alert("API Key를 입력해주세요.");
      setShowApiInput(true);
      return;
    }
    if (!originalScript.trim() || !newTopic.trim()) {
      alert("대본과 주제를 모두 입력해주세요.");
      return;
    }

    setState(AppState.ANALYZING);
    setErrorMsg(null);

    try {
      const response = await generateViralScript(originalScript, newTopic, apiKey);
      setResult(response);
      setState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setState(AppState.ERROR);
      setErrorMsg("오류가 발생했습니다. API Key를 확인하거나 잠시 후 다시 시도해주세요.");
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
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            유튜브 떡상 대본 복제기
          </h1>
          <p className="text-base text-slate-400">
            성공한 영상의 구조를 분석하여 새로운 주제로 재창조합니다
          </p>
        </header>

        {/* API Key Section */}
        {(!apiKey || showApiInput) && state !== AppState.SUCCESS && (
          <div className="max-w-2xl mx-auto mb-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg font-semibold text-white">API Key 설정</h2>
            </div>
            <div className="space-y-3">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="Google AI Studio API Key"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberKey}
                    onChange={(e) => handleRememberChange(e.target.checked)}
                    className="rounded bg-slate-700 border-slate-600 text-brand-500 focus:ring-brand-500"
                  />
                  <span>API Key 기억하기</span>
                </label>
                <a 
                  href="https://aistudio.google.com/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  API Key 발급받기 →
                </a>
              </div>
              {apiKey && (
                <button
                  onClick={() => setShowApiInput(false)}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  확인
                </button>
              )}
            </div>
          </div>
        )}

        {/* API Key Status Badge */}
        {apiKey && !showApiInput && state !== AppState.SUCCESS && (
          <div className="max-w-2xl mx-auto mb-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>API Key 연결됨</span>
            </div>
            <button
              onClick={() => setShowApiInput(true)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              변경
            </button>
          </div>
        )}

        {/* Input Section */}
        {state !== AppState.SUCCESS && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="space-y-5">;
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      원본 대본
                    </label>
                    <button 
                      onClick={fillExample}
                      className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      예시 채우기
                    </button>
                  </div>
                  <textarea
                    value={originalScript}
                    onChange={(e) => setOriginalScript(e.target.value)}
                    placeholder="성공한 영상의 대본을 붙여넣으세요..."
                    className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    새로 만들 주제
                  </label>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="예: 아이폰 싸게 사는 법"
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {state === AppState.ERROR && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={state === AppState.ANALYZING}
                className={`w-full mt-6 py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-all ${
                  state === AppState.ANALYZING
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-600 hover:bg-brand-500 text-white'
                }`}
              >
                {state === AppState.ANALYZING ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    분석 및 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    대본 생성하기
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {state === AppState.SUCCESS && result && (
          <div className="space-y-6">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>다시 만들기</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
              <div className="lg:col-span-4 space-y-4">
                <AnalysisCard analysis={result.analysis} />
              </div>
              
              <div className="lg:col-span-8">
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