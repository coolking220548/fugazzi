<template>
  <div class="page-content">
    <div class="section-header">
      <div class="section-title">URL Authentication</div>
      <div class="section-subtitle">
        Check if a website link is safe, suspicious, or potentially a phishing site.
      </div>
    </div>

    <div class="analyzer-layout">
      <div class="analyzer-card">
        <!-- Input + Button -->
        <div class="input-row">
          <input 
            type="text" 
            v-model="url" 
            placeholder="Paste URL here..."
            class="url-input"
          />
          <button 
            class="analyze-btn" 
            @click="analyzeURL" 
            :disabled="loading || !url.trim()"
          >
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? 'Analyzing...' : 'Analyze URL' }}
          </button>
        </div>

        <!-- Example Links -->
        <div class="examples">
          <p class="examples-title">Try an example:</p>
          <div class="example-links">
            <span @click="setExample('https://www.thenational.com.pg')" class="example">www.thenational.com.pg</span>
            <span @click="setExample('https://www.facebook-login-secure.xyz')" class="example">facebook-login-secure.xyz</span>
            <span @click="setExample('https://www.emtv.com.pg')" class="example">www.emtv.com.pg</span>
            <span @click="setExample('http://paypall-support.com')" class="example">paypall-support.com</span>
          </div>
        </div>

        <!-- Result -->
        <div v-if="classification" class="analyze-result">
          <div :class="['result-label', classification.toLowerCase()]">
            <strong>{{ classification }}</strong>
          </div>
        </div>
      </div>

      <div class="how-it-works-card">
        <div class="how-title">How it works</div>
        <ul class="how-list">
          <li>
            <span class="how-icon safe"></span>
            <span>Paste a website URL and click <b>Analyze URL</b>.</span>
          </li>
          <li>
            <span class="how-icon suspicious"></span>
            <span>The system checks for known phishing patterns, suspicious domains, and safety signals.</span>
          </li>
          <li>
            <span class="how-icon phishing"></span>
            <span>You'll get a result: <b>Safe</b>, <b>Suspicious</b>, or <b>Phishing</b>.<br>
            <small>Phishing means the site is likely trying to steal your info.</small></span>
          </li>
        </ul>
        <div class="how-footer">
          <span class="info-text">We use AI and threat intelligence to classify URLs. Always double-check before entering sensitive info.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
export default {
  name: "URLAnalyzer",
  data() {
    return {
      url: "",
      loading: false,
      classification: "",
    };
  },
  methods: {
    async analyzeURL() {
      if (!this.url.trim()) return;
      this.loading = true;
      this.classification = "";

      try {
        const response = await api.post("/api/urlAnalyze", { url: this.url });
        this.classification = response.data.classification?.result || "No result available";
        
        console.log("Classification:", this.classification);
      } catch (error) {
        this.classification = "Error analyzing URL";
        console.error("Error during URL analysis:", error);
      } finally {
        this.loading = false;
      }
    },
    setExample(example) {
      this.url = example;
    },
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

.input-row {
  display: flex;
  gap: 12px;
  align-items: center;
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
}
.analyze-btn:hover {
  background: var(--login-button-hover-bg, linear-gradient(90deg, #3766c9 60%, #00b3b3 100%));
}
.analyze-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
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

/* Results */
.analyze-result {
  margin-top: 10px;
}
.result-label {
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  font-size: 1.08rem;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(44,120,255,0.08);
}
.result-label.safe {
  background: rgba(0, 230, 168, 0.15);
  color: #00e6a8;
  border: 1.5px solid #00e6a8;
}
.result-label.phishing {
  background: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
  border: 1.5px solid #ff6b6b;
}
.result-label.suspicious {
  background: rgba(255, 215, 0, 0.15);
  color: #ffd700;
  border: 1.5px solid #ffd700;
}

/* How it works section */
.how-it-works-card {
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
.how-icon.safe {
  background: linear-gradient(90deg, #00e6a8 60%, #00b37f 100%);
}
.how-icon.suspicious {
  background: linear-gradient(90deg, #ffd700 60%, #e6c200 100%);
}
.how-icon.phishing {
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
  .analyzer-card, .how-it-works-card {
    max-width: 100%;
    min-width: 0;
  }
}
</style>
