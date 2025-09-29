<template>
  <div class="page-content">
    <div class="section-header">
      <div class="section-title">About Fugazzi</div>
      <p class="section-subtitle">AI-powered tools to fight misinformation and empower truth.</p>
    </div>

    <section class="about-card">
      <h2><font-awesome-icon :icon="['fas', 'globe']" /> Our Mission</h2>
      <p>At Fugazzi, our mission is to combat misinformation and promote truth in the digital age. We believe everyone deserves access to accurate information, and we are dedicated to providing tools that empower users to verify the authenticity of news content.</p>
    </section>

    <section class="about-card">
      <h2><font-awesome-icon :icon="['fas', 'cogs']" /> What We Do</h2>
      <p>Fugazzi offers AI-powered tools to analyze and verify news articles, images, and URLs. Our platform detects misinformation, deepfakes, and manipulated content, helping users make informed decisions about the information they consume.</p>
    </section>

    <section class="about-card">
      <h2><font-awesome-icon :icon="['fas', 'users']" /> Our Team</h2>
      <ul class="team-list">
        <li>👨‍💻 Developer - AI & Software</li>
        <li>📰 Journalist - News Research</li>
        <li>🔍 Researcher - Fact-checking</li>
      </ul>
    </section>

    <section class="about-card">
      <h2><font-awesome-icon :icon="['fas', 'handshake']" /> Get Involved</h2>
      <p>Join us in promoting truth and accuracy online. Whether you're a concerned citizen, a journalist, or an organization, there are many ways to get involved.</p>
      <div class="actions">
        <router-link to="/contact" class="btn">Contact Us</router-link>
        <router-link to="/partners" class="btn secondary">Partner with Us</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faCogs, faUsers, faHandshake} from '@fortawesome/free-solid-svg-icons';

library.add(faGlobe, faCogs, faUsers, faHandshake); 

export default{
    components: {FontAwesomeIcon},

}

</script>

<style scoped>
.tagline {
  font-size: 1rem;
  color: var(--text-muted);
  margin-top: 6px;
}

.about-card {
  background: var(--widget-bg);
  border: 1px solid var(--card-border);
  padding: 20px 24px;
  border-radius: 12px;
  margin-bottom: 22px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.about-card h2 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.team-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.team-list li {
  margin-bottom: 6px;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 12px;
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
.btn.secondary {
  background: var(--status-hover-bg);
  color: var(--status-hover-text);
}
</style>
