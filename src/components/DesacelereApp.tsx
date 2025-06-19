
import React from 'react';
import Timer from './Timer';
import WeeklyView from './WeeklyView';
import Stats from './Stats';
import Header from './Header';
import AppHeader from './AppHeader';
import MotivationalMessage from './MotivationalMessage';
import MotivationalTips from './MotivationalTips';
import { useSessionData } from '@/hooks/useSessionData';
import { generateWeekData } from '@/utils/weekGenerator';
import { calculateStats } from '@/utils/statsCalculator';

const DesacelereApp = () => {
  const { sessions, todaySessions, handleTimerComplete } = useSessionData();
  
  const weekData = generateWeekData(sessions);
  const stats = calculateStats(sessions, todaySessions);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4 space-y-8">
        <div className="max-w-6xl mx-auto">
          <AppHeader />

          {/* Layout responsivo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timer - ocupa mais espaço */}
            <div className="lg:col-span-2">
              <Timer onComplete={handleTimerComplete} />
            </div>

            {/* Stats na lateral */}
            <div className="space-y-6">
              <Stats {...stats} />
              <MotivationalMessage />
            </div>
          </div>

          {/* Visualização semanal */}
          <div className="mt-8">
            <WeeklyView sessions={weekData} />
          </div>

          <MotivationalTips />
        </div>
      </div>
    </div>
  );
};

export default DesacelereApp;
