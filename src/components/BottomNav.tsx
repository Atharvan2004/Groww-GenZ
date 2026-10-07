import { LineChart, Activity, PieChart, Banknote } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const navItems = [
    { name: 'Stocks', path: '/', icon: LineChart },
    { name: 'F&O', path: '/fno', icon: Activity },
    { name: 'Mutual Funds', path: '/mf', icon: PieChart },
    { name: 'UPI', path: '/upi', icon: Banknote },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2.5 flex justify-between items-center z-50 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-groww-blue' : 'text-gray-400 hover:text-gray-600'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
