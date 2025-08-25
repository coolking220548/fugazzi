<template>
    <section class="widget manual-analyzer">
          <h3>Image Analyzer</h3>
          <textarea placeholder="Paste image URL here..."></textarea>
          <button class="analyze-btn">Analyze</button>
          <div class="analyze-result">
            <div><strong>Classification:</strong></div>
            <div><strong>Explanation:</strong></div>
          </div>
        </section>
</template>

<style>
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
.manual-analyzer .analyze-btn:hover {
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