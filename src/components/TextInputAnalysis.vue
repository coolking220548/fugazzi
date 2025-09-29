<template>
  <div class="analyzer-layout">
    <section class="analyzer-card manual-analyzer">
      <h3 class="card-title">Manual Text Analyzer</h3>
      <textarea
        placeholder="Paste news text here..."
        v-model="text"
        :disabled="loading"
        class="text-input"
      ></textarea>
      <button
        class="analyze-btn"
        @click="analyzeText"
        :disabled="loading || !text.trim()"
      >
        {{ loading ? 'Analyzing...' : 'Analyze' }}
      </button>
      <analyze-result :explanation="explanation" :source="source"/>

      <!-- Example Section -->
      <section class="example-results">
        <h4>Example Texts</h4>
        <div 
          class="example-card" 
          v-for="(example, idx) in examples" 
          :key="idx"
          @click="loadExample(example.text)"
        >
          <p>{{ example.text }}</p>
        </div>
      </section>
    </section>

    <section class="how-to-use-card">
      <div class="how-title">How to-use</div>
      <ul class="how-list">
        <li>
          <span class="how-icon real"></span>
          <span>Paste news text and click <b>Analyze</b>.</span>
        </li>
        <li>
          <span class="how-icon suspicious"></span>
          <span>AI checks for fake news, misinformation, and credibility.</span>
        </li>
        <li>
          <span class="how-icon fake"></span>
          <span>Get a verdict and explanation.<br>
            <small>Sources are shown for verified news.</small>
          </span>
        </li>
      </ul>
      <div class="how-footer">
        <span class="info-text">We use AI and fact-checking to analyze news text. Always verify before sharing.</span>
      </div>
    </section>
  </div>
</template>

<script scoped>
import api from "@/api.js";

export default {
  name: 'TextInputAnalysis',
  data() {
    return {
      text: '',
      explanation: '',
      source: '',
      loading: false,
      examples: [
        { text: 'James Marape died' },
        { text: 'The PNG government will ban all mobile phones starting next month.' },
        { text: 'PNG hosted the 2025 Pacific Games preparation meetings in Port Moresby.' },
        { text: 'PNG will increase the minimum wage to K5 next year' },
      ],
    };
  },
  methods: {
    loadExample(exampleText) {
      this.text = exampleText;
    },
    async analyzeText() {
      if (!this.text.trim()) return;
      this.loading = true;
      this.explanation = '';
      this.source = '';

      try {
        const response = await api.post("/api/newsAnalyze", {
          text: this.text,
        });

        const data = response.data;
        this.explanation = data.prediction?.explanation || 'No explanation provided';
        if (!this.explanation.includes("False")) {
          this.source = data.prediction?.sources;
        }
      } catch (error) {
        console.error('Error analyzing text:', error);
        this.explanation = error.message || 'Could not analyze the text. Please try again later.';
      } finally {
        this.loading = false;
      }
    }
  },
};
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

.text-input {
  width: 100%;
  min-height: 70px;
  background: var(--login-input-bg, #181c24);
  color: var(--login-input-text, #e0e6f6);
  border: 1.5px solid var(--login-input-border, #444b5a);
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  margin-bottom: 12px;
  resize: vertical;
  transition: border 0.2s, background 0.2s;
}
.text-input:focus {
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
  margin-bottom: 10px;
  box-shadow: var(--signin-shadow, 0 4px 12px rgba(0,0,0,0.15));
}
.analyze-btn:hover:not(:disabled) {
  background: var(--login-button-hover-bg, linear-gradient(90deg, #3766c9 60%, #00b3b3 100%));
}
.analyze-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.example-results {
  margin-top: 24px;
}
.example-results h4 {
  margin-bottom: 10px;
  color: var(--muted-text, #b6c8f6);
  text-align: left;
  font-size: 1rem;
}
.example-card {
  background: var(--card-color, rgba(30,34,54,0.9));
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-size: 0.97rem;
}
.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44,120,255,0.15);
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
