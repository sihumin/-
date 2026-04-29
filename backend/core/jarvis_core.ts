import { routeIntent, Intent } from './intent_router';
import { buildPrompt } from './prompt_builder';
import { generate } from '../inference/local_model';
import { saveMessage, getRecentMessages, searchMemories } from '../memory/memory_store';
import { searchKnowledge } from './knowledge_store';
import { extractAndStoreMemories } from './memory_extractor';
import { postProcessResponse } from './post_processor';

export async function processInput(input: string) {
  // 1. Identify Intent
  const intent = routeIntent(input);
  
  // 2. Extract Memories (if applicable)
  await extractAndStoreMemories(input);

  // 3. Identity Special Handling
  if (intent === Intent.IDENTITY_QUESTION) {
    const rawResponse = "나는 로컬에서 실행되는 개인용 AI입니다.";
    await saveMessage('user', input);
    await saveMessage('assistant', rawResponse);
    return { response: rawResponse, intent, model: "identity-guard" };
  }
  
  // 4. Fetch Relevant Memories & Knowledge (RAG)
  const memories = await searchMemories(input);
  const knowledge = await searchKnowledge(input, 3);
  
  // 5. Fetch Recent context
  const history = await getRecentMessages(5);
  
  // 6. Build Prompt (Updated to include knowledge)
  // We'll update prompt_builder.ts separately to handle KnowledgeDocument[]
  const prompt = buildPrompt(input, history, memories, knowledge);
  
  // 7. Generate Response (Local Inference)
  const result = await generate(prompt);
  
  // 8. Handle "No Model" Scenario with Knowledge Snippets
  let finalResponse = postProcessResponse(result.text);
  if (result.model_name === 'none' && knowledge.length > 0) {
    const formattedSnippets = knowledge.slice(0, 3).map(k => {
      // Get first 2-3 sentences
      const sentences = k.text.split(/(?<=[.!?])\s+/).slice(0, 3).join(' ');
      return `[정보] ${k.title}\n- ${sentences}`;
    }).join('\n\n');
    
    finalResponse = `로컬 모델이 없어 지식 베이스의 검색 결과로 간단 요약을 제공합니다:\n\n${formattedSnippets}`;
  }
  
  // 9. Store Interaction
  await saveMessage('user', input);
  await saveMessage('assistant', finalResponse);
  
  return {
    response: finalResponse,
    intent,
    model: result.model_name,
    sources: knowledge.map(k => k.title)
  };
}
