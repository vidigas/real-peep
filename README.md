# RealPeep - Real Estate Transaction Management

A modern web application for managing real estate transactions with a beautiful, intuitive interface built with Next.js 14, TypeScript, and Supabase.

## Features

- 🔐 **Authentication**: Secure email-based authentication with Supabase
- 📊 **Transaction Management**: Create, view, edit, and delete transactions
- 🏠 **Dual Transaction Types**: Support for both buyer and seller transactions
- 📋 **Multi-step Wizard**: Intuitive 4-step wizard for creating transactions
- 💰 **Commission Tracking**: Track broker splits, agent percentages, and fees
- 📈 **Status Management**: Active, Pending, and Closed transaction statuses
- 🎯 **Lead Source Tracking**: Track where leads come from
- ✅ **Checklist Management**: Add custom checklists to transactions
- 🔒 **Data Privacy**: Row-level security ensures users only see their own data

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives with custom styling
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: SWR for client-side data management
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone and Install

```bash
git clone <repository-url>
cd RealPeep
npm install
```

### 2. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Set up Database

Run the following SQL in your Supabase SQL editor:

```sql
-- Transactions table
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('buyer','seller')),
  status text not null default 'active' check (status in ('active','pending','closed')),
  client_name text,                -- "Jane Doe"
  property_address text,
  city text,
  state text,
  zip text,
  property_type text,              -- condo, house, etc.
  list_date date,
  expiration_date date,
  days_on_market int,
  list_price numeric,              -- seller flow
  buyer_budget numeric,            -- buyer flow
  broker_split_pct numeric,        -- "% to Broker"
  listing_agent_pct numeric,       -- seller flow
  buyer_agent_pct numeric,         -- buyer flow
  gci numeric,                     -- gross commission income (optional compute client-side)
  currency text default 'USD',
  lead_source text,                -- dropdown label
  lead_source_other text,          -- free text when "Other"
  details jsonb not null default '[]', -- fees [{label,type:'percent|fixed',amount,preSplit:boolean}]
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: privacy
alter table public.transactions enable row level security;

create policy "user can select own"
on public.transactions for select
using (auth.uid() = user_id);

create policy "user can insert own"
on public.transactions for insert
with check (auth.uid() = user_id);

create policy "user can update own"
on public.transactions for update
using (auth.uid() = user_id);

create policy "user can delete own"
on public.transactions for delete
using (auth.uid() = user_id);

-- Helpful updated_at trigger
create extension if not exists moddatetime;
create trigger handle_updated_at
before update on public.transactions
for each row execute procedure moddatetime(updated_at);
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Authentication

1. Visit the app - you'll be redirected to the auth page
2. Enter any email address to receive a magic link
3. Check your email and click the magic link to sign in

### Managing Transactions

1. **Add Transaction**: Click the "Add Transaction" button to open the wizard
2. **Choose Type**: Select either Buyer or Seller transaction
3. **Fill Details**: Complete the multi-step form with property/client information
4. **Set Commission**: Configure broker splits, agent percentages, and fees
5. **Review & Save**: Review your transaction and set the status

### Transaction Types

#### Seller Transactions
- Property address and details
- List price and dates
- Listing agent percentage
- Days on market calculation

#### Buyer Transactions  
- Buyer budget
- Buyer agent percentage
- Agreement start/end dates

### Features

- **Status Filtering**: Filter transactions by Active, Pending, or Closed
- **Edit Transactions**: Click the edit icon to modify any transaction
- **Delete Transactions**: Remove transactions with confirmation
- **Real-time Updates**: Changes reflect immediately across the app
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── auth/              # Authentication pages
│   ├── transactions/      # Main transactions page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── transaction-wizard.tsx
│   └── edit-transaction-wizard.tsx
├── hooks/                # Custom React hooks
│   ├── useAuth.ts
│   └── useTransactions.ts
└── lib/                  # Utilities and configuration
    ├── supabase.ts       # Supabase client
    ├── types.ts          # TypeScript types
    └── utils.ts          # Helper functions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.