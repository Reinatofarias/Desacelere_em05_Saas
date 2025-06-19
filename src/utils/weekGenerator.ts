
import { SessionData } from '@/hooks/useSessionData';

export interface WeeklySession {
  day: string;
  date: string;
  sessions: number;
  completed: boolean;
  sessionTimes: string[];
}

export const generateWeekData = (sessions: SessionData[]): WeeklySession[] => {
  const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
  const today = new Date();
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  startOfWeek.setDate(diff);

  return days.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const dateString = date.toISOString().split('T')[0];
    const sessionData = sessions.find(s => s.date === dateString);
    
    return {
      day,
      date: date.getDate().toString(),
      sessions: sessionData?.sessions || 0,
      completed: (sessionData?.sessions || 0) > 0,
      sessionTimes: sessionData?.sessionTimes || []
    };
  });
};
