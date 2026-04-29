import os
import time
import json
import urllib.request
import re
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse, urljoin

class JarvisCrawler:
    def __init__(self, config_path):
        # Custom simple yaml loader to avoid dependency
        self.allowed_domains = []
        try:
            with open(config_path, 'r') as f:
                for line in f:
                    if '-' in line:
                        domain = line.split('-')[-1].strip()
                        if domain: self.allowed_domains.append(domain)
        except:
            self.allowed_domains = ["wikipedia.org", "mozilla.org", "python.org"]
        
        self.visited_urls = set()
        self.raw_data_dir = 'data/raw'
        os.makedirs(self.raw_data_dir, exist_ok=True)

    def is_allowed_by_robots(self, url):
        parsed = urlparse(url)
        robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
        rp = RobotFileParser()
        try:
            rp.set_url(robots_url)
            rp.read()
            return rp.can_fetch('*', url)
        except:
            return True

    def extract_content(self, html):
        # Fallback to regex if bs4 is missing
        text = re.sub(r'<(script|style|nav|footer|header|aside).*?</\1>', '', html, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<[^>]+>', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def crawl(self, start_url, max_depth=2):
        if start_url in self.visited_urls or max_depth < 0:
            return
        
        parsed_url = urlparse(start_url)
        domain = parsed_url.netloc
        
        is_allowed = False
        for allowed in self.allowed_domains:
            if domain == allowed or domain.endswith('.' + allowed):
                is_allowed = True
                break
        
        if not is_allowed:
            return

        if not self.is_allowed_by_robots(start_url):
            return

        print(f"🕷️ Crawling: {start_url}")
        self.visited_urls.add(start_url)
        time.sleep(2.0)

        try:
            req = urllib.request.Request(start_url, headers={'User-Agent': 'JarvisPrivateCrawler/1.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    html = response.read().decode('utf-8', errors='ignore')
                    text = self.extract_content(html)
                    
                    if len(text) > 100:
                        filename = f"crawl_{int(time.time())}_{len(self.visited_urls)}.jsonl"
                        with open(os.path.join(self.raw_data_dir, filename), 'w', encoding='utf-8') as f:
                            json.dump({"url": start_url, "text": text}, f, ensure_ascii=False)
                            f.write('\n')

                    if max_depth > 0:
                        links = re.findall(r'href=["\'](https?://[^"\']+)["\']', html)
                        for link in links:
                            full_url = urljoin(start_url, link).split('#')[0]
                            self.crawl(full_url, max_depth - 1)

        except Exception as e:
            print(f"Error crawling {start_url}: {e}")

if __name__ == "__main__":
    crawler = JarvisCrawler('configs/allowed_domains.yaml')
    # High reliability seeds
    start_urls = [
        "https://en.wikipedia.org/wiki/Main_Page",
        "https://developer.mozilla.org/en-US/docs/Web",
        "https://docs.python.org/3/tutorial/index.html"
    ]
    for url in start_urls:
        crawler.crawl(url, max_depth=1)
