
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import WeeklyView from './WeeklyView';
import Stats from './Stats';
import Header from './Header';
import { toast } from '@/hooks/use-toast';

interface SessionData {
  date: string;
  sessions: number;
  sessionTimes: string[]; // Array de horários
}

const DesacelereApp = () => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [todaySessions, setTodaySessions] = useState(0);

  // Gerar dados da semana atual
  const generateWeekData = () => {
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

  const weekData = generateWeekData();

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

  const calculateStats = () => {
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

  const stats = calculateStats();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4 space-y-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-rose-800 mb-2">
              Desacelere em 05 💖
            </h1>
            <p className="text-pink-600 text-lg">
              O Guia da Mãe Conectada para momentos de autocuidado
            </p>
          </div>

          {/* Layout responsivo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timer - ocupa mais espaço */}
            <div className="lg:col-span-2">
              <Timer onComplete={handleTimerComplete} />
            </div>

            {/* Stats na lateral */}
            <div className="space-y-6">
              <Stats {...stats} />
              
              {/* Mensagem motivacional */}
              <div className="glass-effect border border-pink-200 rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">🌸</div>
                <p className="text-pink-700 font-medium">
                  "Pausar não é perder tempo, é investir em você mesma."
                </p>
              </div>
            </div>
          </div>

          {/* Visualização semanal */}
          <div className="mt-8">
            <WeeklyView sessions={weekData} />
          </div>

          {/* Dicas de autocuidado */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Respire Profundo",
                description: "Use estes 5 minutos para focar na sua respiração e relaxar.",
                icon: "🌬️"
              },
              {
                title: "Gratidão",
                description: "Pense em 3 coisas pelas quais você é grata hoje.",
                icon: "🙏"
              },
              {
                title: "Alongue-se",
                description: "Movimente o corpo suavemente e alivie as tensões.",
                icon: "🤸‍♀️"
              }
            ].map((tip, index) => (
              <div key={index} className="glass-effect border border-pink-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-bold text-rose-800 mb-2">{tip.title}</h3>
                <p className="text-pink-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesacelereApp;
