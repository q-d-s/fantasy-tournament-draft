import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://gpcdgubcprzsvmofspss.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2RndWJjcHJ6c3Ztb2ZzcHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDAsImV4cCI6MjAyNTQwOTYwMH0.Dq7Tk_tFCuqvQQWuRvuXzCBQFIBkBFGKVwuyLG0AWjk';

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
  }
});