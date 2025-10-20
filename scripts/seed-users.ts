// scripts/seed-users.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // load Next.js envs for this script

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE;

// Basic validation so we fail loudly with context
if (!url) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
if (!serviceKey) throw new Error('Missing SUPABASE_SERVICE_ROLE in .env.local');

// Admin client — DO NOT expose service key to the browser.
const admin = createClient(url, serviceKey);

async function main() {
  const users = [
    { email: 'fernando@example.com', password: 'Password123!' },
    { email: 'antonio@example.com',  password: 'Password123!' },
  ];

  for (const u of users) {
    const { data, error } = await admin.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true, // auto-confirm for dev
    });

    if (error) {
      console.error(`Failed to create ${u.email}:`, error.message);
    } else {
      console.log(`Created ${u.email}:`, data.user?.id);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
