import fs from 'fs/promises';
import path from 'path';

export interface KnowledgeDocument {
  id: string;
  url: string;
  title: string;
  text: string;
  created_at: string;
}

const KNOWLEDGE_PATH = path.join(process.cwd(), 'data/knowledge.json');

async function ensureKnowledgeFile() {
  try {
    await fs.mkdir(path.dirname(KNOWLEDGE_PATH), { recursive: true });
    await fs.access(KNOWLEDGE_PATH);
  } catch {
    await fs.writeFile(KNOWLEDGE_PATH, JSON.stringify([], null, 2));
  }
}

export async function getAllKnowledge(): Promise<KnowledgeDocument[]> {
  await ensureKnowledgeFile();
  const data = await fs.readFile(KNOWLEDGE_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function addKnowledge(doc: Omit<KnowledgeDocument, 'id' | 'created_at'>): Promise<void> {
  const knowledge = await getAllKnowledge();
  const newDoc: KnowledgeDocument = {
    ...doc,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  };
  knowledge.push(newDoc);
  await fs.writeFile(KNOWLEDGE_PATH, JSON.stringify(knowledge, null, 2));
}

export async function searchKnowledge(query: string, limit: number = 3): Promise<KnowledgeDocument[]> {
  const knowledge = await getAllKnowledge();
  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 1);
  
  if (keywords.length === 0) return [];

  const results = knowledge.map(doc => {
    let score = 0;
    const content = (doc.title + ' ' + doc.text).toLowerCase();
    keywords.forEach(kw => {
      if (content.includes(kw)) score += 1;
    });
    return { ...doc, score };
  });

  return results
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export async function deleteKnowledge(id: string): Promise<void> {
  const knowledge = await getAllKnowledge();
  const filtered = knowledge.filter(doc => doc.id !== id);
  await fs.writeFile(KNOWLEDGE_PATH, JSON.stringify(filtered, null, 2));
}
