const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.DB_URL_FIRST;
const supabaseAnonKey = process.env.DB_ANON_KEY_FIRST;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
