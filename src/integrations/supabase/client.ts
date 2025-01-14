import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gpcdgubcprzsvmofspss.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2RndWJjcHJ6c3Ztb2ZzcHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDAsImV4cCI6MjAyNTQwOTYwMH0.Dq7Tk_tFCuqvQQWuRvuXzCBQFIBkBFGKVwuyLG0AWjk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);