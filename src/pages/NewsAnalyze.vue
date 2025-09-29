<template>
      <div class="page-content">
        <div class="section-header">
          <div class="section-title">Analyze News in Any Form</div>
          <div class="section-subtitle">
            Whether it's a story, a photo, or a link, our tools help you quickly check what's
            real and avoid misinformation.
          </div>
        </div>

        <div class="options-container">
          <div class="option-card" @click="select('text')">
            <FontAwesomeIcon :icon="byPrefixAndName.fas['font']" class="option-icon"/>
            <h3>Text Analysis</h3>
            <p>Paste or type the news text and let AI analyze its credibility.</p>
          </div>

          <div class="option-card" @click="select('image')">
            <FontAwesomeIcon :icon="byPrefixAndName.far['image']" class="option-icon"/>
            <h3>Image Analysis</h3>
            <p>Upload screenshots or photos of news and check for signs of manipulation.</p>
          </div>

          <div class="option-card" @click="select('url')">
            <FontAwesomeIcon :icon="byPrefixAndName.fas['link']" class="option-icon"/>
            <h3>URL Analysis</h3>
            <p>Enter a link to a news article or social media post to detect fake sources.</p>
          </div>
        </div>

        <div class="section-header">
          <div class="section-title">How It Works</div>
          <div class="section-subtitle">
            Each option uses AI models and credibility checks to detect signs of 
            misinformation. Choose the format that matches your news and get results in seconds.
          </div>
        </div>

        <!-- Analyzer Section (appears when selected) -->
        <div v-if="selected" ref="analysis" class="analysis-section">
          <h3 class="analysis-header">Now let's analyze your news</h3>

          <!-- transition + key so the animation triggers reliably -->
          <transition name="fade-slide" mode="out-in">
            <!-- key is required so Vue knows to replace the component -->
            <component :is="selectedComponent" :key="selected" />
          </transition>
        </div>
      </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faFont, faLink } from '@fortawesome/free-solid-svg-icons';

import TextInputAnalysis from '../components/TextInputAnalysis.vue';
import ImageInputAnalysis from '../components/ImageInputAnalysis.vue';
import URLInputAnalysis from '../components/URLInputAnalysis.vue';

export default {
  name: 'NewsAnalyze',
  components: {
    FontAwesomeIcon,
    TextInputAnalysis,
    ImageInputAnalysis,
    URLInputAnalysis
  },
  data() {
    return {
      selected: null,
      byPrefixAndName: {
        fas: { font: faFont, link: faLink },
        far: { image: faImage }
      }
    };
  },
  computed: {
    selectedComponent() {
      return this.selected === 'text' ? TextInputAnalysis
        : this.selected === 'image' ? ImageInputAnalysis
        : this.selected === 'url' ? URLInputAnalysis
        : null;
    }
  },
  methods: {
    select(name) {
      this.selected = (this.selected === name) ? null : name;
    }
  },
  watch: {
    selected(newVal) {
      if (!newVal) return;
      this.$nextTick(() => {
        const el = this.$refs.analysis;
        if (!el) return;
        const headerOffset = 80;
        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const scrollTo = Math.max(absoluteTop - headerOffset, 0);
        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
      });
    }
  }
};
</script>

<style>
:root[data-theme="dark"] {
  /* Text */
  --textarea-bg: #181c24;
  --textarea-text: #e0e6f6;
  --textarea-border: #444b5a;
  --btn-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --btn-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --btn-text: #ffffff;

  /* Image */
  --image-form-gap: 20px;
  --upload-bg: rgba(30, 34, 54, 0.85);
  --upload-border: rgba(79,140,255,0.18);
  --upload-shadow: 0 6px 32px rgba(44,120,255,0.10), 0 2px 8px rgba(0,0,0,0.18);
  --img-view-bg: rgba(30,34,54,0.9);
  --img-view-border: #FFF9AF;
  --img-view-text: #e0e6f6;
  --img-view-highlight: #FFF9AF;
  --btn-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --btn-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --btn-text: #ffffff;

  /* URL */
  --input-bg: #181c24;
  --input-text: #e0e6f6;
  --input-border: #444b5a;
  --btn-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --btn-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --btn-text: #ffffff;
}

:root[data-theme="light"] {
  /* Text */
  --textarea-bg: #ffffff;
  --textarea-text: #222222;
  --textarea-border: #cccccc;
  --btn-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --btn-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --btn-text: #ffffff;

  /* Image */
  --image-form-gap: 20px;
  --upload-bg: #f4f6fb;
  --upload-border: #4f8cff33;
  --upload-shadow: 0 6px 32px rgba(79,140,255,0.1), 0 2px 8px rgba(0,0,0,0.08);
  --img-view-bg: #ffffff;
  --img-view-border: #4f8cff;
  --img-view-text: #222222;
  --img-view-highlight: #4f8cff;
  --btn-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --btn-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --btn-text: #ffffff;

  /* URL */
  --input-bg: #f4f6fb;
  --input-text: #222222;
  --input-border: #c4c9d9;
  --btn-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --btn-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --btn-text: #ffffff;
}


h3 {
  color: var(--news-h3);
  margin-bottom: 16px;
  text-align: center;
}

p {
  color: var(--news-p);
  margin-bottom: 32px;
}

.options-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.option-card {
  flex: 1;
  max-width: 300px;
  background: var(--option-bg);
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  padding: 32px 24px;
  margin-bottom: 16px;
  color: var(--option-text);
  text-align: center;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.option-card h3 {
  color: var(--option-title);
  margin-bottom: 10px;
}

.option-card p {
  color: var(--option-desc);
  font-size: 15px;
  line-height: 1.4;
}

.option-card:hover {
  background: var(--option-hover-bg);
  transform: translateY(-6px);
  box-shadow: var(--option-hover-shadow);
}

.option-icon {
  font-size: 48px;
  margin-bottom: 12px;
  color: var(--option-icon);
  transition: color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease;
}

.option-card:hover .option-icon {
  color: var(--option-icon-hover);
  text-shadow: var(--option-icon-shadow);
  transform: scale(1.1);
}

.analysis-section {
  background: var(--analysis-bg);
  border-radius: 14px;
  padding: 24px;
  margin-top: 24px;
  box-shadow: var(--card-shadow);
}

.analysis-header {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--analysis-text);
  text-align: center;
  margin-bottom: 18px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
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

.analyze-result {
  margin-top: 10px;
  background: var(--result-bg);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--result-text);
  font-size: 1rem;
}

.result-true {
  background: var(--result-true-bg);
  border: 2px solid var(--result-true-border);
  color: var(--result-true-text);
  box-shadow: 0 0 10px var(--result-true-shadow);
}

.result-false {
  background: var(--result-false-bg);
  border: 2px solid var(--result-false-border);
  color: var(--result-false-text);
  box-shadow: 0 0 10px var(--result-false-shadow);
  animation: shake 0.3s ease-in-out;
}

.result-unsure {
  background: var(--result-unsure-bg);
  border: 2px solid var(--result-unsure-border);
  color: var(--result-unsure-text);
  box-shadow: 0 0 10px var(--result-unsure-shadow);
}

.icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.source-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--source-bg);
  color: var(--source-text);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 6px var(--source-shadow);
}

.source-link:hover {
  background: var(--source-hover-bg);
  transform: translateY(-2px);
  box-shadow: 0 0 12px var(--source-shadow);
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}

</style>