<template>
  <div class="page-content">
    <div class="section-header">
      <div class="section-title">Frequently Asked Questions (FAQ)</div>
      <p class="section-subtitle">Here are answers to the most common questions about using Fugazzi.</p>
    </div>

    <section class="faq-card">
      <h2><font-awesome-icon :icon="['fas', 'question-circle']" /> What is Fugazzi?</h2>
      <p>Fugazzi is an AI-powered platform designed to help users verify the authenticity of news articles, images, and URLs. It provides tools to analyze content for potential misinformation or manipulation.</p>
    </section>

    <section class="faq-card">
      <h2><font-awesome-icon :icon="['fas', 'newspaper']" /> How does the News Analysis tool work?</h2>
      <p>The News Analysis tool uses advanced natural language processing algorithms to evaluate the text of news articles. It checks for inconsistencies, biased language, and cross-references with credible sources to determine reliability.</p>
    </section>

    <section class="faq-card">
      <h2><font-awesome-icon :icon="['fas', 'gift']" /> Can I use Fugazzi for free?</h2>
      <p>Yes, Fugazzi offers a free tier that allows users to access basic features. For advanced tools and higher limits, we provide premium subscription plans.</p>
    </section>

    <section class="faq-card">
      <h2><font-awesome-icon :icon="['fas', 'lock']" /> Is my data secure on Fugazzi?</h2>
      <p>We take data security seriously. Fugazzi employs industry-standard security measures to protect user data and ensure privacy. We never share your information with third parties without your consent.</p>
    </section>

    <section class="faq-card">
      <h2><font-awesome-icon :icon="['fas', 'headset']" /> How can I contact support?</h2>
      <p>If you have questions or need assistance, reach out via our <router-link to="/contact">Contact Us</router-link> page or email us directly.</p>
      <div class="actions">
        <router-link to="/contact" class="btn">Contact Support</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faNewspaper, faGift, faLock, faHeadset } from '@fortawesome/free-solid-svg-icons'

library.add(faQuestionCircle, faNewspaper, faGift, faLock, faHeadset)

export default {
  name: "FAQ",
  components: { FontAwesomeIcon }
}
</script>

<style scoped>
.tagline {
  font-size: 1rem;
  color: var(--text-muted);
  margin-top: 6px;
}

.faq-card {
  background: var(--widget-bg);
  border: 1px solid var(--widget-border);
  padding: 20px 24px;
  border-radius: 12px;
  margin-bottom: 22px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.faq-card h2 {
  font-size: 1.2rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.actions {
  margin-top: 12px;
}
.btn {
  padding: 8px 14px;
  border-radius: 8px;
  background: var(--btn-bg);
  color: var(--btn-text);
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}
.btn:hover {
  background: var(--btn-hover-bg);
}
</style>
