import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Target, Settings2 } from 'lucide-react';

export default function AtomDetailPage() {
  const { 
    roundUpsEnabled, 
    toggleRoundUps, 
    roundUpMultiplier, 
    setRoundUpMultiplier, 
    roundUpTransactions,
    totalSaved,
    monthlySaved,
    addSimulatedTransaction
  } = useAppContext();
  
  const navigate = useNavigate();

  // Group transactions by date
  const groupedTransactions = roundUpTransactions.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {} as Record<string, typeof roundUpTransactions>);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-24 relative">
      <header className="px-4 py-3 bg-white sticky top-0 z-10 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full hover:bg-gray-100">
            <ArrowLeft size={22} className="text-gray-900" />
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Header Info */}
        <div className="pt-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Round ups</h1>
          <p className="text-sm font-medium text-gray-600 leading-snug">
            Save a little from every UPI transaction by rounding your spends up to the nearest ₹10.
          </p>
        </div>

        {/* Total Summary */}
        <div className="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">Total Saved</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalSaved.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">This Month</p>
            <p className="text-xl font-bold text-groww-green">₹{monthlySaved.toLocaleString()}</p>
          </div>
        </div>

        {/* Toggle & Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Target size={20} className="text-gray-500" />
              </div>
              <span className="font-bold text-gray-900">Round ups</span>
            </div>
            <button 
              onClick={toggleRoundUps}
              className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${roundUpsEnabled ? 'bg-groww-green' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${roundUpsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className={`p-5 ${!roundUpsEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Settings2 size={20} className="text-gray-500" />
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Multiply round ups</span>
                <span className="text-[11px] font-medium text-gray-500">Save more with every spend</span>
              </div>
            </div>

            <div className="flex gap-2 mb-6 ml-13">
              {[1, 2, 3, 5].map(mult => (
                <button
                  key={mult}
                  onClick={() => setRoundUpMultiplier(mult)}
                  className={`w-12 h-9 rounded-full font-bold text-sm transition-all ${
                    roundUpMultiplier === mult 
                      ? 'border-2 border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {mult}x
                </button>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 ml-13">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">You spend</span>
                <span className="text-sm font-bold text-gray-900">₹37</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-700">Round up to</span>
                <span className="text-sm font-bold text-gray-900">₹40</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-sm font-bold text-gray-900">You save • ₹3 x {roundUpMultiplier}</span>
                <span className="text-sm font-bold text-groww-green bg-groww-pale-green px-3 py-1 rounded-lg">₹{3 * roundUpMultiplier}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo trigger */}
        <button 
          onClick={addSimulatedTransaction}
          disabled={!roundUpsEnabled}
          className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-sm disabled:opacity-50 disabled:bg-gray-300 active:bg-black transition-colors"
        >
          Simulate UPI Payment (Demo)
        </button>

        {/* History */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-4">Savings History</h2>
          
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(([date, txs]) => (
              <div key={date}>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-3">{date}</h3>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  {txs.map((tx, idx) => (
                    <div 
                      key={tx.id} 
                      className={`p-4 flex justify-between items-center ${idx !== txs.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-gray-600">
                          {tx.merchant[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{tx.merchant}</p>
                          <p className="text-[11px] font-medium text-gray-500 mt-0.5">Spent: ₹{tx.originalAmount} • Rounded: ₹{tx.roundedAmount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-groww-green">+₹{tx.investedAmount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
