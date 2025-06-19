
import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface WeeklySession {
  day: string;
  date: string;
  sessions: number;
  completed: boolean;
  sessionTimes?: string[]; // Horários das sessões
}

interface WeeklyViewProps {
  sessions: WeeklySession[];
}

const WeeklyView = ({ sessions }: WeeklyViewProps) => {
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1; // Converter domingo (0) para índice 6

  return (
    <Card className="p-6 glass-effect border-2 border-pink-200 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-pink-500" />
        <h3 className="text-xl font-bold text-rose-800">Semana Atual</h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {sessions.map((session, index) => (
          <div
            key={session.day}
            className={`text-center p-3 rounded-lg transition-all duration-300 ${
              index === dayIndex
                ? 'bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg scale-105'
                : session.completed
                ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-700'
                : 'bg-white/60 text-gray-600'
            }`}
          >
            <div className="text-xs font-semibold mb-1">{session.day}</div>
            <div className="text-lg font-bold mb-2">{session.date}</div>
            
            {/* Indicadores visuais das sessões */}
            <div className="flex justify-center items-center mb-2">
              {session.sessions > 0 ? (
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(session.sessions, 5) }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        index === dayIndex
                          ? 'bg-white'
                          : session.completed
                          ? 'bg-pink-400'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                  {session.sessions > 5 && (
                    <span className="text-xs ml-1">+{session.sessions - 5}</span>
                  )}
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-200" />
              )}
            </div>

            {/* Lista de horários das sessões */}
            {session.sessionTimes && session.sessionTimes.length > 0 && (
              <div className="space-y-1">
                {session.sessionTimes.slice(0, 3).map((time, timeIndex) => (
                  <div
                    key={timeIndex}
                    className={`flex items-center justify-center gap-1 text-xs ${
                      index === dayIndex
                        ? 'text-white/90'
                        : 'text-pink-600'
                    }`}
                  >
                    <Clock className="w-2.5 h-2.5" />
                    <span>{time}</span>
                  </div>
                ))}
                {session.sessionTimes.length > 3 && (
                  <div className={`text-xs ${
                    index === dayIndex ? 'text-white/70' : 'text-pink-500'
                  }`}>
                    +{session.sessionTimes.length - 3} mais
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-pink-600">
        <p>Cada ponto representa uma sessão de 5 minutos 💖</p>
        <p className="text-xs mt-1">Os horários mostram quando você fez suas pausas</p>
      </div>
    </Card>
  );
};

export default WeeklyView;
