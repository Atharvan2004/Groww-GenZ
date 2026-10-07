import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import GoalDetail from './pages/GoalDetail';
import GoalsPage from './pages/GoalsPage';
import ProfilePage from './pages/ProfilePage';
import RiskCheckPage from './pages/RiskCheckPage';
import UpiPage from './pages/UpiPage';
import FnOPage from './pages/FnOPage';
import AtomDetailPage from './pages/AtomDetailPage';
import RealityCheckPage from './pages/RealityCheckPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-shell pb-20 min-h-screen bg-gray-50 flex flex-col max-w-md w-full mx-auto shadow-xl relative overflow-hidden bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/goal/:id" element={<GoalDetail />} />
            <Route path="/explore" element={<Navigate to="/" replace />} />
            <Route path="/reality-check" element={<RealityCheckPage />} />
            <Route path="/risk-check" element={<RiskCheckPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/upi" element={<UpiPage />} />
            <Route path="/fno" element={<FnOPage />} />
            <Route path="/mf" element={<div className="p-6 mt-20 text-center text-gray-500 font-bold">Mutual Funds (Coming Soon)</div>} />
            <Route path="/atom" element={<AtomDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
