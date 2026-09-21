import { useState } from 'react';
import SalaryAdvice from '../advice-parts/SalaryAdvice';       // ← 'advice-parts'
import ExpenseAdvice from '../advice-parts/ExpenseAdvice';     // ← 'advice-parts'

const Advice = () => {
  const [activeTab, setActiveTab] = useState('salary');

  return (
    <div className="space-y-6 text-zinc-100 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-800 border border-zinc-700/60 rounded-xl text-zinc-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Advice
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm font-medium mt-0.5">
              Generate bank transfer advice for employee salary or company expenses
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl shadow-lg inline-flex">
        <button
          onClick={() => setActiveTab('salary')}
          className={`px-5 md:px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'salary'
              ? 'bg-zinc-100 text-zinc-900 shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>👥</span>
          <span>Employee Salary</span>
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`px-5 md:px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'expense'
              ? 'bg-zinc-100 text-zinc-900 shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>🧾</span>
          <span>Company Expense</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'salary' && <SalaryAdvice />}
      {activeTab === 'expense' && <ExpenseAdvice />}
    </div>
  );
};

export default Advice;