import { spawn } from 'child_process';

async function runCommand(cmd: string, args: string[]) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Executing: ${cmd} ${args.join(' ')}`);
    const proc = spawn(cmd, args, { cwd: process.cwd() });
    proc.stdout.on('data', (d) => process.stdout.write(d));
    proc.stderr.on('data', (d) => process.stderr.write(d));
    proc.on('close', (code) => code === 0 ? resolve(true) : reject(code));
  });
}

async function main() {
  try {
    console.log("⏳ Installing Python dependencies...");
    await runCommand('python3', ['-m', 'pip', 'install', 'requests', 'beautifulsoup4', 'pyyaml', 'tokenizers', 'transformers', 'torch', 'datasets']);
    console.log("✅ Python dependencies installed.");
  } catch (e) {
    console.error("❌ Critical Failure: Could not install python packages.");
  }
}

main();
