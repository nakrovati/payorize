import type { Database } from "~/types/supabase";

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client) return;

  const client = useSupabaseClient<Database>();

  try {
    const { data, error } = await client
      .from("groups")
      .select("id")
      .eq("id", to.params.id)
      .single();
    if (!data || error) throw error;
  } catch {
    return abortNavigation();
  }
});
