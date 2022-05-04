import { appDataSource } from './data-source';

export async function createDatabaseConnection() {
  try {
    await appDataSource.initialize();
  } catch (error) {
    console.log('Something went wrong on database connection', { error });
  }
} 
