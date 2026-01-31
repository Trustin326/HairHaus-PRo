import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://fjjedjoakplopglfkjsn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqamVkam9ha3Bsb3BnbGZranNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MTQzNjAsImV4cCI6MjA4NTI5MDM2MH0.svOkXz6Y3ZSLd75q11N83Zaj6ClUV9ZVHvSkI9JKzYc";

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
