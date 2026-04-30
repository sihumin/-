import subprocess
import sys

def check():
    print("Python Version:", sys.version)
    modules = ["requests", "bs4", "yaml", "tokenizers", "transformers", "torch", "datasets"]
    for m in modules:
        try:
            __import__(m)
            print(f"✅ {m} is available")
        except ImportError:
            print(f"❌ {m} is missing")

if __name__ == "__main__":
    check()
