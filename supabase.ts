
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Estas variables se configurarían en el panel de Vercel
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Función para sincronizar el progreso de Jana con Supabase
 */
export const syncProgress = async (userId: string, progress: any) => {
  if (!supabase) return;
  
  const { error } = await supabase
    .from('user_profiles')
    .upsert({ 
      id: userId, 
      progress_data: progress,
      last_updated: new Date().toISOString()
    });

  if (error) console.error('Error syncing with Supabase:', error);
};
