import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "PASTE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_ANON_KEY_HERE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY"
);

const { data: { user } } = await supabase.auth.getUser();

if (user) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: salon } = await supabase
    .from("salons")
    .select("*")
    .eq("id", profile.salon_id)
    .single();

  if (salon.white_label) {
    document.title = salon.name;
    document.documentElement.style.setProperty("--gold", salon.brand_color);
  }
}
