import { spawn } from 'child_process';
import path from 'path';

async function runPython(scriptPath: string, args: string[] = []) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 [Runner] Starting: python3 ${scriptPath} ${args.join(' ')}`);
    const proc = spawn('python3', [scriptPath, ...args], {
      cwd: process.cwd(),
      env: { ...process.env, PYTHONUNBUFFERED: '1' }
    });

    proc.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    proc.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ [Runner] Finished: ${scriptPath}`);
        resolve(true);
      } else {
        console.error(`❌ [Runner] Failed: ${scriptPath} (Code: ${code})`);
        reject(new Error(`Exit code ${code}`));
      }
    });
  });
}

async function main() {
  const task = process.argv[2];

  try {
    switch (task) {
      case 'crawl':
        await runPython('scripts/crawler.py');
        break;
      case 'clean':
        await runPython('scripts/cleaner.py');
        break;
      case 'tokenizer':
        await runPython('training/train_tokenizer.py');
        break;
      case 'train':
        await runPython('training/train_model.py');
        break;
      case 'full':
        await runPython('scripts/crawler.py');
        await runPython('scripts/cleaner.py');
        await runPython('training/train_tokenizer.py');
        await runPython('training/train_model.py');
        break;
      default:
        console.log("Usage: npx tsx scripts/runner.ts [crawl|clean|tokenizer|train|full]");
    }
  } catch (e) {
    console.error("Pipeline aborted due to error.");
    process.exit(1);
  }
}

main();
