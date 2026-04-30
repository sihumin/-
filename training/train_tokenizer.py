import os
from tokenizers import ByteLevelBPETokenizer
import json

def train_tokenizer():
    dataset_path = "data/final/cleaned_dataset.jsonl"
    if not os.path.exists(dataset_path):
        print("❌ Dataset not found at data/final/cleaned_dataset.jsonl. Run scripts/cleaner.py first.")
        return

    print("⏳ Preparing corpus for tokenizer training...")
    # Create dummy text file from jsonl for tokenizer training
    try:
        with open("temp_corpus.txt", "w", encoding="utf-8") as out:
            with open(dataset_path, "r", encoding="utf-8") as f:
                lines = f.readlines()
                if not lines:
                    print("❌ Dataset is empty. Cannot train tokenizer.")
                    return
                for line in lines:
                    data = json.loads(line)
                    out.write(data["text"] + "\n")

        print(f"⏳ Training BPE Tokenizer on {len(lines)} samples...")
        # Initialize a tokenizer
        tokenizer = ByteLevelBPETokenizer()

        # Customize training
        tokenizer.train(files=["temp_corpus.txt"], vocab_size=32000, min_frequency=2, special_tokens=[
            "<s>",
            "<pad>",
            "</s>",
            "<unk>",
            "<mask>",
        ])

        # Save files to disk
        os.makedirs("model/tokenizer", exist_ok=True)
        tokenizer.save_model("model/tokenizer")
        print("✅ Tokenizer trained and saved to model/tokenizer")
    finally:
        if os.path.exists("temp_corpus.txt"):
            os.remove("temp_corpus.txt")

if __name__ == "__main__":
    train_tokenizer()
