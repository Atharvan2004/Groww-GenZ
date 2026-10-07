import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Shield, Bell, HelpCircle, ChevronRight, Activity } from 'lucide-react';

export default function ProfilePage() {
  const { user, riskCheckPassed } = useAppContext();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Activity, label: 'Risk Profile', subLabel: 'Moderate', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-24">
      <header className="px-4 py-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <div className="w-12 h-12 bg-groww-pale-blue rounded-full flex items-center justify-center text-groww-blue overflow-hidden border border-gray-200">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Atharvan&backgroundColor=E5F4FD" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">{user.name}</h1>
          <p className="text-xs text-gray-500 font-medium">Account Details & Settings</p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        
        {/* F&O Mock Trigger */}
        <div 
          onClick={() => navigate('/risk-check')}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex justify-between items-center cursor-pointer active:bg-gray-50 transition-colors"
        >
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-0.5">Futures & Options</h3>
            <p className="text-[11px] text-gray-500">Access high-risk trading products</p>
          </div>
          <div className="flex items-center gap-2">
            {riskCheckPassed && <span className="text-[10px] font-bold text-groww-green bg-groww-pale-green px-1.5 py-0.5 rounded">Unlocked</span>}
            <ChevronRight className="text-gray-400" size={18} />
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {menuItems.map((item, idx) => (
            <div 
              key={idx}
              className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                idx !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-gray-500" />
                <span className="font-bold text-sm text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.subLabel && <span className="text-[11px] text-gray-400 font-bold">{item.subLabel}</span>}
                <ChevronRight className="text-gray-300" size={18} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-2">
          <button className="text-red-500 font-bold text-sm active:text-red-600">Log out</button>
        </div>

      </div>
    </div>
  );
}
