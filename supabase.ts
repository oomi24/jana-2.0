
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Credenciales proporcionadas por el usuario
const supabaseUrl = 'https://cnkmpoahyuoqoxhchiys.supabase.co';
const supabaseAnonKey = 'sb_publishable_rzXSRWXKdviens7moegqHw_uJ3pBPEb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Función para sincronizar el progreso de Jana con Supabase.
 * Almacena el objeto de progreso completo en la tabla 'user_profiles'.
 */
export const syncProgress = async (userId: string, progress: any) => {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from('user_profiles')
      .upsert({ 
        id: userId, 
        progress_data: progress,
        last_updated: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      console.warn('Error sincronizando con Supabase (posiblemente falta tabla):', error.message);
    }
  } catch (err) {
    console.error('Fallo crítico en sincronización:', err);
  }
};
