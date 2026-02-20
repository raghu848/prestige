# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ database
- AWS Account (for S3 storage)
- Google Maps API Key
- Vercel account (for frontend)
- AWS EC2 instance (for backend)

## Frontend Deployment (Vercel)

1. **Connect Repository**
   - Push code to GitHub
   - Import repository in Vercel
   - Select Next.js framework preset

2. **Environment Variables**
   Set the following in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://api.prestigerealty.com
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key
   NEXT_PUBLIC_SITE_URL=https://prestigerealty.com
   ```

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Custom domain can be configured in settings

## Backend Deployment (AWS EC2)

1. **Setup EC2 Instance**
   ```bash
   # SSH into instance
   ssh -i your-key.pem ubuntu@your-ec2-ip

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PostgreSQL client
   sudo apt-get install postgresql-client
   ```

2. **Clone and Setup**
   ```bash
   git clone your-repo-url
   cd prestige/server
   npm install

   # Create .env file
   nano .env
   # Add all environment variables
   ```

3. **Setup PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start index.js --name prestige-api
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/prestige-api
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name api.prestigerealty.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/prestige-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.prestigerealty.com
   ```

## Database Setup

1. **Create RDS Instance**
   - Go to AWS RDS Console
   - Create PostgreSQL instance
   - Note connection details

2. **Run Migrations**
   ```bash
   psql -h your-rds-endpoint -U postgres -d prestige_db -f database/schema.sql
   psql -h your-rds-endpoint -U postgres -d prestige_db -f database/seed.sql
   ```

## AWS S3 Setup

1. **Create Bucket**
   - Create S3 bucket: `prestige-realty-media`
   - Enable CORS configuration
   - Set bucket policy for public read access

2. **Configure IAM**
   - Create IAM user with S3 access
   - Generate access keys
   - Add to backend .env

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify image uploads work
- [ ] Check Google Maps integration
- [ ] Test authentication flow
- [ ] Verify email notifications
- [ ] Check analytics integration
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Setup monitoring (Sentry, etc.)
- [ ] Configure backups

## Monitoring

- Use PM2 monitoring: `pm2 monit`
- Setup CloudWatch for AWS resources
- Integrate Sentry for error tracking
- Use Vercel Analytics for frontend

## Backup Strategy

- Daily database backups via RDS automated backups
- S3 versioning enabled for media files
- Code backups via Git repository





