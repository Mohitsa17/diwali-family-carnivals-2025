# Diwali Family Carnivals Indore 2025

A modern, responsive Next.js website for the Diwali Family Carnival event in Indore, featuring contest registrations, gallery, sponsors, and admin dashboard.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations using Framer Motion
- **Registration System**: Multi-step registration with contest selection and file uploads
- **Admin Dashboard**: Protected admin panel for managing registrations
- **Database Integration**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **File Uploads**: Cloudinary integration for photo and video uploads
- **Google Sheets Integration**: Automatic data sync via Google Apps Script
- **Email Notifications**: SendGrid integration for admin notifications
- **Rate Limiting**: Built-in protection against spam registrations

## 📋 Prerequisites

- Node.js 18+ and npm
- Google account (for Google Sheets integration)
- Cloudinary account (for file uploads)
- SendGrid account (optional, for email notifications)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env
   ```
   
   Edit `.env` with your actual values:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   
   # Google Sheets Integration
   GOOGLE_SHEETS_WEBHOOK="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
   
   # Admin Dashboard
   ADMIN_SECRET="your_secure_admin_password"
   
   # Email Notifications (Optional)
   SENDGRID_API_KEY="your_sendgrid_api_key"
   CLIENT_NOTIFICATION_EMAIL="admin@example.com"
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔧 Configuration

### Google Sheets Integration

1. **Create a Google Spreadsheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Create sheets named: `SuperMom`, `CutestBaby`, `SeniorCitizens`, `GeneralJoiners`

2. **Set up Google Apps Script**
   - Go to [Google Apps Script](https://script.google.com)
   - Create a new project
   - Copy the code from `google-apps-script.js`
   - Replace `YOUR_SPREADSHEET_ID` with your actual Spreadsheet ID
   - Deploy as web app with execute permissions for "Anyone"
   - Copy the web app URL and use it as `GOOGLE_SHEETS_WEBHOOK` in your `.env`

### Cloudinary Setup

1. **Create a Cloudinary account**
   - Go to [Cloudinary](https://cloudinary.com)
   - Sign up for a free account
   - Get your Cloud Name, API Key, and API Secret from the dashboard

2. **Configure upload settings**
   - Set up upload presets for photos and videos
   - Configure file size limits and allowed formats

### SendGrid Setup (Optional)

1. **Create a SendGrid account**
   - Go to [SendGrid](https://sendgrid.com)
   - Sign up and verify your account
   - Create an API key with mail send permissions

## 📱 Pages & Features

### Public Pages
- **Home**: Hero section with event details and contest previews
- **Contests**: Detailed contest information with registration CTAs
- **Gallery**: Photo gallery with lightbox and past events timeline
- **Sponsors**: Sponsor information and partnership opportunities
- **About**: Organization details, team, and mission
- **Help**: FAQ, contact information, and support form

### Admin Features
- **Dashboard**: View and manage all registrations
- **Filtering**: Filter by contest, search by name/phone/email
- **Export**: Download registrations as CSV
- **Statistics**: View registration counts by contest

### Registration System
- **Multi-step Form**: Conditional fields based on contest selection
- **File Uploads**: Photo and video uploads with validation
- **Validation**: Client and server-side validation
- **Rate Limiting**: Protection against spam

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Set up production database**
   - Use Vercel Postgres, Supabase, or PlanetScale
   - Update `DATABASE_URL` in Vercel environment variables
   - Run `npx prisma db push` to create tables

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables

## 🔒 Security Features

- **Admin Authentication**: Password-protected admin dashboard
- **Rate Limiting**: API endpoint protection against spam
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Type and size validation for uploads
- **Environment Variables**: Sensitive data stored securely

## 📊 Database Schema

### Registration Model
```prisma
model Registration {
  id        String   @id @default(cuid())
  name      String
  age       Int?
  whatsapp  String
  email     String?
  contest   Contest  @default(NONE)
  message   String?
  photoUrl  String?
  videoUrl  String?
  createdAt DateTime @default(now())
  ipAddress String?
}
```

### Contest Enum
```prisma
enum Contest {
  NONE
  SUPERMOM
  CUTESTBABY
  SENIORCITIZEN
  GENERAL
}
```

## 🎨 Customization

### Styling
- **Colors**: Update Tailwind config for brand colors
- **Fonts**: Modify font imports in `layout.tsx`
- **Images**: Replace placeholder images with actual event photos

### Content
- **Contest Details**: Update contest information in `src/lib/types.ts`
- **Team Information**: Modify team data in `src/app/about/page.tsx`
- **Contact Information**: Update contact details throughout the site

### Features
- **Additional Contests**: Add new contest types in the enum and types
- **Custom Fields**: Extend registration form with additional fields
- **Notifications**: Customize email templates and notification logic

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build test
npm run build
```

## 📝 API Endpoints

- `POST /api/register` - Submit registration
- `GET /api/admin/registrations` - Get registrations (admin only)
- `GET /api/health` - Health check

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: info@diwalicarnival.com
- Phone: +91-9876543210
- Website: [Your Website URL]

## 🔄 Updates

### Version 1.0.0
- Initial release with all core features
- Registration system with contest selection
- Admin dashboard with filtering and export
- Google Sheets integration
- Cloudinary file uploads
- Responsive design with animations

---

**Built with ❤️ for the Indore community**