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

1. **Configure Secrets**
   - Go to your repl's "Secrets" tab
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Example: `postgresql://username:password@host:port/database?sslmode=require`

2. **Deploy**
   - Click the "Deploy" button in your repl
   - The application will automatically build and start

3. **Verify Deployment**
   - Check the deployment logs for successful startup messages
   - Look for: "✅ Server successfully started on port 5000"

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