import { spawn } from 'child_process';
const proc = spawn('python3', ['-c', 'import sys; print(sys.path); import transformers; print("transformers ok"); import torch; print("torch ok")']);
proc.stdout.on('data', (d) => process.stdout.write(d));
proc.stderr.on('data', (d) => process.stderr.write(d));
