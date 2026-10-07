import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, PlayCircle, AlertTriangle, ShieldCheck, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';

export default function RiskCheckPage() {
  const navigate = useNavigate();
  const { setRiskCheckPassed } = useAppContext();
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [step, setStep] = useState(0); 
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleNext = () => {
    if (step === 1 && selectedAnswer !== 0) return; // Q1 correct: 0
    if (step === 2 && selectedAnswer !== 1) return; // Q2 correct: 1
    if (step === 3 && selectedAnswer !== 0) return; // Q3 correct: 0
    
    setSelectedAnswer(null);
    if (step === 3) {
      setRiskCheckPassed(true);
    }
    setStep(s => s + 1);
  };

  if (!showQuiz) {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-24 relative">
        <header className="px-4 py-3 bg-white sticky top-0 z-10 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full hover:bg-gray-100">
              <ArrowLeft size={22} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">Before you start F&O</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-800 leading-snug mb-4">
              Futures and options are leveraged products. They can amplify both gains and losses, so they carry significantly more risk than long-term investing.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">1. What is F&O?</h3>
                <p className="text-[13px] text-gray-600">Contracts that derive their value from an underlying asset, allowing you to speculate on price movements.</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">2. Why is it risky?</h3>
                <p className="text-[13px] text-gray-600">Because of leverage and volatility, options have time decay. You can lose money extremely quickly if the market moves against you.</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-3">3. Investing vs F&O</h3>
                <div className="flex gap-2">
                  <div className="flex-1 bg-green-50 border border-green-100 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-2">
                      <ShieldCheck size={16} className="text-green-600" />
                      <span className="font-bold text-xs text-green-800">Investing</span>
                    </div>
                    <ul className="text-[11px] text-green-700 space-y-1 font-medium">
                      <li>• Long-term wealth</li>
                      <li>• Lower complexity</li>
                      <li>• Usually unleveraged</li>
                    </ul>
                  </div>
                  <div className="flex-1 bg-red-50 border border-red-100 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-2">
                      <TrendingUp size={16} className="text-red-600" />
                      <span className="font-bold text-xs text-red-800">F&O</span>
                    </div>
                    <ul className="text-[11px] text-red-700 space-y-1 font-medium">
                      <li>• Short-term trading</li>
                      <li>• Leveraged</li>
                      <li>• Higher risk</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">4. What can go wrong?</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-start text-[13px] text-gray-700">
                    <TrendingDown size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Leverage can magnify losses.</span>
                  </li>
                  <li className="flex gap-2 items-start text-[13px] text-gray-700">
                    <TrendingDown size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Options can expire completely worthless.</span>
                  </li>
                  <li className="flex gap-2 items-start text-[13px] text-gray-700">
                    <TrendingDown size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>Small price movements can create large P&L changes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm text-center">
            <AlertTriangle size={24} className="text-red-500 mx-auto mb-2" />
            <p className="text-red-800 font-bold text-sm leading-snug">
              93% of individual equity F&O traders incurred losses between FY22–FY24.
            </p>
            <p className="text-[10px] text-red-500 mt-2 font-bold uppercase tracking-wide">Source: SEBI</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Watch before you trade</h3>
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
              target="_blank" rel="noreferrer"
              className="block relative rounded-xl overflow-hidden mb-2"
            >
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400&h=200" alt="Video thumbnail" className="w-full h-32 object-cover opacity-90" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircle size={48} className="text-white opacity-90" />
              </div>
            </a>
            <p className="text-xs font-bold text-gray-800">F&O explained in 60 seconds</p>
          </div>

          <button 
            onClick={() => { setShowQuiz(true); setStep(1); }}
            className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-sm active:bg-black transition-colors"
          >
            Start quick knowledge check
          </button>
        </div>
      </div>
    );
  }

  // Quiz Mode
  return (
    <div className="flex-1 overflow-y-auto bg-white pb-24">
      <header className="px-4 py-3 bg-white sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => { setShowQuiz(false); setStep(0); }} className="p-1 -ml-1 rounded-full hover:bg-gray-100">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        <div className="flex-1 mr-6">
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-groww-blue h-full rounded-full transition-all duration-300" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="p-4 max-w-sm mx-auto pt-6">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Question 1 of 3</span>
            <h2 className="text-lg font-bold text-gray-900 mb-5 leading-snug">What happens when leverage increases?</h2>
            
            <div className="space-y-3 mb-6">
              {[
                "It amplifies both potential gains and losses.",
                "It guarantees higher returns.",
                "It removes the risk of losing your capital."
              ].map((ans, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-4 text-left border rounded-xl text-sm font-semibold transition-all ${
                    selectedAnswer === idx 
                      ? idx === 0 ? 'border-groww-blue bg-groww-pale-blue text-groww-blue' : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Question 2 of 3</span>
            <h2 className="text-lg font-bold text-gray-900 mb-5 leading-snug">What happens to an option when it expires out of the money?</h2>
            
            <div className="space-y-3 mb-6">
              {[
                "You get a partial refund.",
                "It becomes completely worthless.",
                "It automatically rolls over to the next month."
              ].map((ans, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-4 text-left border rounded-xl text-sm font-semibold transition-all ${
                    selectedAnswer === idx 
                      ? idx === 1 ? 'border-groww-blue bg-groww-pale-blue text-groww-blue' : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Question 3 of 3</span>
            <h2 className="text-lg font-bold text-gray-900 mb-5 leading-snug">Can an F&O trade lose money quickly?</h2>
            
            <div className="space-y-3 mb-6">
              {[
                "Yes, small price movements can create large losses.",
                "No, F&O is designed to be a slow, stable investment.",
              ].map((ans, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-4 text-left border rounded-xl text-sm font-semibold transition-all ${
                    selectedAnswer === idx 
                      ? idx === 0 ? 'border-groww-blue bg-groww-pale-blue text-groww-blue' : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center text-center pt-8">
            <div className="w-16 h-16 bg-groww-pale-green rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-groww-green" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 mb-2">Risk check completed</h1>
            <p className="text-xs text-gray-600 font-medium mb-8 max-w-[260px] bg-gray-50 p-3 rounded-lg border border-gray-100">
              Completing this check does not make F&O low-risk or guarantee successful trades.
            </p>
            
            <button 
              onClick={() => navigate('/fno')}
              className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-sm active:bg-black transition-colors"
            >
              Continue to F&O
            </button>
          </div>
        )}

        {step > 0 && step < 4 && (
          <button 
            onClick={handleNext}
            disabled={
              selectedAnswer === null || 
              (step === 1 && selectedAnswer !== 0) || 
              (step === 2 && selectedAnswer !== 1) || 
              (step === 3 && selectedAnswer !== 0)
            }
            className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-sm disabled:opacity-50 disabled:bg-gray-300 transition-colors"
          >
            {step === 3 ? 'Finish' : 'Continue'}
          </button>
        )}
      </div>
    </div>
  );
}
