<template>
  <div class="page-content">
    <div class="section-header">
      <div class="section-title">Image Verification & Deepfake Detection</div>
      <div class="section-subtitle">
        Upload your screenshots, photos, or news images to instantly check their authenticity.
        Our AI detects manipulations, deepfakes, and misleading visuals.
      </div>
    </div>

    <div class="analyzer-layout">
      <div class="analyzer-card">
        <!-- Compact Steps -->
        <div class="steps-section">
          <div class="step">
            <span class="step-icon">1</span>
            <span class="step-text">Upload your image</span>
          </div>
          <div class="step">
            <span class="step-icon">2</span>
            <span class="step-text">AI scans for deepfakes & edits</span>
          </div>
          <div class="step">
            <span class="step-icon">3</span>
            <span class="step-text">Get a verdict & tips</span>
          </div>
        </div>

        <!-- Upload UI -->
        <div class="input-row">
          <label class="upload-label" for="image-file">
            <FontAwesomeIcon :icon="byPrefixAndName.fas['cloud-arrow-up']" class="upload-icon"/>
            <span>{{ previewImage ? 'Change Image' : 'Upload Image' }}</span>
            <input type="file" id="image-file" accept="image/*" hidden @change="handleFileChange">
          </label>
          <button v-if="previewImage" class="remove-btn" @click="removeImage">Remove</button>
        </div>

        <!-- Preview -->
        <div v-if="previewImage" class="preview-area">
          <img :src="previewImage" alt="Preview">
        </div>

        <!-- Analyze Button -->
        <button
          class="analyze-btn"
          :disabled="loading || !previewImage"
          @click="analyzeImage"
        >
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? 'Analyzing...' : 'Analyze Image' }}
        </button>

        <!-- Result -->
        <transition name="fade-slide" mode="out-in">
          <div v-if="analysisResult" ref="analysis" class="analyze-result">
            <div :class="{'fake-label': analysisResult==='Fake','real-label':analysisResult==='Real'}">
              <strong>{{ analysisResult }}</strong>
            </div>
          </div>
        </transition>

        <!-- Examples -->
        <div class="examples">
          <p class="examples-title">Try with sample images:</p>
          <div class="example-links">
            <span class="example" @click="setExample('https://images.unsplash.com/photo-1506744038136-46273834b3fb')">Nature</span>
            <span class="example" @click="setExample('https://images.unsplash.com/photo-1519125323398-675f0ddb6308')">Portrait</span>
            <span class="example" @click="setExample('https://images.unsplash.com/photo-1465101046530-73398c7f28ca')">News</span>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="how-it-works-card">
        <div class="how-title">How it works</div>
        <ul class="how-list">
          <li>
            <span class="how-icon real"></span>
            <span>Upload an image and click <b>Analyze Image</b>.</span>
          </li>
          <li>
            <span class="how-icon suspicious"></span>
            <span>AI checks for deepfake patterns, metadata, and edits.</span>
          </li>
          <li>
            <span class="how-icon fake"></span>
            <span>Get a verdict: <b>Real</b> or <b>Fake</b>.<br>
              <small>Fake means the image is likely manipulated or AI-generated.</small>
            </span>
          </li>
        </ul>
        <div class="how-footer">
          <span class="info-text">We use AI and forensic analysis to classify images. Always verify before sharing sensitive visuals.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'ImageAnalyzer',
  components: { FontAwesomeIcon },
  data() {
    return {
      byPrefixAndName: { fas: { 'cloud-arrow-up': faCloudArrowUp } },
      isDragging: false,
      previewImage: null,
      imageFile: null,
      loading: false,
      analysisResult: null
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.readFile(file);
      this.imageFile = file;
    },
    setExample(url) {
      this.previewImage = url;
      this.imageFile = null;
      this.analysisResult = null;
    },
    readFile(file) {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => { this.previewImage = e.target.result; };
        reader.readAsDataURL(file);
      }
    },
    removeImage() {
      this.previewImage = null;
      this.imageFile = null;
      this.analysisResult = null;
    },
    async analyzeImage() {
      if (!this.previewImage) return;
      this.loading = true;
      this.analysisResult = null;

      try {
        let response, data;
        if (this.imageFile) {
          const formData = new FormData();
          formData.append('image', this.imageFile);
          const response = await api.post('/api/imageAnalyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          });
          responseData = response.data;

        } else {
          const response = await api.post('/api/imageAnalyzeUrl', { url: this.previewImage });
          responseData = response.data;
        }
        this.analysisResult = responseData.classification?.result || responseData.prediction?.explanation || 'No result available';

        this.$nextTick(() => {
          if (this.$refs.analysis) this.$refs.analysis.scrollIntoView({ behavior: 'smooth' });
        });
      } catch (error) {
        this.analysisResult = "Error analyzing image";
        console.error("Error during image analysis:", error);
      } finally {
        this.loading = false;
      }
    }
  }
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
  padding: 28px 22px;
  min-width: 340px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: var(--widget-shadow, 0 2px 12px rgba(44,120,255,0.08));
}

.steps-section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
}
.step-icon {
  background: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  font-size: 1rem;
}
.step-text {
  font-size: 0.97rem;
  color: var(--muted-text, #b6c8f6);
  text-align: center;
}

.input-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 0;
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--login-input-bg, #181c24);
  color: var(--login-input-text, #e0e6f6);
  border: 1.5px solid var(--login-input-border, #444b5a);
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  font-weight: 500;
}
.upload-label:hover {
  background: var(--login-input-focus-bg, #23293a);
  border-color: var(--login-input-focus-border, #4f8cff);
}
.upload-icon {
  font-size: 1.3rem;
  color: var(--upload-dashed, #ffd966);
}

.remove-btn {
  background: var(--fake-label, #ff6b6b);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.remove-btn:hover {
  background: #d93a3a;
}

.preview-area {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}
.preview-area img {
  max-width: 100%;
  max-height: 220px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(44,120,255,0.08);
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

/* Result */
.analyze-result {
  margin-top: 10px;
}
.fake-label {
  background: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
  border: 1.5px solid #ff6b6b;
  border-radius: 8px;
  padding: 12px;
  font-weight: bold;
  text-align: center;
  font-size: 1.08rem;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(44,120,255,0.08);
}
.real-label {
  background: rgba(0, 230, 168, 0.15);
  color: #00e6a8;
  border: 1.5px solid #00e6a8;
  border-radius: 8px;
  padding: 12px;
  font-weight: bold;
  text-align: center;
  font-size: 1.08rem;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(44,120,255,0.08);
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

/* How it works section */
.how-it-works-card {
  background: var(--card-color, #23293a);
  border: 1.5px solid var(--card-color, #2f3547);
  border-radius: 16px;
  padding: 28px 22px;
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
  .analyzer-card, .how-it-works-card {
    max-width: 100%;
    min-width: 0;
  }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.35s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
