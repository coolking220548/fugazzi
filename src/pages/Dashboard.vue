<template>
       <!-- Hero Section -->
      <div id="hero">
        <div class="head">
          <h1>Welcome to Fugazzi</h1>
          <p>AI-powered tools to verify news, images, and links instantly.</p>
          <div class="hero-tools">
            <div class="hero-tool" @click="$router.push('/newsanalyze')">
              <FontAwesomeIcon :icon="byPrefixAndName.far['newspaper']" />
              <span>News Analysis</span>
            </div>
            <div class="hero-tool" @click="$router.push('/imageanalyze')">
              <FontAwesomeIcon :icon="byPrefixAndName.far['image']" />
              <span>Image Verification</span>
            </div>
            <div class="hero-tool" @click="$router.push('/urlanalyze')">
              <FontAwesomeIcon :icon="byPrefixAndName.fas['at']" />
              <span>URL Authentication</span>
            </div>
          </div>
        </div>
      </div>

      <div class="page-content">
        <!-- Tools Section -->
        <div class="section-header">
          <div class="section-title">Our Tools at a Glance</div>
          <div class="section-subtitle">
            Verify news in any format with AI-powered analysis.
          </div>
        </div>

        <div class="tools-section">
          <router-link to="/newsanalyze" class="tools widget">
            <FontAwesomeIcon :icon="byPrefixAndName.far['newspaper']" class="tool-icon"/>
            <h2>News Analysis</h2>
            <p>Detect misleading or fake stories instantly.</p>
          </router-link>

          <router-link to="/imageanalyze" class="tools widget">
            <FontAwesomeIcon :icon="byPrefixAndName.far['image']" class="tool-icon"/>
            <h2>Image Verification</h2>
            <p>Check photos for deepfakes and manipulations.</p>
          </router-link>

          <router-link to="/urlanalyze" class="tools widget">
            <FontAwesomeIcon :icon="byPrefixAndName.fas['at']" class="tool-icon"/>
            <h2>URL Authentication</h2>
            <p>Verify the authenticity of news links.</p>
          </router-link>
        </div>

        <!-- How It Works -->
        <div class="section-header">
          <div class="section-title">How It Works</div>
          <div class="section-subtitle">
            Follow 3 simple steps to verify any news content.
          </div>
        </div>

        <div class="workflow">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Select a Tool</h3>
              <p>Choose News, Image, or URL analysis depending on your content.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Submit Content</h3>
              <p>Paste text, upload an image, or enter a URL.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Get Instant Results</h3>
              <p>AI checks credibility and provides explanations with sources.</p>
            </div>
          </div>
        </div>

        <!-- Recent Activity / Demo -->
        <div class="section-header">
          <div class="section-title">Recent Analyses</div>
          <div class="section-subtitle">
            Explore examples of how Fugazzi verifies content in real-time.
          </div>
        </div>

        <section class="news-analysis widget">
          <h2>Recent News Verification</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Source</th>
                <th>Timestamp</th>
                <th>Label</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>WAN SQUAD DEPARTS FOR USA TO DEFEND TITLE</td>
                <td>EMTV</td>
                <td>2025-06-01 11:47</td>
                <td><span class="real-label">Real</span></td>
                <td>98%</td>
              </tr>
              <tr>
                <td>Akon to perform on September 16 in POM</td>
                <td>Facebook</td>
                <td>2025-05-18 09:30</td>
                <td><span class="fake-label">Fake</span></td>
                <td>87%</td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Sign-in / CTA -->
        <div class="section-header" v-if="!isLoggedIn">
          <div class="section-title" id="sign-in-section">Start Using Our Free Tools Now</div>
          <div class="section-subtitle">
            Sign in to access full features and stay informed with the latest updates.
          </div>
          <button id="signin-btn" @click="$router.push('/login')">Sign in</button>
        </div>
      </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faNewspaper, faImage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';

export default {
  name: "Dashboard",
  components: { FontAwesomeIcon },
  data() {
    return {
      byPrefixAndName: {
        far: {
          'newspaper': faNewspaper,
          'image': faImage,
          'user': faUser
        },
        fas: {
          'at': faAt
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
#hero {
  height: 100vh;
  background: var(--hero-bg-overlay) url('../assets/img/hero.png') no-repeat;
  background-size: 150%;
  background-position-y: 50%;
  background-position-X: 48%;
  background-blend-mode: overlay;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--hero-text);
}

.head {
  text-align: center;
  animation: fadeInUp 0.6s ease;
}
.head h1 { font-size: 48px; margin-bottom: 12px; }
.head p { font-size: 20px; margin-bottom: 20px; color: var(--subtext-color);}

.hero-tools {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}
.hero-tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: var(--hero-tool-color);
  transition: all 0.3s ease;
}
.hero-tool:hover {
  transform: scale(1.1);
  color: var(--hero-tool-hover-color);
}
.hero-tool span { margin-top: 6px; font-weight: 600; }

/* Widgets */
.widget {
  background: var(--widget-bg);
  border-radius: 14px;
  padding: 24px 20px;
  width: 90%;
  text-align: center;
  box-shadow: var(--widget-shadow);
  color: var(--widget-text);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.widget:hover {
  transform: translateY(-6px);
  box-shadow: var(--widget-hover-shadow);
}

.widget p {
    color: var(--subtext-color);
}

/* Workflow / How it works */
.workflow {
  display: flex;
  justify-content: space-around;
  margin: 32px 0;
  flex-wrap: wrap;
  gap: 24px;
}
.step {
  flex: 1;
  min-width: 200px;
  background: var(--step-bg);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  color: var(--step-text);
  box-shadow: var(--widget-shadow);
}
.step-number {
  font-size: 32px;
  font-weight: bold;
  color: var(--step-number);
  margin-bottom: 12px;
}
.step-content h3 { margin-bottom: 8px; color: var(--subtext-color);}
.step-content p { font-size: 14px; color: var(--step-subtext); }

/* Tools Cards */
.tools-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
}
.tools { flex: 1; text-decoration: none; }
.tool-icon { font-size: 48px; margin-bottom: 12px; color: var(--tool-icon); }

/* Table / News Analysis */
.news-analysis table {
  width: 100%;
  border-collapse: collapse;
}
.news-analysis th, .news-analysis td {
  padding: 8px 10px;
  text-align: left;
  border-bottom: 1px solid var(--table-border);
}
.fake-label { color: var(--label-fake); font-weight: bold; }
.real-label { color: var(--label-real); font-weight: bold; }

/* Sign-in CTA */
#sign-in-section { font-size: 28px; margin-top: 40px; }
#signin-btn {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 20px;
  font-size: 16px;
  background: var(--signin-bg);
  color: var(--signin-text);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
#signin-btn:hover {
  background: var(--signin-bg-hover);
}
</style>
