import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Check } from 'lucide-react';

type RealityCheckState = { claim?: string; manual?: boolean };

export default function RealityCheckPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as RealityCheckState;
  const [claim, setClaim] = useState(state.claim ?? '');
  const [showDetails, setShowDetails] = useState(Boolean(state.claim && !state.manual));

  return (
    <div className="flex-1 overflow-y-auto bg-white pb-24">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} aria-label="Go back" className="rounded-full p-1 hover:bg-gray-100"><ArrowLeft size={22} /></button>
        <h1 className="text-lg font-bold text-gray-900">Reality Check</h1>
      </header>

      <div className="space-y-5 px-4 py-5">
        {state.manual && !showDetails && <section>
          <label htmlFor="investment-claim" className="mb-2 block text-sm font-semibold text-gray-900">Paste an investment claim</label>
          <textarea id="investment-claim" value={claim} onChange={event => setClaim(event.target.value)} placeholder="Everyone is buying XYZ because it will double." className="min-h-28 w-full resize-y rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-900 outline-none focus:border-groww-blue" />
          <button disabled={!claim.trim()} onClick={() => setShowDetails(true)} className="mt-3 w-full rounded-lg bg-groww-green py-3 text-sm font-semibold text-white disabled:bg-gray-300">Check this claim</button>
        </section>}

        {showDetails && <>
          <section>
            <h2 className="mb-2 text-xs font-bold uppercase text-gray-500">What people are saying</h2>
            <p className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm font-medium leading-6 text-gray-900">“{claim}”</p>
            <p className="mt-2 text-xs text-gray-500">A social-media claim is a starting point for research, not evidence of a future outcome.</p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-500">What the numbers say</h2>
            <div className="divide-y divide-gray-100 border-y border-gray-100">
              {[
                ['Recent performance', '+8.4% over 1 year · -6.2% over 3 months'],
                ['Revenue trend', '+11% year over year in the latest reported period'],
                ['Earnings trend', 'Profit growth has varied across recent quarters'],
                ['Valuation context', 'Demo P/E of 38x; compare with peers and growth expectations'],
              ].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 py-3">
                <span className="text-xs text-gray-500">{label}</span><span className="max-w-[62%] text-right text-xs font-semibold text-gray-900">{value}</span>
              </div>)}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-500">Things to consider</h2>
            <ul className="space-y-3">
              {[
                'A price target or promise does not explain the assumptions behind it.',
                'Short-term prices can move sharply, and a single period may not reflect long-term business performance.',
                'Consider valuation, competition, debt, and whether the investment fits your time horizon and risk tolerance.',
                'Past performance does not guarantee future returns. Outcomes remain uncertain.',
              ].map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-gray-700"><AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" /><span>{item}</span></li>)}
            </ul>
          </section>

          <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500"><Check size={15} className="text-groww-green" /> Fictional demo data for this prototype</div>
          {state.manual && <button onClick={() => { setClaim(''); setShowDetails(false); }} className="w-full rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-700">Check another claim</button>}
        </>}
      </div>
    </div>
  );
}