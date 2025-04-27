
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nxfgbidwmdosnsfjhvek.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54ZmdiaWR3bWRvc25zZmpodmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDY1ODUsImV4cCI6MjA2MDkyMjU4NX0.84F-Jqvap3Cvkgjn1OU5KaJisAfJBw64DKCK_Ll-jkg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
