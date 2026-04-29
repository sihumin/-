import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database.json');

export async function getDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(data);
    // Ensure segments exist
    if (!db.messages) db.messages = [];
    if (!db.memories) db.memories = [];
    if (!db.settings) db.settings = { useFallbackModel: false };
    return db;
  } catch (error) {
    // Initial state
    const initialData = { 
      messages: [],
      memories: [],
      settings: { useFallbackModel: false }
    };
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

export async function saveToDb(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
