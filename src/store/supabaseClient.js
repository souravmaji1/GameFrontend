import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xszetzwwyqngrixmbtbt.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzemV0end3eXFuZ3JpeG1idGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNTMxNTUsImV4cCI6MjAzMTkyOTE1NX0.n96WvjZ3xE3OiAPJUVU5MWBgxtGTxqfCgJQl1vLu5p8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;