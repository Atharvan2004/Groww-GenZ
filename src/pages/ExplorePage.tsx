import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgePercent, CalendarDays, ChartNoAxesCombined, ChevronDown, ChevronRight, ChevronUp, FileText, Megaphone, TrendingUp } from 'lucide-react';

const tradedStocks = [
  { name: 'PhysicsWallah', price: '₹142.59', change: '+17.70', percentage: '+14.17%', initials: 'PW', tone: 'bg-gray-900 text-white' },
  { name: 'Wockhardt', price: '₹1,464.00', change: '+229.00', percentage: '+18.54%', initials: 'W', tone: 'bg-red-500 text-white' },
];

const moverData = {
  Gainers: [
    { name: 'Wockhardt', price: '₹1,460.00', change: '+225.00 (18.22%)', initials: 'W' },
    { name: 'Aegis Vopak Terminal', price: '₹274.90', change: '+14.35 (5.51%)', initials: 'AV' },
    { name: 'IEX', price: '₹192.75', change: '+8.40 (4.56%)', initials: 'I' },
    { name: 'Groww', price: '₹182.40', change: '+8.20 (4.70%)', initials: 'G' },
  ],
  Losers: [
    { name: 'Sudeep Pharma', price: '₹734.25', change: '-39.90 (5.15%)', initials: 'SP' },
    { name: 'Tata Motors', price: '₹712.80', change: '-18.20 (2.49%)', initials: 'TM' },
    { name: 'Hindalco', price: '₹628.10', change: '-11.60 (1.81%)', initials: 'H' },
    { name: 'Infosys', price: '₹1,542.00', change: '-22.30 (1.43%)', initials: 'I' },
  ],
  'Small Cap': [
    { name: 'Aegis Vopak Terminal', price: '₹274.90', change: '+14.35 (5.51%)', initials: 'AV' },
    { name: 'IEX', price: '₹192.75', change: '+8.40 (4.56%)', initials: 'I' },
    { name: 'Sudeep Pharma', price: '₹734.25', change: '-39.90 (5.15%)', initials: 'SP' },
    { name: 'Wockhardt', price: '₹1,460.00', change: '+225.00 (18.22%)', initials: 'W' },
  ],
};

export default function ExplorePage() {
  const navigate = useNavigate();
  const { goals } = useAppContext();
  const [moverFilter, setMoverFilter] = useState<keyof typeof moverData>('Gainers');
  const [showMoreTools, setShowMoreTools] = useState(false);

  const openRealityCheck = (claim: string, manual = false) => navigate('/reality-check', { state: { claim, manual } });

  return (
    <div className="space-y-8 px-4 pb-7 pt-5">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Your goals</h2>
          <button onClick={() => navigate('/goals')} className="text-sm font-semibold text-groww-blue">View all</button>
        </div>
        {goals.length > 0 ? <GoalCards /> : <button onClick={() => navigate('/goals')} className="w-full rounded-xl border border-dashed border-gray-300 p-5 text-sm font-semibold text-groww-blue">+ Add your first goal</button>}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Most traded on Groww</h2>
        <div className="grid grid-cols-2 gap-3">
          {tradedStocks.map(stock => <article key={stock.name} className="min-h-[126px] rounded-xl border border-gray-200 bg-white p-3">
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${stock.tone}`}>{stock.initials}</div>
            <h3 className="truncate text-sm font-medium text-gray-800">{stock.name}</h3>
            <p className="mt-3 text-sm font-semibold text-gray-900">{stock.price}</p>
            <p className={`text-xs font-medium ${stock.change.startsWith('+') ? 'text-groww-green' : 'text-red-500'}`}>{stock.change} ({stock.percentage})</p>
          </article>)}
        </div>
        <p className="mt-2 text-[10px] text-gray-400">Fictional demo prices</p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Products and tools</h2>
          <button onClick={() => setShowMoreTools(value => !value)} className="flex items-center gap-1 text-sm font-medium text-gray-500">{showMoreTools ? 'See less' : 'See more'} {showMoreTools ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
        </div>
        <div className="flex justify-between gap-4 overflow-x-auto hide-scrollbar pb-1">
          {[
            { label: 'MTF', Icon: BadgePercent }, { label: 'Events', Icon: CalendarDays }, { label: 'ETF', Icon: ChartNoAxesCombined }, { label: 'IPO', Icon: Megaphone }, { label: 'Bonds', Icon: FileText },
            ...(showMoreTools ? [{ label: 'Stocks', Icon: TrendingUp }, { label: 'Funds', Icon: ChartNoAxesCombined }] : []),
          ].map(({ label, Icon }) => <div key={label} className="flex min-w-[54px] flex-col items-center gap-2 text-gray-700">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-groww-pale-green text-groww-blue"><Icon size={24} strokeWidth={1.8} /></span>
            <span className="text-xs font-medium">{label}</span>
          </div>)}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">What's buzzing</h2>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          <BuzzCard
            category="Stock"
            tag="Stock · Trending"
            headline="This stock is suddenly everywhere 👀"
            stat="+14%"
            statColor="text-groww-green"
            subtitle="MosChip Technologies gained up to 14% amid strong momentum"
            cta="Reality Check"
            onClick={() => openRealityCheck('This stock is suddenly everywhere — MosChip Technologies gained up to 14% amid strong momentum')}
          />
          <BuzzCard
            category="Budget"
            tag="Budget · Infrastructure"
            headline="₹11L Cr for infrastructure — what changes?"
            stat="₹11 Lakh Cr"
            statColor="text-gray-900"
            subtitle="India's FY27 Budget allocates around ₹11 lakh crore to capital expenditure"
            cta="See the impact"
            onClick={() => openRealityCheck('₹11L Cr for infrastructure — India\'s FY27 Budget allocates around ₹11 lakh crore to capital expenditure')}
          />
          <BuzzCard
            category="ETF"
            tag="ETF · New Rules"
            headline="ETF rules just changed. Should you care?"
            stat="10% → 20%"
            statColor="text-gray-900"
            subtitle="New ETF price-band rules allow bands to widen from 10% to 20%"
            cta="Understand this"
            onClick={() => openRealityCheck('ETF rules just changed — New ETF price-band rules allow bands to widen from 10% to 20%')}
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Top movers today</h2>
          <TrendingUp size={18} className="text-gray-400" />
        </div>
        <div className="mb-4 flex gap-2 overflow-x-auto hide-scrollbar">
          {(Object.keys(moverData) as Array<keyof typeof moverData>).map(filter => <button key={filter} onClick={() => setMoverFilter(filter)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${moverFilter === filter ? 'border-gray-500 bg-gray-50 text-gray-900' : 'border-gray-200 text-gray-600'}`}>{filter}{filter === 'Small Cap' && <ChevronDown size={14} className="ml-1 inline" />}</button>)}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {moverData[moverFilter].map(stock => <article key={stock.name} className="min-h-[152px] rounded-xl border border-gray-200 p-4">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 text-xs font-bold text-groww-blue">{stock.initials}</span>
            <h3 className="min-h-10 text-sm font-medium leading-5 text-gray-800">{stock.name}</h3>
            <p className="mt-1 text-sm font-semibold text-gray-900">{stock.price}</p>
            <p className={`text-xs font-semibold ${stock.change.startsWith('+') ? 'text-groww-green' : 'text-red-500'}`}>{stock.change}</p>
          </article>)}
        </div>
        <p className="mt-2 text-[10px] text-gray-400">Fictional demo prices</p>
      </section>

      <section className="border-t border-gray-100 pt-5">
        <h2 className="text-base font-bold text-gray-900">Saw something online?</h2>
        <p className="mt-1 text-sm text-gray-500">Not sure if an investment claim is true?</p>
        <button onClick={() => openRealityCheck('', true)} className="mt-3 flex items-center gap-1 text-sm font-semibold text-groww-blue">Check a claim <ChevronRight size={16} /></button>
      </section>
    </div>
  );
}

function GoalCards() {
  const { goals } = useAppContext();
  const navigate = useNavigate();
  const [primaryGoal, ...otherGoals] = goals;
  const progress = Math.round(primaryGoal.currentAmount / primaryGoal.targetAmount * 100);

  return <>
    <button onClick={() => navigate(`/goal/${primaryGoal.id}`)} className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left active:bg-gray-50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-groww-pale-green text-xl">{primaryGoal.icon}</span><span><span className="block text-sm font-semibold text-gray-900">{primaryGoal.name}</span><span className="mt-0.5 block text-xs text-gray-500">Target: {primaryGoal.targetDate}</span></span></div>
        <span className="shrink-0 text-right"><span className="block text-base font-bold text-gray-900">{formatCurrency(primaryGoal.currentAmount)}</span><span className="block text-xs text-gray-500">of {formatCurrency(primaryGoal.targetAmount)}</span></span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-groww-green" style={{ width: `${Math.min(progress, 100)}%` }} /></div>
      <div className="mt-3 flex items-center justify-between"><span className="text-xs font-medium text-gray-600">{formatCurrency(primaryGoal.monthlyContribution)}/month</span><span className="text-xs font-semibold text-groww-green">{progress}% complete</span></div>
      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-groww-green"><span className="h-1.5 w-1.5 rounded-full bg-groww-green" />You're on track</div>
    </button>
    <div className="mt-3 flex gap-3 overflow-x-auto hide-scrollbar pb-1">
      {otherGoals.map(goal => <button key={goal.id} onClick={() => navigate(`/goal/${goal.id}`)} className="min-w-[160px] rounded-xl border border-gray-200 bg-white p-3 text-left active:bg-gray-50">
        <span className="flex items-center gap-2"><span className="text-base">{goal.icon}</span><span className="truncate text-xs font-semibold text-gray-900">{goal.name}</span></span>
        <span className="mt-2 block text-sm font-semibold text-gray-900">{formatCurrency(goal.currentAmount)} <span className="text-xs font-normal text-gray-500">/ {formatCurrency(goal.targetAmount)}</span></span>
      </button>)}
      <button onClick={() => navigate('/goals')} className="flex min-w-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-sm font-medium text-gray-600">+ Add a goal</button>
    </div>
  </>;
}

function BuzzCard({ category, tag, headline, stat, statColor, subtitle, cta, onClick }: {
  category: string;
  tag: string;
  headline: string;
  stat: string;
  statColor: string;
  subtitle: string;
  cta: string;
  onClick: () => void;
}) {
  const badgeStyles: Record<string, string> = {
    Stock: 'bg-orange-50 text-orange-600',
    Budget: 'bg-groww-pale-blue text-groww-blue',
    ETF: 'bg-groww-pale-green text-groww-green',
  };
  return <article className="min-w-[280px] shrink-0 rounded-xl border border-gray-200 bg-white p-4">
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeStyles[category] ?? 'bg-gray-100 text-gray-600'}`}>{tag}</span>
    <p className={`mt-3 text-3xl font-bold tracking-tight ${statColor}`}>{stat}</p>
    <h3 className="mt-2 text-sm font-semibold text-gray-900 leading-snug">{headline}</h3>
    <p className="mt-1 text-xs text-gray-500 leading-snug">{subtitle}</p>
    <button onClick={onClick} className="mt-3 flex items-center gap-1 text-sm font-semibold text-groww-blue">{cta} <ChevronRight size={16} /></button>
  </article>;
}

import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
