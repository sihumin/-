import os
import json
import re

class JarvisCleaner:
    def __init__(self):
        self.raw_dir = 'data/raw'
        self.cleaned_dir = 'data/cleaned'
        self.final_dir = 'data/final'
        os.makedirs(self.cleaned_dir, exist_ok=True)
        os.makedirs(self.final_dir, exist_ok=True)

    def clean_text(self, text):
        # Remove emails
        text = re.sub(r'\S+@\S+', '', text)
        # Remove URLs (not perfectly, but enough for cleaning content)
        text = re.sub(r'http\S+', '', text)
        # Remove too many newlines
        text = re.sub(r'\n+', '\n', text)
        # Remove broken chars (minimal)
        text = text.encode('utf-8', 'ignore').decode('utf-8')
        return text.strip()

    def judge_quality(self, text):
        # Rule-based quality scoring
        score = 0
        
        # Length check
        if len(text) > 200:
            score += 40
        elif len(text) > 50:
            score += 20
        
        # Sentence structure (check for basic punctuation)
        if re.search(r'[.!?]', text):
            score += 30
            
        # Diversity check (count unique characters / total characters)
        if len(text) > 0:
            unique_chars = len(set(text))
            diversity = unique_chars / len(text)
            if 0.05 < diversity < 0.5: # Realistic range for natural language
                score += 30
        
        return score

    def process(self):
        if not os.path.exists(self.raw_dir) or not os.listdir(self.raw_dir):
            print(f"❌ No raw data found in {self.raw_dir}. Run crawler.py first.")
            return

        final_data = []
        for filename in os.listdir(self.raw_dir):
            if filename.endswith('.jsonl'):
                with open(os.path.join(self.raw_dir, filename), 'r', encoding='utf-8') as f:
                    for line in f:
                        if not line.strip(): continue
                        try:
                            data = json.loads(line)
                            cleaned = self.clean_text(data['text'])
                            
                            # Split into segments (e.g. paragraphs)
                            segments = cleaned.split('\n')
                            for seg in segments:
                                if len(seg) < 50: continue
                                
                                score = self.judge_quality(seg)
                                usable = score >= 70
                                
                                if usable:
                                    final_data.append({
                                        "text": seg,
                                        "score": score,
                                        "usable": True
                                    })
                        except Exception as e:
                            print(f"⚠️ Skipping malformed line in {filename}: {e}")

        if not final_data:
            print("❌ No high-quality data found after cleaning. Try crawling more diverse sources.")
            return

        # Save result
        with open(os.path.join(self.final_dir, 'cleaned_dataset.jsonl'), 'w', encoding='utf-8') as f:
            for item in final_data:
                json.dump(item, f, ensure_ascii=False)
                f.write('\n')
        
        print(f"✅ Processed {len(final_data)} high-quality segments. Saved to {self.final_dir}/cleaned_dataset.jsonl")

if __name__ == "__main__":
    cleaner = JarvisCleaner()
    # Dummy creation for first run if no raw data exists
    os.makedirs('data/raw', exist_ok=True)
    if not os.listdir('data/raw'):
        with open('data/raw/init.jsonl', 'w') as f:
             json.dump({"url": "local", "text": "This is a placeholder for local data collection.\nJarvis should learn from high quality local sources."}, f)
             f.write('\n')
             
    cleaner.process()
