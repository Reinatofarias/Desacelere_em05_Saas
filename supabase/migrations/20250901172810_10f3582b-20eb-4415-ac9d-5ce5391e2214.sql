-- Create timers table for tracking user timer sessions
CREATE TABLE public.timers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('running', 'paused', 'completed')) DEFAULT 'running',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.timers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for timers table
CREATE POLICY "Users can view their own timers" 
ON public.timers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own timers" 
ON public.timers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own timers" 
ON public.timers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own timers" 
ON public.timers 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps automatically
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_timers_updated_at
    BEFORE UPDATE ON public.timers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();