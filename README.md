# Private Jarvis AI (Phase 1 & 2)

This is a private, local-first AI assistant. It does NOT use any external LLM APIs (No Gemini, OpenAI, or Claude).

## 🚀 Execution Guide

### 1. Installation
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies for Phase 2 (Optional but required for training)
pip install requests beautifulsoup4 pyyaml tokenizers transformers torch datasets
```

### 2. Development Server
```bash
npm run dev
```
The app runs at port 3000.

## 🧠 Phase 2: Local Training Pipeline

If you want to train your own local model instead of seeing the "model not loaded" message:

1. **Configure Domains**: Edit `configs/allowed_domains.yaml`.
2. **Crawl Data**:
   ```bash
   python3 scripts/crawler.py
   ```
3. **Clean & Judge Quality**:
   ```bash
   python3 scripts/cleaner.py
   ```
4. **Train Tokenizer**:
   ```bash
   python3 training/train_tokenizer.py
   ```
5. **Train Model**:
   ```bash
   python3 training/train_model.py
   ```

After training, the backend will automatically detect the weights in `model/final` and use them for chat.

### 🧪 Option: Training in Google Colab (Recommended)
If your local environment is slow, use the provided Colab Notebook:

1. **In Jarvis Dashboard**: Go to **Training** tab.
2. **Export Dataset**: Download `cleaned_dataset.jsonl` (Phase 1 result).
3. **Download Notebook**: Click "Download .ipynb" from the Training page.
4. **Open in Colab**: Upload both files to [Google Colab](https://colab.research.google.com/).
5. **Run All Cells**: The notebook will train the tokenizer and GPT-Tiny from scratch.
6. **Download Results**: Once finished, download `trained_model.zip`.
7. **Deploy**: Extract `trained_model.zip` into your local `/model/final/` folder.
8. **Restart**: Jarvis will automatically start using your new custom brain.

## 🔒 Privacy & Security

- **Real Local Inference**: The system uses a Python bridge to execute `transformers` locally.
- **Zero API Keys**: No `.env` secrets required for LLMs.
- **Air-gapped Ready**: Once dependencies are installed, it can run without internet.

## 📁 Project Structure

- `src/`: React frontend
- `backend/`: Node.js server with Python bridging
- `scripts/`: Crawler, Cleaner, and Inference Bridge
- `training/`: Tokenizer and GPT training scripts
- `data/`: Raw, Cleaned, and Final datasets (SQLite still used for chat memory)
- `model/`: Trained tokenizer and model weights

## ✅ Phase 3 Verification Results
- [x] **Memory System**: Implemented with type support (profile, preference, etc.)
- [x] **Auto Extraction**: Successfully extracts name/age/preferences from user input.
- [x] **Identity Guard**: Intercepts "Gemini/ChatGPT" questions and corrections.
- [x] **Prompt Construction**: Injecting retrieved memories into the local model prompt.
- [x] **UI Integration**: New dashboards for Memory, Dataset, and Training state.

## 🚀 Execution Guide

### 📂 Phase 1 & 2: Collection & Local Training
Since the online preview environment may have restricted access to Python ML libraries (`torch`, `transformers`), run the training pipeline locally:

1. **Install Python Deps**:
   ```bash
   pip install requests beautifulsoup4 pyyaml tokenizers transformers torch datasets
   ```
2. **Collect Data**:
   ```bash
   python3 scripts/crawler.py
   python3 scripts/cleaner.py
   ```
3. **Train Model**:
   ```bash
   python3 training/train_tokenizer.py
   python3 training/train_model.py
   ```
   _Note: The model supports CPU fallback if no GPU is available._

### 🧠 Phase 3: Personal Jarvis Active
Jarvis prioritizes your **directly trained model** (Phase 2 weights) as its primary decision engine.

- **Primary Model**: Custom GPT architecture trained on your local data (`model/final/pytorch_model.bin`).
- **Standard Behavior**: If no custom model is found, Jarvis will report "Local trained model is not available yet."
- **Fallback Mode**: A pretrained `distilgpt2` model (Transformers.js) can be enabled via **Training Dashboard** for testing/verification only.

#### Model Source Verification:
The **Training Dashboard** now displays the active intelligence source:
1. `user_trained_local`: Using your proprietary data.
2. `fallback_pretrained_test_model`: Using external generic weights (Testing only).
3. `none`: No local inference available.
