import { spawn } from 'child_process';
const proc = spawn('python3', ['scripts/env_info.py']);
proc.stdout.on('data', (d) => process.stdout.write(d));
proc.stderr.on('data', (d) => process.stderr.write(d));
