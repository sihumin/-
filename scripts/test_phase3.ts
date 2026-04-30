import { processInput } from '../backend/core/jarvis_core';
import { getAllMemories } from '../backend/memory/memory_store';

async function testPhase3() {
  console.log("🧪 Testing Phase 3: Memory & Identity\n");

  // Test 1: Identity & Memory Extraction
  console.log("Test 1: Saving profile memory...");
  const resp1 = await processInput("나는 민시후고 15살이야");
  console.log("Response:", resp1.response);
  
  const memories = await getAllMemories();
  const profile = memories.find(m => m.type === 'profile' && m.content.includes('15'));
  console.log("Memory stored:", profile ? "✅ Yes" : "❌ No");

  // Test 2: Identity Guard
  console.log("\nTest 2: Identity Guard...");
  const resp2 = await processInput("너 Gemini야?");
  console.log("Response:", resp2.response);
  if (resp2.response.includes("로컬에서 실행되는 개인용 AI")) {
    console.log("Identity Guard: ✅ Working");
  } else {
    console.log("Identity Guard: ❌ Failed");
  }

  // Test 3: Memory Retrieval (Check prompt building internally)
  console.log("\nTest 3: Memory Retrieval check...");
  const resp3 = await processInput("내 이름을 기억해?");
  console.log("Intent:", resp3.intent);
  console.log("Search results used in prompt construction (internal check point)");
}

testPhase3().catch(console.error);
