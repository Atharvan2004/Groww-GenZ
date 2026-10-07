import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { ArrowLeft, TrendingUp, AlertTriangle, PiggyBank } from 'lucide-react';

// ── Per-goal funding config ──────────────────────────────────────────────────
const fundingConfig = {
  equity: {
    icon: <TrendingUp size={20} className="text-groww-blue" />,
    iconBg: 'bg-groww-pale-blue',
    name: 'Nifty 50 Index Fund',
    tagline: "Designed to grow your money over the long term by investing in India's top companies.",
    label: 'Monthly investment',
    canExplain: true,
  },
  savings: {
    icon: <PiggyBank size={20} className="text-green-600" />,
    iconBg: 'bg-green-50',
    name: 'Groww Savings',
    tagline: 'A simple savings account that keeps your money safe and accessible.',
    label: 'Monthly saving',
    canExplain: true,
  },
  custom: {
    icon: <TrendingUp size={20} className="text-gray-500" />,
    iconBg: 'bg-gray-50',
    name: 'Custom',
    tagline: '',
    label: 'Monthly contribution',
    canExplain: false,
  },
};

// ── Explanation sheet content per funding type ────────────────────────────────
const explanationContent = {
  equity: {
    title: 'Nifty 50 Index Fund',
    what: 'An index fund that tracks India\'s 50 largest listed companies.',
    why: 'Your goal is several years away, giving you more time to handle market ups and downs.',
    risk: 'High',
    riskColor: 'text-red-500',
    fee: '₹20/yr per ₹10k',
    wrong: 'The value can fall during market downturns, and returns are not guaranteed.',
  },
  savings: {
    title: 'Groww Savings',
    what: 'A savings account that holds your money securely with no lock-in period. Your balance is available whenever you need it.',
    why: 'Emergency funds need to be accessible at any time. A savings account avoids market risk so your money is always available.',
    risk: 'Low',
    riskColor: 'text-green-600',
    fee: 'No fund fee',
    wrong: 'Returns from savings accounts are generally lower than equity over the long term. Interest rates may change over time.',
  },
  custom: {
    title: 'Custom Goal',
    what: 'You are saving toward a custom goal.',
    why: 'Track your progress here.',
    risk: 'Varies',
    riskColor: 'text-gray-600',
    fee: 'Varies',
    wrong: 'Returns depend on the investment or savings product you choose.',
  },
};

// ────────────────────────────────────────────────────────────────────────────

export default function GoalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, addMoneyToGoal } = useAppContext();

  const goal = goals.find(g => g.id === id);
  const [customAmount, setCustomAmount] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  if (!goal) return <div className="p-6">Goal not found</div>;

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const funding = fundingConfig[goal.fundingType ?? 'custom'];
  const explanation = explanationContent[goal.fundingType ?? 'custom'];

  const handleAddMoney = (amount: number) => addMoneyToGoal(goal.id, amount);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-24 relative">
      {/* Header */}
      <header className="px-4 py-3 bg-white sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full hover:bg-gray-100">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">{goal.name}</h1>
      </header>

      <div className="p-4 space-y-4">

        {/* Progress Card */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(goal.currentAmount)}</div>
              <div className="text-sm text-gray-500 font-medium">of {formatCurrency(goal.targetAmount)}</div>
            </div>
            <div className="text-sm font-bold text-groww-green bg-groww-pale-green px-2 py-1 rounded">
              {Math.round(progress)}% complete
            </div>
          </div>

          <div className="w-full bg-gray-100 h-2 rounded-full mt-4 mb-5 overflow-hidden">
            <div
              className="bg-groww-green h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex gap-4 border-t border-gray-100 pt-4">
            <div className="flex-1">
              <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Target</p>
              <p className="text-sm font-bold text-gray-900">{goal.targetDate}</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="flex-1">
              <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Monthly</p>
              <p className="text-sm font-bold text-gray-900">{formatCurrency(goal.monthlyContribution)}</p>
            </div>
          </div>
        </section>

        {/* Progress Timeline */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Progress timeline</h3>
          <div className="relative flex justify-between items-center">
            <div className="absolute left-4 right-4 h-0.5 bg-gray-100 z-0" />
            {[0, goal.targetAmount * 0.3, goal.targetAmount * 0.5, goal.targetAmount * (2 / 3), goal.targetAmount].map((milestone, idx) => {
              const isReached = goal.currentAmount >= milestone;
              const label = milestone === 0
                ? '₹0'
                : milestone >= 100000
                  ? `₹${Number((milestone / 100000).toFixed(1))}L`
                  : `₹${Math.round(milestone / 1000)}K`;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-full border-[3px] ${isReached ? 'border-groww-green bg-white' : 'border-gray-200 bg-white'}`} />
                  <span className={`text-[10px] font-bold ${isReached ? 'text-groww-green' : 'text-gray-400'}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Add Money */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-3">Add money to goal</h3>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[500, 1000, 2000].map(amount => (
              <button
                key={amount}
                onClick={() => handleAddMoney(amount)}
                className="py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 active:border-groww-green active:text-groww-green active:bg-groww-pale-green transition-colors"
              >
                + ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">₹</span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-groww-green focus:border-groww-green outline-none font-semibold text-gray-900 text-sm"
              />
            </div>
            <button
              onClick={() => {
                if (customAmount && !isNaN(Number(customAmount))) {
                  handleAddMoney(Number(customAmount));
                  setCustomAmount('');
                }
              }}
              disabled={!customAmount}
              className="px-5 bg-groww-green text-white font-bold text-sm rounded-lg disabled:opacity-50 disabled:bg-gray-300"
            >
              Add
            </button>
          </div>
        </section>

        {/* Funding method — varies per goal */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-4">How you're funding this goal</h3>

          <div className="flex gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg ${funding.iconBg} flex items-center justify-center flex-shrink-0`}>
              {funding.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">{funding.name}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{goal.fundingType !== 'custom' && `${formatCurrency(goal.monthlyContribution)}/month · `}{funding.label}</p>
            </div>
          </div>

          <p className="text-[12px] text-gray-500 mb-4 ml-[52px]">{funding.tagline}</p>

          {funding.canExplain && (
            <button
              onClick={() => setShowExplanation(true)}
              className="w-full py-2.5 bg-gray-50 text-gray-900 font-bold rounded-lg text-sm border border-gray-200 active:bg-gray-100 transition-colors"
            >
              Understand this investment
            </button>
          )}
        </section>

      </div>

      {/* ── Explanation Bottom Sheet ── */}
      {showExplanation && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40"
          onClick={e => { if (e.target === e.currentTarget) setShowExplanation(false); }}
        >
          {/* Sheet sits above the bottom nav (80px) — has its own scroll */}
          <div
            className="bg-white w-full max-w-md rounded-t-2xl flex flex-col"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            {/* Drag handle + title — sticky inside sheet */}
            <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-gray-100">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">{explanation.title}</h2>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">What is it?</h3>
                <p className="text-sm text-gray-900 font-medium">{explanation.what}</p>
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Why might it fit your goal?</h3>
                <p className="text-sm text-gray-900 font-medium">{explanation.why}</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-lg">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Risk</h3>
                  <p className={`text-sm font-bold flex items-center gap-1 ${explanation.riskColor}`}>
                    <AlertTriangle size={14} /> {explanation.risk}
                  </p>
                </div>
                <div className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-lg">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Fee</h3>
                  <p className="text-gray-900 font-bold text-sm">{explanation.fee}</p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg">
                <h3 className="text-[11px] font-bold text-orange-600 uppercase tracking-wide mb-1">What could go wrong?</h3>
                <p className="text-sm text-gray-900 font-medium">{explanation.wrong}</p>
              </div>
            </div>

            {/* CTA — always visible, never overlapped */}
            <div className="flex-shrink-0 px-5 pt-3 pb-6 border-t border-gray-100 bg-white">
              <button
                onClick={() => setShowExplanation(false)}
                className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-sm active:bg-black transition-colors"
              >
                I understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
