
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://zqarslebhqqrqidlaruw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYXJzbGViaHFxcnFpZGxhcnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzUzMTUsImV4cCI6MjA2ODg1MTMxNX0.MpGkiCmNgicHca5_q_4SL6hkSpavtyaVA8qYaX6FbIU';

let supabase: any = null;

try {
  if (typeof window !== 'undefined') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (e) {
  console.warn("Supabase no pudo inicializarse, trabajando en modo local.");
}

export { supabase };

export const syncProgress = async (userId: string, progress: any) => {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert({ 
        user_id: userId, 
        data: progress,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) console.log('Sincronización Supabase:', error.message);
  } catch (err) {
    // Silencioso para modo offline en APK
    console.log('Modo Offline: Sincronización omitida.');
  }
};
