import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Goal } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { Plus, X } from 'lucide-react';

const GOAL_SUGGESTIONS = [
  { name: 'Emergency Fund', icon: '🛡️', fundingType: 'savings' as const },
  { name: 'New Car', icon: '🚗', fundingType: 'equity' as const },
  { name: 'Travel', icon: '✈️', fundingType: 'savings' as const },
  { name: 'Education', icon: '🎓', fundingType: 'equity' as const },
  { name: 'Wealth Building', icon: '📈', fundingType: 'equity' as const },
];

const DEFAULT_ICONS: Record<string, string> = {
  'Emergency Fund': '🛡️',
  'New Car': '🚗',
  'Travel': '✈️',
  'Education': '🎓',
  'Wealth Building': '📈',
};

export default function GoalsPage() {
  const { goals, addGoal } = useAppContext();
  const navigate = useNavigate();

  const [showSheet, setShowSheet] = useState(false);
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    monthlyContribution: '',
    icon: '🎯',
    fundingType: 'savings' as Goal['fundingType'],
  });

  const handleSuggestion = (s: typeof GOAL_SUGGESTIONS[0]) => {
    setForm(f => ({ ...f, name: s.name, icon: s.icon, fundingType: s.fundingType }));
  };

  const handleCreate = () => {
    if (!form.name || !form.targetAmount) return;
    addGoal({
      name: form.name,
      currentAmount: 0,
      targetAmount: Number(form.targetAmount),
      targetDate: form.targetDate || 'TBD',
      monthlyContribution: Number(form.monthlyContribution) || 0,
      icon: DEFAULT_ICONS[form.name] ?? form.icon,
      fundingType: form.fundingType,
    });
    setShowSheet(false);
    setForm({ name: '', targetAmount: '', targetDate: '', monthlyContribution: '', icon: '🎯', fundingType: 'savings' });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-24">
      <header className="px-4 py-3 bg-white sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">My Goals</h1>
        <button
          onClick={() => setShowSheet(true)}
          className="text-groww-blue font-semibold text-sm flex items-center gap-1"
        >
          <Plus size={16} /> Add
        </button>
      </header>

      <div className="p-4 space-y-3">
        {goals.map(goal => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div
              key={goal.id}
              onClick={() => navigate(`/goal/${goal.id}`)}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm active:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">
                    {goal.icon ?? '🎯'}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm">{goal.name}</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Target: {goal.targetDate} · {formatCurrency(goal.monthlyContribution)}/mo
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mb-1.5">
                <div className="text-sm font-bold text-gray-900">
                  {formatCurrency(goal.currentAmount)}
                  <span className="text-[11px] text-gray-500 font-medium ml-1">/ {formatCurrency(goal.targetAmount)}</span>
                </div>
                <span className="text-[11px] font-bold text-groww-green">{Math.round(progress)}%</span>
              </div>

              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-groww-green h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Add Goal Bottom Sheet ── */}
      {showSheet && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40"
          onClick={e => { if (e.target === e.currentTarget) setShowSheet(false); }}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-2xl flex flex-col"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            {/* Header */}
            <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-gray-100">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Create a new goal</h2>
                <button
                  onClick={() => setShowSheet(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Scrollable form */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

              {/* Quick suggestions */}
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">Quick suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {GOAL_SUGGESTIONS.map(s => (
                    <button
                      key={s.name}
                      onClick={() => handleSuggestion(s)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                        form.name === s.name
                          ? 'border-groww-green bg-groww-pale-green text-groww-green'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {s.icon} {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal name */}
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Goal name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Car, Europe Trip…"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:ring-1 focus:ring-groww-green focus:border-groww-green outline-none"
                />
              </div>

              {/* Target amount */}
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Target amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-gray-500">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.targetAmount}
                    onChange={e => setForm(f => ({ ...f, targetAmount: e.target.value }))}
                    className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:ring-1 focus:ring-groww-green focus:border-groww-green outline-none"
                  />
                </div>
              </div>

              {/* Target date */}
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Target date
                </label>
                <input
                  type="month"
                  value={form.targetDate}
                  onChange={e => setForm(f => ({ ...f, targetDate: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:ring-1 focus:ring-groww-green focus:border-groww-green outline-none"
                />
              </div>

              {/* Monthly contribution */}
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Monthly contribution
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-gray-500">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.monthlyContribution}
                    onChange={e => setForm(f => ({ ...f, monthlyContribution: e.target.value }))}
                    className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:ring-1 focus:ring-groww-green focus:border-groww-green outline-none"
                  />
                </div>
              </div>

            </div>

            {/* CTA row — always visible */}
            <div className="flex-shrink-0 px-5 pt-3 pb-6 border-t border-gray-100 bg-white flex gap-3">
              <button
                onClick={() => setShowSheet(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!form.name || !form.targetAmount}
                className="flex-1 py-3 bg-groww-green text-white font-bold rounded-xl text-sm disabled:opacity-50 disabled:bg-gray-300 active:bg-green-600"
              >
                Create goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
