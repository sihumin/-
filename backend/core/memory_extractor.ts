import { saveMemory } from '../memory/memory_store';

export async function extractAndStoreMemories(input: string): Promise<void> {
  const normalized = input.trim();

  // 1. Profile: Name & Age (Basic Korean/English patterns)
  // "나는 민시후고 15살이야"
  const ageMatch = normalized.match(/(\d+)\s*살/);
  if (ageMatch) {
    await saveMemory('profile', `User age: ${ageMatch[1]}`, 5);
  }

  const nameMatch = normalized.match(/나는\s+([가-힣a-zA-Z]+)(?:이야|라고 해|이고|입니다)/) || 
                    normalized.match(/I am\s+([a-zA-Z\s]+)/i);
  if (nameMatch) {
    await saveMemory('profile', `User name: ${nameMatch[1].trim()}`, 5);
  }

  // 2. Preferences
  if (normalized.includes("좋아해") || normalized.includes("싫어해") || normalized.includes("like")) {
    await saveMemory('preference', input, 3);
  }

  // 3. Projects/Goals
  if (normalized.includes("프로젝트") || normalized.includes("목표") || normalized.includes("project")) {
    await saveMemory('project', input, 4);
  }

  // 4. Facts/Decisions (Broad catch for explicit "remember" intent)
  if (normalized.startsWith("기억해") || normalized.startsWith("Remember")) {
    await saveMemory('fact', normalized.replace(/기억해|Remember/i, "").trim(), 4);
  }
}
