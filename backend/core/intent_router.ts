export enum Intent {
  CHAT = "chat",
  MEMORY_SAVE = "memory_save",
  MEMORY_QUERY = "memory_query",
  IDENTITY_QUESTION = "identity_question",
  TRAINING_STATUS = "training_status",
  DATASET_STATUS = "dataset_status",
  UNKNOWN = "unknown"
}

export function routeIntent(input: string): Intent {
  const normalized = input.toLowerCase();
  
  if (normalized.includes("너 누구") || normalized.includes("who are you") || normalized.includes("모델 뭐야") || normalized.includes("gemini") || normalized.includes("chatgpt")) {
    return Intent.IDENTITY_QUESTION;
  }

  if (normalized.includes("기억해") || normalized.includes("remember")) {
    return Intent.MEMORY_SAVE;
  }
  
  if (normalized.includes("나에 대해") || normalized.includes("what do you know") || normalized.includes("기억나") || normalized.includes("기억해?")) {
    return Intent.MEMORY_QUERY;
  }

  if (normalized.includes("학습 상태") || normalized.includes("training status")) {
    return Intent.TRAINING_STATUS;
  }

  if (normalized.includes("데이터셋") || normalized.includes("dataset status")) {
    return Intent.DATASET_STATUS;
  }
  
  return Intent.CHAT;
}
