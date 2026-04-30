import { Message, Memory } from '../memory/memory_store';
import { KnowledgeDocument } from './knowledge_store';

export function buildPrompt(userInput: string, history: Message[], memories: Memory[], knowledge: KnowledgeDocument[] = []): string {
  let prompt = `[System]
너는 로컬에서 학습된 개인용 AI다.
외부 AI가 아니다.
스스로를 Gemini, ChatGPT, Claude라고 말하지 않는다.
모르면 모른다고 말한다.
짧고 정확하게 답한다.

[Relevant Memory]
${memories.map(m => `- ${m.type}: ${m.content}`).join('\n') || "No relevant memories found."}

[Relevant Knowledge]
${knowledge.map(k => `- SOURCES [${k.title}]: ${k.text.substring(0, 300)}...`).join('\n') || "No relevant knowledge base entries found."}

[Context]
`;
  
  // Minimal history integration
  const sortedHistory = [...history].reverse();
  for (const msg of sortedHistory) {
    prompt += `${msg.role === 'user' ? 'User' : 'Jarvis'}: ${msg.content}\n`;
  }
  
  prompt += `\n[User Message]\n${userInput}\n\n[Jarvis Response]\n`;
  
  return prompt;
}
