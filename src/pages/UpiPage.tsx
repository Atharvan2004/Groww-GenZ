import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { Search, QrCode, Scan, UserCheck, Wallet, Landmark, RefreshCw, RefreshCcw, EyeOff, Target, Zap } from 'lucide-react';

export default function UpiPage() {
  const { totalSaved } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-24">
      {/* Header */}
      <header className="px-4 py-3 bg-white sticky top-0 z-20 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-groww-blue flex items-center justify-center text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">UPI</span>
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

      <div className="p-4 space-y-6">
        
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center gap-2 cursor-pointer active:opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Zap size={24} />
            </div>
            <span className="text-[11px] text-center font-semibold text-gray-800 leading-tight">Activate UPI<br/>Lite</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer active:opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-groww-pale-green text-groww-green flex items-center justify-center">
              <Scan size={24} />
            </div>
            <span className="text-[11px] text-center font-semibold text-gray-800 leading-tight">Scan QR<br/>code</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer active:opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center">
              <UserCheck size={24} />
            </div>
            <span className="text-[11px] text-center font-semibold text-gray-800 leading-tight">Pay<br/>anyone</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer active:opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-groww-pale-green text-groww-green flex items-center justify-center">
              <Wallet size={24} />
            </div>
            <span className="text-[11px] text-center font-semibold text-gray-800 leading-tight">Check<br/>balance</span>
          </div>
        </div>

        {/* Atom Card / Round-Ups */}
        <section>
          <div 
            onClick={() => navigate('/atom')}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm active:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-lg">Groww Spare</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-groww-green to-yellow-400 flex items-center justify-center shadow-inner">
                <Target size={16} className="text-white" />
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-3xl font-bold text-gray-900 tracking-tight">
                {formatCurrency(totalSaved)}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-3">
              <div className="w-1.5 h-1.5 bg-groww-green rounded-full"></div>
              <span className="text-xs font-bold text-groww-green">Saved from your everyday UPI spends</span>
            </div>
          </div>
        </section>

        {/* UPI Requests */}
        <section>
          <div className="mb-3">
            <h2 className="text-base font-bold text-gray-900">UPI Requests</h2>
            <p className="text-[11px] text-gray-500">UPI ID: 8********7@groww</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <EyeOff size={32} className="text-gray-300" />
            </div>
            <span className="text-sm font-semibold text-gray-700">No pending IPO/UPI requests</span>
          </div>
        </section>

        {/* UPI Options */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">UPI Options</h2>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-gray-100 cursor-pointer active:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Landmark size={20} className="text-gray-600" />
              </div>
              <span className="font-bold text-sm text-gray-800">Bank transfer</span>
            </div>
            <div className="flex items-center gap-4 p-4 border-b border-gray-100 cursor-pointer active:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <RefreshCw size={20} className="text-gray-600" />
              </div>
              <span className="font-bold text-sm text-gray-800">Self transfer</span>
            </div>
            <div className="flex items-center gap-4 p-4 cursor-pointer active:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <RefreshCcw size={20} className="text-gray-600" />
              </div>
              <span className="font-bold text-sm text-gray-800">UPI autopay</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
