/**
 * Local Inference Engine (Phase 2)
 * Handles model loading and generation using local weights.
 */
import { pipeline } from '@xenova/transformers';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { getSettings } from '../memory/memory_store';

export interface InferenceResult {
  text: string;
  model_name: string;
}

const MODEL_PATH = path.join(process.cwd(), 'model/final/pytorch_model.bin');
const BRIDGE_SCRIPT = path.join(process.cwd(), 'scripts/inference_bridge.py');

let generator: any = null;

async function runPythonInference(prompt: string): Promise<InferenceResult> {
  return new Promise((resolve) => {
    let output = '';
    const py = spawn('python3', [BRIDGE_SCRIPT, prompt]);
    py.stdout.on('data', (data) => output += data.toString());
    py.on('close', (code) => {
      if (code !== 0) {
        resolve({ text: "Python inference failed. Check dependencies.", model_name: "custom-gpt-error" });
      } else {
        try {
          const result = JSON.parse(output);
          resolve(result);
        } catch (e) {
          resolve({ text: output.trim(), model_name: "user_trained_local" });
        }
      }
    });
    py.on('error', (err) => {
      resolve({ text: `Python not found or bridge error: ${err.message}`, model_name: "custom-gpt-error" });
    });
  });
}

async function runFallbackInference(prompt: string): Promise<InferenceResult> {
  if (!generator) {
    generator = await pipeline('text-generation', 'Xenova/distilgpt2');
  }
  const result = await generator(prompt, { max_new_tokens: 50 });
  const generatedText = result[0].generated_text;
  const cleanText = generatedText.startsWith(prompt) 
    ? generatedText.substring(prompt.length).trim() 
    : generatedText.trim();
  return { text: cleanText, model_name: "fallback_pretrained_test_model" };
}

export async function generate(prompt: string): Promise<InferenceResult> {
  // 1. Check for custom trained model
  if (fs.existsSync(MODEL_PATH)) {
    return runPythonInference(prompt);
  }

  // 2. Check for fallback setting
  const settings = await getSettings();
  if (settings.useFallbackModel) {
    return runFallbackInference(prompt);
  }

  // 3. Rejection
  return {
    text: "Local trained model is not available yet. Please complete Phase 2 training.",
    model_name: "none"
  };
}
