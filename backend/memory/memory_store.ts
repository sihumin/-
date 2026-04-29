import { getDb, saveToDb } from '../db/memory_db';

export interface Message {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export type MemoryType = 'profile' | 'preference' | 'project' | 'fact' | 'decision' | 'conversation';

export interface Memory {
  id: number;
  type: MemoryType;
  content: string;
  importance: number; // 1-5
  confidence: number; // 0-1
  created_at: string;
  updated_at: string;
}

export interface Settings {
  useFallbackModel: boolean;
}

export async function getSettings(): Promise<Settings> {
  const db = await getDb();
  return db.settings || { useFallbackModel: false };
}

export async function updateSettings(settings: Partial<Settings>): Promise<void> {
  const db = await getDb();
  db.settings = { ...db.settings, ...settings };
  await saveToDb(db);
}

export async function saveMessage(role: 'user' | 'assistant', content: string): Promise<void> {
  const db = await getDb();
  const newMessage: Message = {
    id: db.messages.length + 1,
    role,
    content,
    created_at: new Date().toISOString()
  };
  db.messages.push(newMessage);
  await saveToDb(db);
}

export async function getRecentMessages(limit: number = 20): Promise<Message[]> {
  const db = await getDb();
  const messages = [...db.messages].reverse();
  return messages.slice(0, limit);
}

export async function saveMemory(type: MemoryType, content: string, importance: number = 3): Promise<void> {
  const db = await getDb();
  
  // Basic de-duplication: if same content exists in same type, just update timestamp
  const existing = db.memories.find((m: Memory) => m.type === type && m.content.toLowerCase() === content.toLowerCase());
  
  if (existing) {
    existing.updated_at = new Date().toISOString();
    existing.importance = Math.max(existing.importance, importance);
  } else {
    const newMemory: Memory = {
      id: Date.now(),
      type,
      content,
      importance,
      confidence: 1.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.memories.push(newMemory);
  }
  await saveToDb(db);
}

export async function getAllMemories(): Promise<Memory[]> {
  const db = await getDb();
  return db.memories || [];
}

export async function deleteMemory(id: number): Promise<void> {
  const db = await getDb();
  db.memories = db.memories.filter((m: Memory) => m.id !== id);
  await saveToDb(db);
}

export async function searchMemories(query: string): Promise<Memory[]> {
  const db = await getDb();
  const keywords = query.toLowerCase().split(' ').filter(k => k.length > 1);
  
  if (keywords.length === 0) return [];

  // Keyword matching score
  return (db.memories || [])
    .map((m: Memory) => {
      let score = 0;
      const contentLower = m.content.toLowerCase();
      keywords.forEach(kw => {
        if (contentLower.includes(kw)) score += 1;
      });
      return { ...m, matchScore: score };
    })
    .filter((m: any) => m.matchScore > 0)
    .sort((a: any, b: any) => b.matchScore - a.matchScore)
    .slice(0, 5);
}
