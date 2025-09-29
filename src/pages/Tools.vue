<template>
            <div class="page-content">
                <!-- Page Intro -->
                <div class="section-header">
                    <div class="section-title">Stay Safe Online with AI-Powered Protection</div>
                    <div class="section-subtitle">
                        The internet is packed with information, but not everything you see is reliable.<br>
                        Our free tools let you check news, images, and links so you can stay informed
                        and steer clear of online risks.
                    </div>
                </div>

                <!-- Tools Section -->
                <div class="tools-section">
                    <router-link to="/newsanalyze" class="tools widget">
                        <FontAwesomeIcon :icon="byPrefixAndName.far['newspaper']" class="tool-icon"/>
                        <h2>News Analysis</h2>
                        <p>Check if an article is real or fake using our AI-powered analysis.</p>
                    </router-link>

                    <router-link to="/imageanalyze" class="tools widget">
                        <FontAwesomeIcon :icon="byPrefixAndName.far['image']" class="tool-icon"/>
                        <h2>Image Verification</h2>
                        <p>Detect photo manipulation or deepfakes in seconds.</p>
                    </router-link>

                    <router-link to="/urlanalyze" class="tools widget">
                        <FontAwesomeIcon :icon="byPrefixAndName.fas['at']" class="tool-icon"/>
                        <h2>URL Authentication</h2>
                        <p>Check if a link is safe before you click and avoid phishing scams.</p>
                    </router-link>
                </div>

                <!-- Why Use These Tools Section -->
                <div class="section-header">
                    <div class="section-title">Why Use These Tools?</div>
                    <div class="section-subtitle">
                        Protect yourself and your community by verifying what you see online:
                    </div>
                    <ul class="benefits-list">
                        <li><FontAwesomeIcon :icon="byPrefixAndName.fas['check']" class="benefits-icon"/>Stay safe from scams and phishing links</li>
                        <li><FontAwesomeIcon :icon="byPrefixAndName.fas['check']" class="benefits-icon"/>Detect fake news before sharing it</li>
                        <li><FontAwesomeIcon :icon="byPrefixAndName.fas['check']" class="benefits-icon"/>Identify manipulated or fake images</li>
                        <li><FontAwesomeIcon :icon="byPrefixAndName.fas['check']" class="benefits-icon"/>Make confident, informed decisions online</li>
                    </ul>
                </div>
            </div>

            <!-- Sign-In Section -->
            <div class="section-header" v-if="!isLoggedIn">
                <div class="section-title" id="sign-in-section">Unlock All Features — Free Sign In</div>
                <div class="section-subtitle">
                    Save results, receive updates, and access the full suite of verification tools.
                </div>
                <button id="signin-btn" @click="$router.push('/login')">Sign in</button>
            </div>
</template>


<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faNewspaper, faImage, faUser } from '@fortawesome/free-regular-svg-icons';
import {faAt, faCheck} from '@fortawesome/free-solid-svg-icons';

export default {
  name: "Dashboard",
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      byPrefixAndName:{
        far: {
          'newspaper': faNewspaper,
          'image': faImage,
          'user': faUser,
        },
        fas: {
          'at': faAt,
          'check': faCheck,
        }
      }
    };
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  }
};
</script>

<style scoped>
.tools-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-between;
}

.widget {
  background: var(--tools-bg);
  border-radius: 18px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  padding: 32px 28px;
  color: var(--tools-text);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.tools {
  flex: 1;
  text-align: center;
  transition: transform 0.2s ease, background 0.2s ease-in-out;
  text-decoration: none;
}

.tools:hover {
  background: var(--tools-hover-bg);
  transform: translateY(-6px);
  cursor: pointer;
}

.tools:hover h2 {
  color: var(--tools-hover-accent);
  text-shadow: 0 0 6px rgba(0, 230, 230, 0.6);
}

.tools:hover p {
  color: var(--tools-hover-text);
}

.tool-icon {
  font-size: 64px;
  margin-bottom: 12px;
  color: var(--tools-icon);
}

.tools:hover .tool-icon {
  color: var(--tools-icon-hover);
  text-shadow: 0 0 12px rgba(0, 230, 230, 0.7);
  transform: scale(1.1);
  transition: transform 0.2s ease, color 0.2s ease, text-shadow 0.2s ease;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: grid;
  gap: 14px;
  justify-content: center;
}

.benefits-list li {
  font-size: 18px;
  color: var(--benefits-text);
  padding-left: 28px;
  position: relative;
}

.benefits-icon {
  color: var(--benefits-icon);
  font-weight: bold;
  position: absolute;
  left: 0;
}

#sign-in-section {
  font-size: 30px;
  margin-top: 80px;
  color: var(--text-color);
}

#signin-btn {
  display: inline-block;
  margin-top: 24px;
  padding: 14px 32px;
  color: var(--signin-text);
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 10px;
  background: var(--signin-bg);
  box-shadow: var(--signin-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

#signin-btn:hover {
  background: var(--signin-hover-bg);
  box-shadow: var(--signin-hover-shadow);
  transform: translateY(-4px) scale(1.03);
  cursor: pointer;
}

.fake-label {
  color: var(--fake-label);
  font-weight: bold;
}

.real-label {
  color: var(--real-label);
  font-weight: bold;
}
</style>