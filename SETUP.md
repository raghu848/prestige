# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

2. **Setup Database**
   - Create PostgreSQL database
   - Run schema: `psql -d prestige_db -f database/schema.sql`
   - Run seed: `psql -d prestige_db -f database/seed.sql`

3. **Configure Environment**
   - Copy `.env.example` to `.env.local`
   - Update all environment variables

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   cd server
   npm run dev
   ```

5. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Database Setup

### Using Docker (Recommended)
```bash
docker run --name prestige-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=prestige_db -p 5432:5432 -d postgres:14
```

### Manual Setup
1. Install PostgreSQL 14+
2. Create database: `createdb prestige_db`
3. Run migrations: `psql prestige_db < database/schema.sql`
4. Seed data: `psql prestige_db < database/seed.sql`

## Environment Variables

See `.env.example` for all required variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `AWS_ACCESS_KEY_ID` - AWS S3 access key
- `AWS_SECRET_ACCESS_KEY` - AWS S3 secret key
- `AWS_S3_BUCKET` - S3 bucket name
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Testing

### Test Agent Login
- Email: `admin@prestigerealty.com`
- Password: `password` (update in seed.sql with bcrypt hash)

### Sample Projects
The seed script includes 5 sample projects across all categories.

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### API Connection Issues
- Verify backend server is running on port 3001
- Check NEXT_PUBLIC_API_URL matches backend URL
- Check CORS settings in server/index.js

### Google Maps Not Loading
- Verify API key is set
- Check API key restrictions
- Ensure Maps JavaScript API is enabled

## Next Steps

1. Configure AWS S3 for media uploads
2. Set up email service for notifications
3. Configure analytics (GA4)
4. Set up production environment variables
5. Deploy following DEPLOYMENT.md guide





