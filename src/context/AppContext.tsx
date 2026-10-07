import React, { createContext, useContext, useState } from 'react';

export type Goal = {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  monthlyContribution: number;
  icon?: string;
  fundingType: 'equity' | 'savings' | 'custom';
};

export type RoundUpTransaction = {
  id: string;
  merchant: string;
  originalAmount: number;
  roundedAmount: number;
  investedAmount: number;
  date: string;
};

interface AppState {
  user: { name: string; age: number };
  goals: Goal[];
  addMoneyToGoal: (goalId: string, amount: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  riskCheckPassed: boolean;
  setRiskCheckPassed: (passed: boolean) => void;

  // Atom / Round-Ups State
  roundUpsEnabled: boolean;
  toggleRoundUps: () => void;
  roundUpMultiplier: number;
  setRoundUpMultiplier: (multiplier: number) => void;
  roundUpTransactions: RoundUpTransaction[];
  addSimulatedTransaction: () => void;
  totalSaved: number;
  monthlySaved: number;
}

const defaultGoals: Goal[] = [
  {
    id: '1',
    name: 'First Car',
    currentAmount: 45000,
    targetAmount: 150000,
    targetDate: 'June 2029',
    monthlyContribution: 2000,
    icon: '🚗',
    fundingType: 'equity',
  },
  {
    id: '2',
    name: 'Emergency Fund',
    currentAmount: 32000,
    targetAmount: 50000,
    targetDate: 'Dec 2027',
    monthlyContribution: 3000,
    icon: '🛡️',
    fundingType: 'savings',
  },
  {
    id: '3',
    name: 'Goa Trip',
    currentAmount: 14000,
    targetAmount: 30000,
    targetDate: 'Jan 2027',
    monthlyContribution: 500,
    icon: '🌴',
    fundingType: 'savings',
  },
];

const defaultTransactions: RoundUpTransaction[] = [
  { id: 't1', merchant: 'Swiggy', originalAmount: 347, roundedAmount: 350, investedAmount: 3, date: 'Today' },
  { id: 't2', merchant: 'Uber', originalAmount: 182, roundedAmount: 190, investedAmount: 8, date: 'Today' },
  { id: 't3', merchant: 'Zepto', originalAmount: 276, roundedAmount: 280, investedAmount: 4, date: 'Today' },
  { id: 't4', merchant: 'Netflix', originalAmount: 199, roundedAmount: 200, investedAmount: 1, date: 'Yesterday' },
];

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [riskCheckPassed, setRiskCheckPassed] = useState(false);

  // Atom State
  const [roundUpsEnabled, setRoundUpsEnabled] = useState(true);
  const [roundUpMultiplier, setRoundUpMultiplier] = useState(1);
  const [roundUpTransactions, setRoundUpTransactions] = useState<RoundUpTransaction[]>(defaultTransactions);
  const [totalSaved, setTotalSaved] = useState(18100);
  const [monthlySaved, setMonthlySaved] = useState(684);

  const toggleRoundUps = () => setRoundUpsEnabled(v => !v);

  const addSimulatedTransaction = () => {
    if (!roundUpsEnabled) return;
    const merchants = ['Zomato', 'Amazon', 'Blinkit', 'BookMyShow', 'Ola'];
    const randomMerchant = merchants[Math.floor(Math.random() * merchants.length)];
    const originalAmount = Math.floor(Math.random() * 400) + 50;
    const roundedAmount = Math.ceil(originalAmount / 10) * 10;
    const finalRoundedAmount = roundedAmount === originalAmount ? roundedAmount + 10 : roundedAmount;
    const baseSaved = finalRoundedAmount - originalAmount;
    const investedAmount = baseSaved * roundUpMultiplier;

    const newTx: RoundUpTransaction = {
      id: `t${Date.now()}`,
      merchant: randomMerchant,
      originalAmount,
      roundedAmount: finalRoundedAmount,
      investedAmount,
      date: 'Today',
    };

    setRoundUpTransactions(prev => [newTx, ...prev]);
    setTotalSaved(prev => prev + investedAmount);
    setMonthlySaved(prev => prev + investedAmount);
  };

  const addMoneyToGoal = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = { ...goal, id: `goal_${Date.now()}` };
    setGoals(prev => [...prev, newGoal]);
  };

  return (
    <AppContext.Provider value={{
      user: { name: 'Atharvan', age: 23 },
      goals,
      addMoneyToGoal,
      addGoal,
      riskCheckPassed,
      setRiskCheckPassed,
      roundUpsEnabled,
      toggleRoundUps,
      roundUpMultiplier,
      setRoundUpMultiplier,
      roundUpTransactions,
      addSimulatedTransaction,
      totalSaved,
      monthlySaved,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
