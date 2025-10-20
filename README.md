# RealPeep - Real Estate Transaction Management Platform

A modern, full-stack web application for managing real estate transactions with a beautiful, intuitive interface.

![RealPeep Logo](public/realpeep-logo.svg)

## 🎯 Project Overview

RealPeep is a comprehensive real estate transaction management platform that allows agents to:
- Create and manage buyer/seller transactions
- Track commissions, fees, and lead sources
- Monitor transaction statuses (Active, Pending, Closed)
- Maintain data privacy with row-level security
- Access a responsive, mobile-friendly interface

## ✨ Key Features

### 🔐 Authentication & Security
- **Email-based Authentication**: Secure magic link authentication via Supabase
- **Row-Level Security (RLS)**: Users can only access their own transaction data
- **Data Privacy**: Complete isolation between user accounts
- **Session Management**: Persistent login sessions

### 📊 Transaction Management
- **Dual Transaction Types**: Support for both buyer and seller transactions
- **Multi-step Wizard**: Intuitive 4-step form for creating/editing transactions
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Status Management**: Active, Pending, and Closed transaction statuses
- **Real-time Updates**: Changes reflect immediately using SWR

### 💰 Financial Tracking
- **Commission Management**: Track broker splits and agent percentages
- **Fee Tracking**: Add multiple fees with percentage or fixed amounts
- **GCI Calculation**: Automatic gross commission income calculation
- **Currency Support**: Multi-currency support (defaults to USD)

### 📋 Advanced Features
- **Lead Source Tracking**: Predefined sources plus custom "Other" option
- **Checklist Management**: Add custom checklists to transactions
- **Date Tracking**: List dates, expiration dates, and calculated days on market
- **Status Filtering**: Filter transactions by status
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **SWR** - Data fetching and caching
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Database-level security
- **Real-time subscriptions** - Live data updates

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Turbopack** - Fast bundling
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **npm or yarn** - Package manager
- **Supabase account** - Backend service

### 1. Clone and Install

```bash
git clone <repository-url>
cd RealPeep
npm install
```

### 2. Environment Setup

Run the automated setup script:

```bash
npm run setup
```

This creates a `.env.local` file with the required environment variables. Update it with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Supabase Configuration

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Settings > API
3. **Run the database schema** in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('buyer', 'seller')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'pending', 'closed')) DEFAULT 'active',
  client_name TEXT NOT NULL,
  property_address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  property_type TEXT,
  list_price DECIMAL(12,2),
  buyer_budget DECIMAL(12,2),
  listing_date DATE,
  expiration_date DATE,
  agreement_start_date DATE,
  agreement_end_date DATE,
  listing_agent_percentage DECIMAL(5,2),
  buyer_agent_percentage DECIMAL(5,2),
  broker_split_percentage DECIMAL(5,2),
  gci DECIMAL(12,2),
  lead_source TEXT,
  currency TEXT DEFAULT 'USD',
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON public.transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS transactions_user_id_idx ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS transactions_status_idx ON public.transactions(status);
CREATE INDEX IF NOT EXISTS transactions_type_idx ON public.transactions(type);
CREATE INDEX IF NOT EXISTS transactions_created_at_idx ON public.transactions(created_at);
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage Guide

### Authentication

1. **Visit the app** - You'll be redirected to the sign-in page
2. **Enter your email** - Use any valid email address
3. **Check your email** - Click the magic link to authenticate
4. **Access transactions** - You'll be redirected to the transactions page

### Creating Transactions

1. **Click "Add Transaction"** - Opens the multi-step wizard
2. **Step 1 - Type & Checklist**: 
   - Choose Buyer or Seller transaction
   - Enter client name and lead source
   - Add custom checklists
3. **Step 2 - Details**:
   - **Seller**: Property address, list price, listing dates
   - **Buyer**: Budget range, agreement dates
4. **Step 3 - Commission & Fees**:
   - Set broker splits and agent percentages
   - Add custom fees (pre/post-split)
5. **Step 4 - Status**:
   - Review all information
   - Set transaction status
   - Save the transaction


## 🏗 Project Structure

```
RealPeep/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (app)/                    # Protected app routes
│   │   │   ├── layout.tsx            # App layout with navigation
│   │   │   └── transactions/          # Main transactions page
│   │   │       ├── page.tsx          # Transactions list page
│   │   │       ├── TransactionTable.tsx
│   │   │       ├── useTransactions.ts # Data fetching hook
│   │   │       └── transaction-modal-headless/
│   │   │           ├── components/
│   │   │           │   └── transactions/
│   │   │           │       ├── AddTransactionModal.tsx
│   │   │           │       └── FieldRenderer.tsx
│   │   │           └── domain/
│   │   │               └── transactions/
│   │   │                   ├── form-controller.tsx
│   │   │                   ├── schema.ts
│   │   │                   └── variants/
│   │   │                       ├── buyer.ts
│   │   │                       └── seller.ts
│   │   ├── (auth)/                   # Authentication routes
│   │   │   ├── layout.tsx            # Auth layout
│   │   │   └── sign-in/
│   │   │       └── page.tsx          # Sign-in page
│   │   ├── api/                      # API routes
│   │   │   └── auth/
│   │   │       └── signout/
│   │   │           └── route.ts
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page (redirects)
│   ├── components/                    # Reusable UI components
│   │   ├── ui/                       # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Typography.tsx
│   │   ├── table/
│   │   │   └── EmptyTable.tsx
│   │   ├── topBar/
│   │   │   ├── TopBar.tsx
│   │   │   └── ProfileMenu.tsx
│   │   └── SideNav.tsx
│   ├── hooks/                        # Custom React hooks
│   │   └── useAuth.ts
│   ├── lib/                          # Utilities and configuration
│   │   ├── supabaseClient.ts         # Supabase client setup
│   │   └── utils.ts                  # Helper functions
│   └── providers/                    # React context providers
│       ├── index.tsx
│       └── newTransaction.tsx
├── public/                           # Static assets
│   ├── realpeep-logo.svg
│   └── [other assets]
├── scripts/                          # Utility scripts
│   └── seed-users.ts
├── supabase-schema.sql               # Database schema
├── setup.js                          # Environment setup script
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

