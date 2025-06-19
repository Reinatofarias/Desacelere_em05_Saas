
import { SessionData } from '@/hooks/useSessionData';

export interface StatsData {
  totalSessions: number;
  weekStreak: number;
  todaySessions: number;
  totalMinutes: number;
}

export const calculateStats = (sessions: SessionData[], todaySessions: number): StatsData => {
  const totalSessions = sessions.reduce((sum, s) => sum + s.sessions, 0);
  const totalMinutes = totalSessions * 5;
  
  // Calcular sequência atual
  const today = new Date();
  let streak = 0;
  for (let i = 0; i >= -30; i--) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    const dateString = checkDate.toISOString().split('T')[0];
    const dayData = sessions.find(s => s.date === dateString);
    
    if (dayData && dayData.sessions > 0) {
      if (i <= 0) streak++;
    } else if (i < 0) {
      break;
    }
  }

  return { totalSessions, weekStreak: streak, todaySessions, totalMinutes };
};
