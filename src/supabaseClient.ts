import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://osvqqalyhrzfayevtsmz.supabase.co'; // Замени на URL из Dashboard
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zdnFxYWx5aHJ6ZmF5ZXZ0c216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODUwNDcsImV4cCI6MjA2ODE2MTA0N30.THxTj8HRvaKVgHYi_4vbrL3qiRWR559DLUv4EHWuL_o'; // Замени на Anon Key из Dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);