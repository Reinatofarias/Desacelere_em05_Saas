
import React from 'react';
import { Heart, Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const AppHeader = () => {
  const { signOut, user } = useAuth();

  return (
    <header className="text-center mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg animate-pulse-soft">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <Clock className="w-10 h-10 text-pink-500" />
        </div>
        <div className="flex-1 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-800 tracking-tight">
          Desacelere
        </h1>
        <p className="text-lg text-pink-600 font-medium">
          Pausas conscientes para uma vida mais equilibrada
        </p>
        {user?.email && (
          <p className="text-sm text-pink-500">
            Bem-vindo, {user.email}
          </p>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
