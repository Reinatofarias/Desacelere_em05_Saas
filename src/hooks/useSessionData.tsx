
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface SessionData {
  date: string;
  sessions: number;
  sessionTimes: string[];
}

export const useSessionData = () => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [todaySessions, setTodaySessions] = useState(0);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('desacelene-sessions');
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      // Migrar dados antigos se necessário
      const migratedSessions = parsedSessions.map((session: any) => ({
        ...session,
        sessionTimes: session.sessionTimes || []
      }));
      setSessions(migratedSessions);
    }

    const today = new Date().toISOString().split('T')[0];
    const todayData = JSON.parse(savedSessions || '[]').find((s: SessionData) => s.date === today);
    setTodaySessions(todayData?.sessions || 0);
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('desacelene-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleTimerComplete = () => {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setSessions(prev => {
      const existingIndex = prev.findIndex(s => s.date === today);
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].sessions += 1;
        updated[existingIndex].sessionTimes.push(currentTime);
        return updated;
      } else {
        return [...prev, { 
          date: today, 
          sessions: 1, 
          sessionTimes: [currentTime] 
        }];
      }
    });

    setTodaySessions(prev => prev + 1);

    toast({
      title: "Parabéns! 🌸",
      description: `Você completou mais uma sessão de descanso às ${currentTime}!`,
      duration: 3000,
    });
  };

  return {
    sessions,
    todaySessions,
    handleTimerComplete
  };
};
