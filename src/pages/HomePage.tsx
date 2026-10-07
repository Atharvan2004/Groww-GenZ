import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, QrCode, PieChart, BriefcaseBusiness, ClipboardList } from 'lucide-react';
import ExplorePage from './ExplorePage';

const STOCK_TABS = ['Explore', 'Holdings', 'Positions', 'Orders'] as const;

export default function HomePage() {
  const { goals } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<(typeof STOCK_TABS)[number]>('Explore');

  return (
    <div className="flex-1 overflow-y-auto bg-white pb-24">
      {/* Header */}
      <header className="px-4 py-3 bg-white sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-groww-green flex items-center justify-center text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">Stocks</span>
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
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1 rounded font-medium">expiry</span>
          </div>
          <div className="text-[15px] font-bold text-gray-900">25,950.00</div>
          <div className="text-xs font-medium text-red-500">-63.45 (0.24%)</div>
        </div>
        <div className="flex-1 min-w-[140px] bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-gray-600">SENSEX</span>
          </div>
          <div className="text-[15px] font-bold text-gray-900">84,827.58</div>
          <div className="text-xs font-medium text-red-500">-123.37 (0.15%)</div>
        </div>
      </div>

      <nav className="sticky top-[56px] z-10 flex gap-7 overflow-x-auto hide-scrollbar border-b border-gray-100 bg-white px-4">
        {STOCK_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`relative shrink-0 py-3 text-sm font-medium ${activeTab === tab ? 'text-gray-900' : 'text-gray-500'}`}>
            {tab}
            {activeTab === tab && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-groww-green" />}
          </button>
        ))}
      </nav>

      {activeTab === 'Explore' && <ExplorePage />}
      {activeTab === 'Holdings' && <HoldingsView goals={goals} />}
      {(activeTab === 'Positions' || activeTab === 'Orders') && (
        <div className="px-5 py-16 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-500">
            {activeTab === 'Positions' ? <BriefcaseBusiness size={22} /> : <ClipboardList size={22} />}
          </div>
          <h2 className="text-base font-semibold text-gray-900">No {activeTab.toLowerCase()} yet</h2>
          <p className="mt-1 text-sm text-gray-500">Your {activeTab.toLowerCase()} will show up here.</p>
        </div>
      )}
    </div>
  );
}

function HoldingsView({ goals }: { goals: ReturnType<typeof useAppContext>['goals'] }) {
  const navigate = useNavigate();
  const firstCar = goals.find(goal => goal.name === 'First Car');
  const emergencyFund = goals.find(goal => goal.name === 'Emergency Fund');
  const holdings = [
    { name: 'Nifty 50 Index Fund', type: 'Mutual fund', value: 45000, returnValue: 4200, goal: firstCar ? `${firstCar.name} · ${Math.round(firstCar.currentAmount / firstCar.targetAmount * 100)}% of goal` : undefined },
    { name: 'Groww Savings', type: 'Savings', value: 32000, returnValue: 0, goal: emergencyFund ? `${emergencyFund.name} · ${Math.round(emergencyFund.currentAmount / emergencyFund.targetAmount * 100)}% of goal` : undefined },
    { name: 'Reliance Industries', type: 'Stock', value: 28650, returnValue: 3180 },
    { name: 'Nifty 50 ETF', type: 'ETF', value: 19200, returnValue: 1040 },
  ];

  return (
    <div className="space-y-5 px-4 py-5">
      <section className="border-b border-gray-100 pb-5">
        <p className="text-xs text-gray-500">Portfolio value</p>
        <div className="mt-1 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-gray-900">₹1,24,850</h2>
          <span className="text-sm font-semibold text-groww-green">+₹8,420 (7.2%)</span>
        </div>
      </section>
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900"><PieChart size={17} className="text-groww-blue" /> Investments</div>
      <section className="divide-y divide-gray-100">
        {holdings.map(holding => (
          <button key={holding.name} onClick={() => holding.goal?.startsWith('First Car') && navigate(`/goal/${firstCar?.id}`)} className="flex w-full items-center justify-between gap-3 py-4 text-left">
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xs font-bold text-groww-blue">{holding.type === 'Stock' ? 'R' : holding.type === 'ETF' ? 'ETF' : holding.type === 'Savings' ? '₹' : '50'}</span>
              <span className="min-w-0"><span className="block truncate text-sm font-semibold text-gray-900">{holding.name}</span><span className="block text-xs text-gray-500">{holding.type}</span>{holding.goal && <span className="mt-1 block truncate text-[11px] font-medium text-groww-blue">{holding.goal}</span>}</span>
            </span>
            <span className="shrink-0 text-right"><span className="block text-sm font-semibold text-gray-900">₹{holding.value.toLocaleString('en-IN')}</span><span className={`block text-xs ${holding.returnValue ? 'text-groww-green' : 'text-gray-500'}`}>{holding.returnValue ? `+₹${holding.returnValue.toLocaleString('en-IN')}` : 'Savings'}</span></span>
          </button>
        ))}
      </section>
    </div>
  );
}
