# DevCode Academy - Deployment Guide

## Required Environment Variables

For the application to start successfully, the following environment variables must be configured:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:port/db?sslmode=require` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `SESSION_SECRET` | Session encryption key | Auto-generated |
| `REPLIT_DOMAINS` | Allowed domains for CORS | Auto-configured |
| `ISSUER_URL` | Auth issuer URL | Auto-configured |

## Deployment Instructions

### Replit Deployment

#### Step 1: Database Setup

1. **Provision PostgreSQL Database** (if not already done)
   - In your Replit project, click the "Database" tab in the left sidebar
   - Select "PostgreSQL" and click "Create Database"
   - Note the DATABASE_URL provided after creation

2. **Run Database Migrations**
   - In your Replit terminal, run:
     ```bash
     npm run db:push
     ```
   - Verify success with message: `[✓] Changes applied`

#### Step 2: Configure Deployment Secrets

1. **Add DATABASE_URL Secret**
   - Go to your repl's "Secrets" tab in the left sidebar
   - Click "Add new secret"
   - Name: `DATABASE_URL`
   - Value: Copy the DATABASE_URL from your Database tab
   - Click "Add secret"

2. **Optional Production Secrets** (recommended)
   - `SESSION_SECRET`: A secure random string (e.g., generated with `openssl rand -base64 32`)
   - `NODE_ENV`: Set to `production`

#### Step 3: Deploy

1. **Click the "Deploy" button** in your repl
2. **Choose deployment option:**
   - Reserved VM (recommended for production)
   - Autoscale (for variable loads)
3. **Wait for build and deployment to complete**

#### Step 4: Verify Deployment

1. **Check deployment logs** for successful startup:
   ```
   ✅ Server successfully started on port 5000
   📊 Database: Connected
   ```

2. **Test your deployed application:**
   - Access the provided deployment URL
   - Log in with demo accounts:
     - Admin: admin@devcode.az / admin123
     - Teacher: teacher@devcode.az / teacher123
     - Student: student@devcode.az / student123

### Other Platforms

1. **Environment Variables**
   - Set `DATABASE_URL` in your platform's environment variables
   - Set `NODE_ENV=production`

2. **Build Commands**
   ```bash
   npm install
   npm run build
   ```

3. **Start Command**
   ```bash
   npm run start
   ```

## Troubleshooting

### Database Connection Issues

**Error**: `DATABASE_URL must be set`
- **Solution**: Add DATABASE_URL to your environment variables/secrets

**Error**: `Connection refused`
- **Solution**: Check that your database is accessible and the connection string is correct

**Error**: `Port 5000 in use`
- **Solution**: The application automatically handles port conflicts in production

### Environment Variable Issues

The application now provides detailed error messages when environment variables are missing:

```
🚨 Application startup failed - Missing required environment variables:
   ❌ DATABASE_URL is not set

📝 Deployment troubleshooting:
   For Replit Deployments:
     1. Go to your repl settings
     2. Navigate to the "Secrets" tab
     3. Add DATABASE_URL as a secret
     4. Redeploy your application
```

### Logs and Monitoring

The application now provides comprehensive startup logging:

```
📁 Environment variables loaded from .env file
🌍 Environment: production
📦 Node version: v20.x.x

🔍 Environment Variable Status:
   ✅ DATABASE_URL: Set
   ⚠️  SESSION_SECRET: Not set (optional)

✅ Server successfully started on port 5000
🌐 Environment: production
📊 Database: Connected
```

## Production Checklist

- [ ] DATABASE_URL is set and accessible
- [ ] Database is provisioned and running
- [ ] Application builds successfully (`npm run build`)
- [ ] Application starts without errors (`npm run start`)
- [ ] Application is accessible on the deployed URL
- [ ] All required API endpoints respond correctly

## Security Notes

- Never commit sensitive environment variables to version control
- Use secure connection strings with SSL/TLS enabled
- Regularly rotate database credentials
- Monitor application logs for security issues

## Support

If deployment issues persist:

1. Check the application logs for detailed error messages
2. Verify database connectivity from your deployment environment
3. Ensure all required environment variables are properly set
4. Contact your hosting platform's support if infrastructure issues occur