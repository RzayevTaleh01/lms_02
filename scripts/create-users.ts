import { createDefaultUsers } from '../server/storage.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  console.log('Creating default users...');
  try {
    await createDefaultUsers();
    console.log('Default users created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating default users:', error);
    process.exit(1);
  }
}

main();