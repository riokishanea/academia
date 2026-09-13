import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isServerSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    (supabaseServiceRoleKey || supabaseAnonKey) &&
    !supabaseUrl.includes("your-project")
  );
};

export const createServerSupabase = () => {
  if (!isServerSupabaseConfigured()) {
    return null;
  }
  // Prefer service role key for administrative assessment scoring and security
  const key = supabaseServiceRoleKey || supabaseAnonKey;
  return createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
