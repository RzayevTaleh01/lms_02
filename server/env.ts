import dotenv from "dotenv";

/**
 * Environment configuration loader
 * Ensures proper environment variable loading for both development and production
 */
export function loadEnvironment() {
  // Always load environment variables from .env in development
  if (process.env.NODE_ENV !== "production") {
    const result = dotenv.config();
    if (result.error) {
      console.warn('⚠️  .env file not found or could not be loaded');
    } else {
      console.log('📁 Environment variables loaded from .env file');
    }
  }

  // Log environment info (without sensitive data)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📦 Node version: ${process.version}`);
  
  // Validate critical environment variables
  const requiredVars = ['DATABASE_URL'];
  const optionalVars = ['SESSION_SECRET', 'REPLIT_DOMAINS', 'ISSUER_URL'];
  
  console.log('\n🔍 Environment Variable Status:');
  
  // Check required variables
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`   ✅ ${varName}: Set`);
    } else {
      console.log(`   ❌ ${varName}: Missing (REQUIRED)`);
    }
  });
  
  // Check optional variables
  optionalVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`   ✅ ${varName}: Set`);
    } else {
      console.log(`   ⚠️  ${varName}: Not set (optional)`);
    }
  });
  
  console.log(''); // Empty line for readability
}

/**
 * Validates that all required environment variables are present
 * Exits the process if any required variables are missing
 */
export function validateRequiredEnvironment(): void {
  const requiredVars = ['DATABASE_URL'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('\n🚨 Application startup failed - Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   ❌ ${varName} is not set`);
    });
    
    console.error('\n📝 Deployment troubleshooting:');
    console.error('   For Replit Deployments:');
    console.error('     1. Go to your repl settings');
    console.error('     2. Navigate to the "Secrets" tab');
    console.error('     3. Add DATABASE_URL as a secret');
    console.error('     4. Redeploy your application');
    console.error('');
    console.error('   For other platforms:');
    console.error('     1. Set DATABASE_URL in your deployment environment variables');
    console.error('     2. Ensure your PostgreSQL database is accessible');
    console.error('     3. Check your deployment logs for connectivity issues');
    
    console.error('\n💡 DATABASE_URL format:');
    console.error('   postgresql://username:password@host:port/database?sslmode=require');
    
    process.exit(1);
  }
}