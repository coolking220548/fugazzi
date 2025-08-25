<template>
  <section class="manual-analyzer">
    <h3>Manual Text Analyzer</h3>
    <textarea
      placeholder="Paste news text here..."
      v-model="text"
      :disabled="loading"
    ></textarea>
    <button
      class="analyze-btn"
      @click="analyzeText"
      :disabled="loading || !text.trim()"
    >
      {{ loading ? 'Analyzing...' : 'Analyze' }}
    </button>
    <div class="analyze-result" v-if="classification || explanation">
      <div><strong>Classification:</strong> {{ classification }}</div>
      <div><strong>Explanation:</strong> {{ explanation }}</div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TextInputAnalysis',
  data() {
    return {
      text: '',
      classification: '',
      explanation: '',
      loading: false,
    };
  },
  methods: {
    async analyzeText() {
      if (!this.text.trim()) return;

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: this.text }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        this.classification = data.prediction.classification || 'Unknown';
        this.explanation = data.prediction?.explanation || 'No explanation provided';
      } catch (error) {
        console.error('Error analyzing text:', error);
        this.classification = 'Error';
        this.explanation = error.message || 'Could not analyze the text. Please try again later.';
      }
    }
  },
};
</script>

<style>
h3 {
  color: #e0e6f6;
  margin-bottom: 16px;
}
.manual-analyzer textarea {
  width: 100%;
  min-height: 70px;
  background: #181c24;
  color: #e0e6f6;
  border: 1.5px solid #444b5a;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 12px;
  resize: vertical;
}
.manual-analyzer .analyze-btn {
  background: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 10px;
}
.manual-analyzer .analyze-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.manual-analyzer .analyze-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
}
.analyze-result {
  margin-top: 10px;
  background: #23293a;
  border-radius: 8px;
  padding: 10px 14px;
  color: #e0e6f6;
  font-size: 1rem;
}
</style>
