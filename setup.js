#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏠 RealPeep Setup');
console.log('================\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
} else {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# Supabase Configuration
# Get these values from your Supabase project settings > API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
  console.log('⚠️  Please update the Supabase values in .env.local');
}

console.log('\n📋 Next Steps:');
console.log('1. Set up your Supabase project at https://supabase.com');
console.log('2. Run the SQL schema from README.md in your Supabase SQL editor');
console.log('3. Update .env.local with your Supabase URL and anon key');
console.log('4. Run: npm run dev');
console.log('\n🚀 Happy coding!');
