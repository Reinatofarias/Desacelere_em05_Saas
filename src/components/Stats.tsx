
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Target, Clock, Heart } from 'lucide-react';

interface StatsProps {
  totalSessions: number;
  weekStreak: number;
  todaySessions: number;
  totalMinutes: number;
}

const Stats = ({ totalSessions, weekStreak, todaySessions, totalMinutes }: StatsProps) => {
  const stats = [
    {
      icon: Trophy,
      label: 'Sessões Totais',
      value: totalSessions,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    {
      icon: Target,
      label: 'Sequência',
      value: `${weekStreak} dias`,
      color: 'text-pink-500',
      bg: 'bg-pink-50'
    },
    {
      icon: Clock,
      label: 'Hoje',
      value: todaySessions,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      icon: Heart,
      label: 'Total Minutos',
      value: totalMinutes,
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 glass-effect border border-pink-200 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="text-center space-y-2">
            <div className={`inline-flex p-3 rounded-full ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-rose-800">{stat.value}</div>
            <div className="text-sm text-pink-600 font-medium">{stat.label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Stats;
