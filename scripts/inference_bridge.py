import sys
import json
import torch
from transformers import GPT2LMHeadModel, GPT2TokenizerFast

def generate():
    if len(sys.argv) < 2:
        return
    
    prompt = sys.argv[1]
    model_path = "model/final"
    
    try:
        tokenizer = GPT2TokenizerFast.from_pretrained("model/tokenizer")
        model = GPT2LMHeadModel.from_pretrained(model_path)
        
        inputs = tokenizer.encode(prompt, return_tensors='pt')
        
        # Hyperparameters for generation
        outputs = model.generate(
            inputs, 
            max_length=150, 
            num_return_sequences=1, 
            temperature=0.7, 
            top_p=0.9,
            repetition_penalty=1.2,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )
        
        text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        # Remove prompt from result
        if text.startswith(prompt):
            text = text[len(prompt):].strip()
            
        print(json.dumps({"text": text, "model_name": "local-gpt-v1"}))
    except Exception as e:
        # If model not ready, printed message acts as the text
        print(json.dumps({"text": f"Error: {str(e)}", "model_name": "none"}))

if __name__ == "__main__":
    generate()
