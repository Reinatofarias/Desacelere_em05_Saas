import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export interface Timer {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  status: 'running' | 'paused' | 'completed';
  created_at: string;
  updated_at: string;
}

export const useTimers = () => {
  const { user } = useAuth();
  const [timers, setTimers] = useState<Timer[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's timers
  const fetchTimers = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('timers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar timers",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTimers((data || []) as Timer[]);
    }
    setLoading(false);
  };

  // Create new timer
  const createTimer = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('timers')
      .insert({
        user_id: user.id,
        status: 'running'
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Erro ao criar timer",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    setTimers(prev => [data as Timer, ...prev]);
    return data;
  };

  // Update timer
  const updateTimer = async (id: string, updates: Partial<Timer>) => {
    const { data, error } = await supabase
      .from('timers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Erro ao atualizar timer",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    setTimers(prev => prev.map(timer => 
      timer.id === id ? data as Timer : timer
    ));
    return data;
  };

  // Complete timer
  const completeTimer = async (id: string) => {
    return updateTimer(id, {
      status: 'completed',
      end_time: new Date().toISOString()
    });
  };

  // Load timers when user changes
  useEffect(() => {
    fetchTimers();
  }, [user]);

  return {
    timers,
    loading,
    createTimer,
    updateTimer,
    completeTimer,
    fetchTimers
  };
};