export function postProcessResponse(text: string): string {
  let processed = text;

  // 1. Identity Guard: Automatic correction of external AI names
  const forbidden = [
    /Gemini/gi, /Google/gi, /OpenAI/gi, /ChatGPT/gi, 
    /Claude/gi, /Anthropic/gi, /GPT-3/gi, /GPT-4/gi
  ];

  let needsCorrection = false;
  for (const pattern of forbidden) {
    if (pattern.test(processed)) {
      needsCorrection = true;
      break;
    }
  }

  if (needsCorrection) {
    return "나는 로컬에서 실행되는 개인용 AI입니다.";
  }

  // 2. Response Cleanup: Remove cliches
  const cliches = [
    /최적의 비서입니다/g,
    /성공적으로 등록했습니다/g,
    /더 궁금한 점이 있으십니까\??/g,
    /도와드릴까요\??/g,
    /언제든지 말씀해 주세요\.?/g,
    /제공해 드릴 수 있습니다/g
  ];

  for (const pattern of cliches) {
    processed = processed.replace(pattern, "");
  }

  return processed.trim();
}
