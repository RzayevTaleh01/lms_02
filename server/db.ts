import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

// Ensure environment variables are loaded before database connection
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  const errorMessage = `
🚨 Database Configuration Error

DATABASE_URL environment variable is not set.

📝 To resolve this issue:

For Local Development:
  1. Create a .env file in your project root
  2. Add: DATABASE_URL=your_postgresql_connection_string

For Production Deployment:
  1. Add DATABASE_URL as an environment variable in your deployment platform
  2. Ensure the PostgreSQL database is provisioned and accessible

For Replit:
  1. Go to the Secrets tab in your repl
  2. Add a new secret: DATABASE_URL
  3. Set the value to your PostgreSQL connection string

💡 Example DATABASE_URL format:
postgresql://username:password@host:port/database?sslmode=require

The application cannot start without a valid database connection.
  `;
  
  console.error(errorMessage);
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });