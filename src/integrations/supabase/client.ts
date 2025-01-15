import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://gpcdgubcprzsvmofspss.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2RndWJjcHJ6c3Ztb2ZzcHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MjAzODMsImV4cCI6MjA1MjA5NjM4M30.nY2PhPSTB_GIdPpSc8Lu6ptR4CsXYegBgLfXrMe4-4M';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'apikey': supabaseAnonKey
    }
  },
  db: {
    schema: 'public'
  }
});