import { Request, Response } from 'express';
import { processInput } from '../core/jarvis_core';
import { getRecentMessages, getAllMemories, deleteMemory, getSettings, updateSettings } from '../memory/memory_store';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export async function handleChat(req: Request, res: Response) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await processInput(message);
    res.json(result);
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getHistory(req: Request, res: Response) {
  try {
    const messages = await getRecentMessages(50);
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
}

export async function getMemories(req: Request, res: Response) {
  try {
    const memories = await getAllMemories();
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memories" });
  }
}

export async function handleDeleteMemory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteMemory(Number(id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete memory" });
  }
}

export async function getDatasetStatus(req: Request, res: Response) {
  const datasetPath = path.join(process.cwd(), 'data/final/cleaned_dataset.jsonl');
  const exists = fs.existsSync(datasetPath);
  let size = 0;
  if (exists) {
    size = fs.statSync(datasetPath).size;
  }
  res.json({ exists, size_bytes: size, path: 'data/final/cleaned_dataset.jsonl' });
}

export async function getTrainingStatus(req: Request, res: Response) {
  const modelPath = path.join(process.cwd(), 'model/final/pytorch_model.bin');
  const trainedModelExists = fs.existsSync(modelPath);
  const settings = await getSettings();
  
  let modelSource = "none";
  if (trainedModelExists) {
    modelSource = "user_trained_local";
  } else if (settings.useFallbackModel) {
    modelSource = "fallback_pretrained_test_model";
  }

  res.json({ 
    trainedModelExists,
    usingFallbackModel: settings.useFallbackModel,
    modelSource,
    modelPath: trainedModelExists ? 'model/final' : (settings.useFallbackModel ? 'Xenova/distilgpt2' : 'none'),
    inference_engine: trainedModelExists ? 'Python/PyTorch' : (settings.useFallbackModel ? 'Transformers.js' : 'none')
  });
}

export async function handleGetSettings(req: Request, res: Response) {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
}

export async function handleUpdateSettings(req: Request, res: Response) {
  try {
    const settings = req.body;
    await updateSettings(settings);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
}
