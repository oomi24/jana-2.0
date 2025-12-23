
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://zqarslebhqqrqidlaruw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYXJzbGViaHFxcnFpZGxhcnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzUzMTUsImV4cCI6MjA2ODg1MTMxNX0.MpGkiCmNgicHca5_q_4SL6hkSpavtyaVA8qYaX6FbIU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    if (error) console.warn('Supabase Sync Status:', error.message);
  } catch (err) {
    console.error('Supabase connection failed');
  }
};
