
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TimerProps {
  onComplete: () => void;
}

const Timer = ({ onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutos em segundos
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            onComplete();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (isCompleted) {
      setIsCompleted(false);
    }
  };

  const resetTimer = () => {
    setTimeLeft(5 * 60);
    setIsActive(false);
    setIsCompleted(false);
  };

  return (
    <Card className="p-8 glass-effect border-2 border-pink-200 shadow-xl">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Clock className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-bold text-rose-800">Desacelere em 05</h2>
        </div>

        {/* Círculo de progresso */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgb(251, 207, 232)"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgb(244, 114, 182)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-800">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-sm text-pink-600 mt-1">
                {isCompleted ? 'Concluído!' : isActive ? 'Pausando...' : 'Pronto para começar'}
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={toggleTimer}
            size="lg"
            className={`px-8 py-3 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
                : 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isActive ? 'Pausar' : isCompleted ? 'Reiniciar' : 'Começar'}
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            size="lg"
            className="px-6 py-3 rounded-full border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {isCompleted && (
          <div className="animate-pulse-soft">
            <p className="text-pink-600 font-semibold">
              ✨ Parabéns! Você completou sua pausa de 5 minutos ✨
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Timer;
