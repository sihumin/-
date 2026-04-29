import { Request, Response } from 'express';
import { addKnowledge, getAllKnowledge, deleteKnowledge, searchKnowledge } from '../core/knowledge_store';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function handleListKnowledge(req: Request, res: Response) {
  try {
    const docs = await getAllKnowledge();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to list knowledge" });
  }
}

export async function handleDeleteKnowledge(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteKnowledge(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete knowledge" });
  }
}

export async function handleImportUrl(req: Request, res: Response) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    // Run crawler in a specific mode to extract just this URL
    // We'll use a temporary script for this targeted extraction
    const extractorScript = `
import urllib.request
import re
import json
import sys
import html

url = sys.argv[1]
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'JarvisPrivateCrawler/1.0'})
    with urllib.request.urlopen(req, timeout=10) as response:
        content_type = response.info().get_content_charset() or 'utf-8'
        raw_html = response.read().decode(content_type, errors='ignore')
        
        # Unescape HTML entities first
        raw_html = html.unescape(raw_html)
        
        # Title extraction
        title_match = re.search(r'<title>(.*?)</title>', raw_html, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else url
        
        # Content extraction - Remove noise
        text = re.sub(r'<(script|style|nav|footer|header|aside|noscript).*?</\\1>', '', raw_html, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<[^>]+>', ' ', text)
        
        # Clean whitespace and symbols
        text = re.sub(r'[\\r\\n\\t]+', ' ', text)
        text = re.sub(r'\\s+', ' ', text)
        text = re.sub(r'[\\u200b\\u200c\\u200d\\ufeff]', '', text) # Zero-width chars
        
        # Basic sentence segmentation (simple heuristic)
        sentences = re.split(r'(?<=[.!?])\\s+', text)
        cleaned_sentences = [s.strip() for s in sentences if len(s.strip()) > 20]
        final_text = " ".join(cleaned_sentences)
        
        print(json.dumps({"title": title, "text": final_text}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
`;
    const tempScriptPath = path.join(process.cwd(), 'temp_extract.py');
    fs.writeFileSync(tempScriptPath, extractorScript);

    const py = spawn('python3', [tempScriptPath, url]);
    let output = '';
    py.stdout.on('data', (data) => output += data.toString());
    py.on('close', async (code) => {
      fs.unlinkSync(tempScriptPath);
      if (code !== 0) return res.status(500).json({ error: "Extraction failed" });
      
      try {
        const result = JSON.parse(output);
        if (result.error) throw new Error(result.error);
        
        await addKnowledge({
          url,
          title: result.title,
          text: result.text
        });
        res.json({ success: true, title: result.title });
      } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to parse extraction result" });
      }
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleSearchKnowledge(req: Request, res: Response) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query required" });
  try {
    const results = await searchKnowledge(q as string);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
}
