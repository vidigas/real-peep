# Deployment Guide

## Vercel Deployment (Recommended)

### 1. Prepare Your Repository

1. Initialize git if not already done:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Click "Deploy"

### 3. Configure Supabase

1. Go to your Supabase project settings
2. Navigate to Authentication > URL Configuration
3. Add your Vercel domain to "Site URL" and "Redirect URLs":
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/auth/callback`

### 4. Test the Deployment

1. Visit your deployed URL
2. Test authentication with different email addresses
3. Create transactions and verify data persistence
4. Test with multiple accounts to ensure RLS is working

## Alternative Deployment Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variables
3. Deploy

## Environment Variables

Make sure these are set in your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Database Setup

Don't forget to run the SQL schema in your Supabase project:

```sql
-- See README.md for the complete SQL schema
```

## Testing Checklist

- [ ] Authentication works (magic link)
- [ ] Can create seller transactions
- [ ] Can create buyer transactions
- [ ] Can edit transactions
- [ ] Can delete transactions
- [ ] Status filtering works
- [ ] Data persists after refresh
- [ ] RLS prevents cross-user data access
- [ ] Mobile responsive design
- [ ] No console errors

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check Supabase URL configuration
2. **Database errors**: Verify RLS policies are set up correctly
3. **Build failures**: Check environment variables are set
4. **CORS errors**: Ensure Supabase is configured for your domain

### Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Supabase logs
3. Check Vercel function logs
4. Open an issue in the GitHub repository
