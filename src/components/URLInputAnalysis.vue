<template>
  <div class="analyzer-layout">
    <section class="analyzer-card manual-analyzer">
      <h3 class="card-title">URL Analyzer</h3>
      <div class="input-row">
        <input type="text" v-model="url" placeholder="Paste URL here..." class="url-input">
        <button class="analyze-btn" @click="analyzeURLNews" :disabled="loading || !url.trim()">
          {{ loading ? 'Analyzing...' : 'Analyze' }}
        </button>
      </div>
      <div class="analyze-result" v-if="article">
        <strong>Article Text Summary:</strong>
        <p>{{ article }}</p>
      </div>
      <analyze-result :explanation="explanation" :source="source"/>

      <!-- Example URLs -->
      <div class="examples">
        <p class="examples-title">Try an example:</p>
        <div class="example-links">
          <span class="example" @click="setExample('https://www.thenational.com.pg/seven-picked-for-pilot-cadet-programme/')">thenational.com.pg</span>
          <span class="example" @click="setExample('https://www.emtv.com.pg/news/2023/08/png-economy-update/')">emtv.com.pg</span>
          <span class="example" @click="setExample('https://www.fake-news-site.com/story/123')">fake-news-site.com</span>
        </div>
      </div>
    </section>

    <section class="how-to-use-card">
      <div class="how-title">How to-use</div>
      <ul class="how-list">
        <li>
          <span class="how-icon real"></span>
          <span>Paste a news URL and click <b>Analyze</b>.</span>
        </li>
        <li>
          <span class="how-icon suspicious"></span>
          <span>AI scrapes the article and checks for credibility and misinformation.</span>
        </li>
        <li>
          <span class="how-icon fake"></span>
          <span>Get a summary and verdict.<br>
            <small>Sources are shown for verified news.</small>
          </span>
        </li>
      </ul>
      <div class="how-footer">
        <span class="info-text">We use AI and fact-checking to analyze news URLs. Always verify before sharing.</span>
      </div>
    </section>
  </div>
</template>

<script scoped>
import api from '@/api';

export default {
  name: 'URLInputAnalysis',
  data() {
    return {
        url: '',
        article: '',
        explanation: '',
        source: '',
        loading: false,
    };
  },
  methods: {
    setExample(exampleUrl) {
      this.url = exampleUrl;
    },
    async analyzeURLNews() {
      if (!this.url.trim()) return;

      this.loading = true;
      this.article = '';
      this.explanation = '';
      this.source = '';

      try {
        const scrapeResponse = await api.post('/api/newsScrape', { url: this.url });
        this.article = scrapeResponse.data.articleText?.text || '';

        if (!this.article || this.article.includes("No text found")){
          this.article = "Could not fetch article"
          throw new Error ('Scraping failed');
        }

        const analyzeResponse = await api.post('/api/newsAnalyze', { text: this.article });
        const analyzedData = analyzeResponse.data;

        this.explanation = analyzedData.prediction?.explanation || 'No explanation provided';
        this.source = analyzedData.prediction?.sources || null;

        console.log('Analysis result:', this.explanation);
      } catch (error) {
        console.error('Error analyzing URL:', error);
        this.explanation = error.message || 'Could not analyze the article. Please try again later.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.analyzer-layout {
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 980px;
}

.analyzer-card {
  background: var(--widget-bg, #23293a);
  border: 1.5px solid var(--card-color, #2f3547);
  border-radius: 16px;
  padding: 32px 28px;
  min-width: 340px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: var(--widget-shadow, 0 2px 12px rgba(44,120,255,0.08));
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--sidebar-link-active-text, #4f8cff);
  letter-spacing: 0.5px;
}

.input-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 0;
}

.url-input {
  flex: 1;
  background: var(--login-input-bg, #181c24);
  color: var(--login-input-text, #e0e6f6);
  border: 1.5px solid var(--login-input-border, #444b5a);
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  transition: border 0.2s, background 0.2s;
}
.url-input:focus {
  background: var(--login-input-focus-bg, #23293a);
  border-color: var(--login-input-focus-border, #4f8cff);
  outline: none;
  box-shadow: 0 0 0 2px var(--login-input-focus-shadow, rgba(79,140,255,0.33));
}

.analyze-btn {
  background: var(--login-button-bg, linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%));
  color: var(--login-button-text, #fff);
  border: none;
  border-radius: 8px;
  padding: 12px 22px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: var(--signin-shadow, 0 4px 12px rgba(0,0,0,0.15));
  margin-top: 0;
}
.analyze-btn:hover {
  background: var(--login-button-hover-bg, linear-gradient(90deg, #3766c9 60%, #00b3b3 100%));
}
.analyze-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.analyze-result {
  margin-top: 10px;
}

/* Examples */
.examples-title {
  font-size: 0.95rem;
  margin-bottom: 6px;
  color: var(--muted-text, #b6c8f6);
}
.example-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.example {
  background: var(--card-color, #2a3042);
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  color: var(--sidebar-link, #e0e6f6);
  transition: background 0.2s;
  font-weight: 500;
}
.example:hover {
  background: var(--sidebar-link-hover-bg, #3a4158);
}

/* How to-use section */
.how-to-use-card {
  background: var(--card-color, #23293a);
  border: 1.5px solid var(--card-color, #2f3547);
  border-radius: 16px;
  padding: 32px 28px;
  min-width: 320px;
  max-width: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: var(--widget-shadow, 0 2px 12px rgba(44,120,255,0.08));
  align-self: flex-start;
}

.how-title {
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--sidebar-link-active-text, #4f8cff);
  letter-spacing: 0.5px;
}

.how-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.how-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 1rem;
  color: var(--text-color);
}
.how-icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: inline-block;
  margin-top: 2px;
}
.how-icon.real {
  background: linear-gradient(90deg, #00e6a8 60%, #00b37f 100%);
}
.how-icon.suspicious {
  background: linear-gradient(90deg, #ffd700 60%, #e6c200 100%);
}
.how-icon.fake {
  background: linear-gradient(90deg, #ff6b6b 60%, #d93a3a 100%);
}

.how-footer {
  margin-top: 18px;
  font-size: 0.97rem;
  color: var(--muted-text, #b6c8f6);
  background: rgba(44,120,255,0.04);
  border-radius: 8px;
  padding: 10px 14px;
  text-align: left;
}

.info-text {
  font-size: 0.97rem;
  color: var(--muted-text, #b6c8f6);
}

/* Responsive */
@media (max-width: 900px) {
  .analyzer-layout {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
  }
  .analyzer-card, .how-to-use-card {
    max-width: 100%;
    min-width: 0;
  }
}
</style>