import { useNavigate } from 'react-router-dom';
import { Search, QrCode, PlayCircle, Link2, BookOpen } from 'lucide-react';

export default function FnOPage() {
  const navigate = useNavigate();

  const topTraded = [
    { name: 'NIFTY 50', value: '26,171.20', change: '-31.75 (0.12%)', positive: false, icon: 'bg-orange-100 text-orange-500' },
    { name: 'SENSEX', value: '85,624.19', change: '-82.48 (0.10%)', positive: false, icon: 'bg-blue-100 text-blue-500' },
    { name: 'BANK NIFTY', value: '59,676.85', change: '-75.85 (0.13%)', positive: false, icon: 'bg-yellow-100 text-yellow-600' },
    { name: 'HDFC Bank', value: '1,003.10', change: '-4.50 (0.45%)', positive: false, icon: 'bg-red-50 text-red-700 border-red-200 border' },
    { name: 'TVS Motor Company', value: '3,639.70', change: '+108.20 (3.06%)', positive: true, icon: 'bg-red-600 text-white' },
    { name: 'Kaynes Technology', value: '5,362.00', change: '-128.00 (2.33%)', positive: false, icon: 'bg-red-800 text-white' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white pb-24">
      {/* Header */}
      <header className="px-4 py-3 bg-white sticky top-0 z-20 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-groww-green flex items-center justify-center text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">F&O</span>
        </div>
        <div className="flex items-center gap-4 text-gray-700">
          <Search size={22} strokeWidth={2} />
          <QrCode size={22} strokeWidth={2} />
          <div 
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full bg-groww-pale-blue flex items-center justify-center overflow-hidden border border-gray-200 cursor-pointer"
          >
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Atharvan&backgroundColor=E5F4FD" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Indices */}
      <div className="px-4 py-2 flex gap-3 overflow-x-auto hide-scrollbar">
        <div className="flex-1 min-w-[140px] bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-gray-600">NIFTY 50</span>
          </div>
          <div className="text-[15px] font-bold text-gray-900">26,171.20</div>
          <div className="text-xs font-medium text-red-500">-31.75 (0.12%)</div>
        </div>
        <div className="flex-1 min-w-[140px] bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-gray-600">SENSEX</span>
          </div>
          <div className="text-[15px] font-bold text-gray-900">85,624.19</div>
          <div className="text-xs font-medium text-red-500">-82.48 (0.10%)</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 border-b border-gray-100 flex gap-6 overflow-x-auto hide-scrollbar mt-2">
        {['Explore', 'Positions', 'Orders', 'All watchlists'].map((tab, idx) => (
          <div 
            key={tab} 
            className={`py-3 text-sm font-semibold whitespace-nowrap border-b-2 ${idx === 0 ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="px-4 py-4 space-y-6">
        
        {/* Education Section (New to F&O) */}
        <section 
          onClick={() => navigate('/risk-check')}
          className="bg-groww-pale-blue border border-groww-light-blue rounded-2xl p-4 cursor-pointer active:bg-blue-50 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-base font-bold text-groww-blue">New to F&O?</h2>
              <p className="text-[11px] font-medium text-gray-600 mt-0.5">Understand the risks before you start trading.</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-groww-blue text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
              <PlayCircle size={14} /> Watch 60-sec video
            </button>
            <button className="flex-1 py-2 bg-white text-groww-blue border border-groww-blue rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
              <BookOpen size={14} /> Learn the basics
            </button>
          </div>
        </section>

        {/* Top Traded */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Top Traded</h2>
          
          <div className="flex gap-2 mb-4">
            <div className="px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-900 bg-white shadow-sm">Equity</div>
            <div className="px-4 py-1.5 border border-transparent text-gray-500 rounded-full text-xs font-semibold">Commodities</div>
          </div>

          <div className="space-y-1">
            {topTraded.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${item.icon}`}>
                    {item.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[11px] text-gray-500 font-medium">{item.value}</span>
                      <span className={`text-[11px] font-bold ${item.positive ? 'text-groww-green' : 'text-red-500'}`}>{item.change}</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                  <Link2 size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
