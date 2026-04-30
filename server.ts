import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { handleChat, getHistory } from './backend/api/chat';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/chat', handleChat);
  app.get('/api/history', getHistory);
  app.get('/api/memory', (req, res) => import('./backend/api/chat').then(m => m.getMemories(req, res)));
  app.delete('/api/memory/:id', (req, res) => import('./backend/api/chat').then(m => m.handleDeleteMemory(req, res)));
  app.get('/api/dataset/status', (req, res) => import('./backend/api/chat').then(m => m.getDatasetStatus(req, res)));
  app.get('/api/training/status', (req, res) => import('./backend/api/chat').then(m => m.getTrainingStatus(req, res)));
  app.get('/api/training/download-notebook', (req, res) => {
    res.download(path.join(process.cwd(), 'notebooks/jarvis_training_lab.ipynb'), 'jarvis_training_lab.ipynb');
  });
  app.get('/api/training/download-dataset', (req, res) => {
    const p = path.join(process.cwd(), 'data/final/cleaned_dataset.jsonl');
    if (fs.existsSync(p)) {
      res.download(p, 'cleaned_dataset.jsonl');
    } else {
      res.status(404).send('Dataset file not found. Please run web crawling first.');
    }
  });
  app.get('/api/settings', (req, res) => import('./backend/api/chat').then(m => m.handleGetSettings(req, res)));
  app.post('/api/settings', (req, res) => import('./backend/api/chat').then(m => m.handleUpdateSettings(req, res)));

  // Knowledge Base Routes
  app.get('/api/knowledge', (req, res) => import('./backend/api/knowledge').then(m => m.handleListKnowledge(req, res)));
  app.post('/api/knowledge/import', (req, res) => import('./backend/api/knowledge').then(m => m.handleImportUrl(req, res)));
  app.delete('/api/knowledge/:id', (req, res) => import('./backend/api/knowledge').then(m => m.handleDeleteKnowledge(req, res)));
  app.get('/api/knowledge/search', (req, res) => import('./backend/api/knowledge').then(m => m.handleSearchKnowledge(req, res)));

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
