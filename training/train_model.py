import os
import json
import torch
from transformers import GPT2Config, GPT2LMHeadModel, GPT2TokenizerFast, Trainer, TrainingArguments, DataCollatorForLanguageModeling
from datasets import Dataset

def train_model():
    dataset_path = "data/final/cleaned_dataset.jsonl"
    tokenizer_path = "model/tokenizer"
    
    if not os.path.exists(dataset_path):
        print("❌ Dataset not found at data/final/cleaned_dataset.jsonl. Run cleaner.py first.")
        return
    if not os.path.exists(tokenizer_path):
        print("❌ Tokenizer not found at model/tokenizer. Run train_tokenizer.py first.")
        return

    # Load tokenizer
    print("⏳ Loading tokenizer...")
    tokenizer = GPT2TokenizerFast.from_pretrained(tokenizer_path)
    tokenizer.add_special_tokens({'pad_token': '<pad>'})

    # Prepare dataset
    print("⏳ Loading dataset...")
    texts = []
    with open(dataset_path, "r", encoding="utf-8") as f:
        for line in f:
            texts.append(json.loads(line)["text"])
    
    if len(texts) < 10:
        print(f"⚠️ Warning: Dataset is very small ({len(texts)} samples). Training might not be effective.")
    
    dataset = Dataset.from_dict({"text": texts})

    def tokenize_function(examples):
        return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=256)

    tokenized_datasets = dataset.map(tokenize_function, batched=True, remove_columns=["text"])

    # Model Config (Small GPT-2 style model)
    print("⏳ Initializing model architecture...")
    
    # Tiny mode for verification if dataset is small
    if len(texts) < 50:
        print("💡 [Tiny Test Mode] Small dataset detected. Reducing model size for quick verification.")
        config = GPT2Config(
            vocab_size=len(tokenizer),
            n_positions=128,
            n_embd=128,
            n_layer=2,
            n_head=2,
        )
    else:
        config = GPT2Config(
            vocab_size=len(tokenizer),
            n_positions=256,
            n_embd=512,
            n_layer=6,
            n_head=8,
        )
    
    # Use CPU if no CUDA available
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"🚀 Using device: {device}")
    
    model = GPT2LMHeadModel(config).to(device)

    # Training Arguments
    training_args = TrainingArguments(
        output_dir="model/checkpoints",
        overwrite_output_dir=True,
        num_train_epochs=5,
        per_device_train_batch_size=4, # Reduced for stability on varied hardware
        save_steps=500,
        save_total_limit=1,
        prediction_loss_only=True,
        learning_rate=3e-4,
        logging_steps=10,
        no_cuda=not torch.cuda.is_available(),
    )

    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer, mlm=False,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        data_collator=data_collator,
        train_dataset=tokenized_datasets,
    )

    print("🏁 Starting training...")
    trainer.train()
    
    # Save final model
    os.makedirs("model/final", exist_ok=True)
    trainer.save_model("model/final")
    print(f"✅ Model training complete. Saved to model/final")

if __name__ == "__main__":
    train_model()
