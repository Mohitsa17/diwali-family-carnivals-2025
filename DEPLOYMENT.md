# Deployment Guide

This guide will help you deploy the Diwali Family Carnival website to production.

## 🚀 Quick Deployment (Vercel - Recommended)

### 1. Prepare Your Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add environment variables (see below)
6. Click "Deploy"

### 3. Set Up Production Database
Choose one of these options:

#### Option A: Vercel Postgres (Easiest)
1. In Vercel dashboard, go to Storage tab
2. Create a new Postgres database
3. Copy the connection string
4. Add as `DATABASE_URL` environment variable

#### Option B: Supabase (Free tier available)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Add as `DATABASE_URL` environment variable

#### Option C: PlanetScale (Free tier available)
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get the connection string
4. Add as `DATABASE_URL` environment variable

### 4. Run Database Migrations
```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Push database schema
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## 🔧 Environment Variables Setup

Add these environment variables in your Vercel dashboard:

### Required Variables
```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
GOOGLE_SHEETS_WEBHOOK="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
ADMIN_SECRET="your_secure_admin_password"
```

### Optional Variables
```env
SENDGRID_API_KEY="your_sendgrid_api_key"
CLIENT_NOTIFICATION_EMAIL="admin@example.com"
```

## 📊 Google Sheets Setup

### 1. Create Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Create these sheets:
   - `SuperMom`
   - `CutestBaby`
   - `SeniorCitizens`
   - `GeneralJoiners`

### 2. Set Up Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the code from `google-apps-script.js`
4. Replace `YOUR_SPREADSHEET_ID` with your actual ID
5. Save the project
6. Deploy as web app:
   - Click "Deploy" > "New deployment"
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
7. Copy the web app URL
8. Add as `GOOGLE_SHEETS_WEBHOOK` environment variable

## ☁️ Cloudinary Setup

### 1. Create Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Get your credentials from dashboard

### 2. Configure Upload Settings
1. Go to Settings > Upload
2. Set up upload presets:
   - **Photos**: Max file size 5MB, formats: jpg, png, webp
   - **Videos**: Max file size 10MB, formats: mp4, webm, mov

## 📧 SendGrid Setup (Optional)

### 1. Create Account
1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up and verify your account
3. Create an API key with mail send permissions

### 2. Configure
1. Add API key as environment variable
2. Set up sender authentication
3. Configure admin email for notifications

## 🔒 Security Checklist

- [ ] Strong admin password set
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] File upload limits configured
- [ ] Rate limiting enabled
- [ ] HTTPS enabled (automatic on Vercel)

## 🧪 Testing Production

### 1. Test Registration
1. Visit your deployed site
2. Try registering for different contests
3. Check if data appears in Google Sheets
4. Verify file uploads work

### 2. Test Admin Dashboard
1. Go to `/admin`
2. Enter admin password
3. Test filtering and export features
4. Verify data accuracy

### 3. Test All Pages
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Registration modal functions
- [ ] Gallery images display
- [ ] Contact forms work

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Check if DATABASE_URL is correct
# Run migrations
npx prisma db push
```

#### Google Sheets Not Updating
- Verify webhook URL is correct
- Check Google Apps Script permissions
- Test the script manually

#### File Uploads Not Working
- Verify Cloudinary credentials
- Check file size limits
- Ensure CORS is configured

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📈 Performance Optimization

### 1. Image Optimization
- Use `next/image` for all images
- Optimize image sizes before upload
- Use WebP format when possible

### 2. Database Optimization
- Add indexes for frequently queried fields
- Use connection pooling in production
- Monitor query performance

### 3. Caching
- Enable Vercel's edge caching
- Use ISR for static content
- Implement client-side caching

## 🔄 Updates and Maintenance

### Regular Tasks
- [ ] Monitor registration submissions
- [ ] Check Google Sheets data
- [ ] Review admin dashboard logs
- [ ] Update contest information
- [ ] Backup database regularly

### Before Major Events
- [ ] Test all functionality
- [ ] Verify backup systems
- [ ] Check server resources
- [ ] Prepare for traffic spikes

## 📞 Support

If you encounter issues:
1. Check the logs in Vercel dashboard
2. Review environment variables
3. Test locally first
4. Contact support with specific error messages

---

**Happy Deploying! 🎉**
