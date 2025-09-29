<template>
    <div class="page-layout">
        <side-bar/>
        <div class="main-area relative overflow-hidden">
            <Iridescence
                :color="iridescenceColor"
                :speed="1.0"
                :amplitude="0.1"
                :mouseReact="true"
                class="absolute top-0 left-0 w-full h-full z-0"
            />
            <div class="relative z-10 flex flex-col min-h-screen">
                <div class="sticky top-0 z-20">
                    <!-- <top-bar/> -->
                </div>
                <div class="content-area overflow-auto flex-1">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Iridescence from "@/components/Iridescence.vue";

const iridescenceColor = ref<[number, number, number]>([0, 0.4, 0.5]);

const hexToRgbArray = (hex: string): [number, number, number] => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
};

const updateIridescenceColor = () => {
  const cssValue = getComputedStyle(document.documentElement)
    .getPropertyValue("--iridescence-color")
    .trim();
  if (cssValue.startsWith("#")) {
    iridescenceColor.value = hexToRgbArray(cssValue);
  }
};

onMounted(() => {
  updateIridescenceColor();

  const observer = new MutationObserver(updateIridescenceColor);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  onBeforeUnmount(() => observer.disconnect());
});
</script>

<style>

/**************************************************** Light Theme *****************************************************************/
:root[data-theme='light'] {
  --bg-color: #f5f7fa;
  --text-color: #222;
  --subtext-color: #000000;
  --card-color: #f4f6fb;
  --iridescence-color: #f5f7fa;

  /* SideBar */
  --sidebar-bg: #ffffff;
  --sidebar-text: #333;
  --sidebar-link: #555;
  --sidebar-link-active-bg: rgba(79, 140, 255, 0.15);
  --sidebar-link-active-text: #2a5bd7;
  --sidebar-link-hover-bg: rgba(79, 140, 255, 0.1);
  --sidebar-link-hover-text: #2a5bd7;

  /* TopBar */
  --topbar-bg: rgba(244, 246, 251, 0.9);
  --topbar-border: rgba(79,140,255,0.15);
  --topbar-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
  --topbar-text: #333;
  --muted-text: #555;
  --profile-bg: #e0e6f6;
  --profile-text: #333;
  --status-bg: #e0e6f6;
  --status-text: #333;
  --status-border: #4f8cff;
  --status-hover-bg: #4f8cff;
  --status-hover-text: #fff;
  --status-hover-border: #3766c9;
  --toggle-bg: #e0e6f6;
  --toggle-text: #333;
  --toggle-border: #4f8cff;
  --toggle-hover-bg: #4f8cff;
  --toggle-hover-text: #fff;

  /* Dashboard */
  --hero-bg-overlay: rgba(244,246,251,0.4); /* keep slightly dark overlay */
  --hero-text: #111; /* darker for readability */
  --hero-tool-color: #153670; /* darker blue */
  --hero-tool-hover-color: #007777; /* noticeable hover */
  --widget-bg: #e8ebf2; /* slightly darker than page background */
  --widget-text: #111; /* high contrast */
  --widget-shadow: 0 2px 12px rgba(0,0,0,0.1);
  --widget-hover-shadow: 0 8px 20px rgba(0,0,0,0.15);
  --step-bg: #e8ebf2; /* same as widget for consistency */
  --step-text: #111;
  --step-number: #2a5bd7; 
  --step-subtext: #555;
  --tool-icon: #2a5bd7;
  --table-border: #ccc;
  --label-fake: #d93a3a; /* stronger red */
  --label-real: #00a88f; /* darker green */
  --signin-bg: linear-gradient(90deg, #2a5bd7 60%, #008888 100%);
  --signin-bg-hover: linear-gradient(90deg, #1f45a0 60%, #006666 100%);
  --signin-text: #fff;

  /* Login */
  --login-bg: #f4f6fb;
  --login-text: #111;
  --login-subtext: #555;
  --login-input-bg: #fff;
  --login-input-border: #ccc;
  --login-input-text: #111;
  --login-input-focus-bg: #eef2f7;
  --login-input-focus-border: #2a5bd7;
  --login-input-focus-shadow: rgba(42, 91, 215, 0.33);
  --login-button-bg: linear-gradient(90deg, #2a5bd7 60%, #008888 100%);
  --login-button-hover-bg: linear-gradient(90deg, #1f45a0 60%, #006666 100%);
  --login-button-text: #fff;
  --login-error-bg: rgba(217, 58, 58, 0.15);
  --login-error-border: #d93a3a55;
  --login-error-text: #d93a3a;
  --back-arrow-color: #555;
  --back-arrow-hover-color: #2a5bd7;
  --input-icon-color: #888;

  /* Tools */
  --tools-bg: #ffffff;
  --tools-text: #333333;
  --tools-hover-bg: rgba(79,140,255,0.1);
  --tools-hover-text: #111111;
  --tools-hover-accent: #00a3a3;
  --tools-icon: #4f8cff;
  --tools-icon-hover: #00a3a3;
  --benefits-text: #555555;
  --benefits-icon: #00a3a3;
  --signin-text: #ffffff;
  --signin-bg: linear-gradient(90deg, #4f8cff 0%, #00a3a3 100%);
  --signin-hover-bg: linear-gradient(90deg, #3766c9 0%, #008080 100%);
  --signin-shadow: 0 4px 12px rgba(0,0,0,0.15);
  --signin-hover-shadow: 0 0 12px rgba(0,160,160,0.5), 0 4px 16px rgba(0,0,0,0.15);
  --fake-label: #ff4d4d;
  --real-label: #00b37f;

  /* NewsAnalyze */
  --news-h3: #222222;
  --news-p: #555555;
  --option-bg: #ffffff;
  --option-text: #333333;
  --option-title: #111111;
  --option-desc: #666666;
  --option-hover-bg: rgba(79,140,255,0.1);
  --option-hover-shadow: 0 8px 20px rgba(0,0,0,0.12);
  --option-icon: #4f8cff;
  --option-icon-hover: #00a3a3;
  --option-icon-shadow: 0 0 10px rgba(0,163,163,0.7);
  --analysis-bg: rgb(244, 246, 251);
  --analysis-text: #2a5bd7;
  --card-shadow: 0 4px 18px rgba(0,0,0,0.12);
  --result-true-bg: rgba(0, 128, 64, 0.15);
  --result-true-border: #008040;
  --result-true-text: #008040;
  --result-true-shadow: rgba(0, 128, 64, 0.5);
  --result-false-bg: rgba(255, 64, 64, 0.15);
  --result-false-border: #ff4040;
  --result-false-text: #ff4040;
  --result-false-shadow: rgba(255, 64, 64, 0.5);
  --result-unsure-bg: rgba(255, 215, 0, 0.25);
  --result-unsure-border: #e6c200;
  --result-unsure-text: #b38f00;
  --result-unsure-shadow: rgba(179, 143, 0, 0.5);
  --result-bg: #f4f6fb;
  --result-text: #222222;
  --source-bg: linear-gradient(90deg, #00cc66, #008f4d);
  --source-hover-bg: linear-gradient(90deg, #00994d, #006633);
  --source-text: #ffffff;
  --source-shadow: rgba(0, 163, 102, 0.5);

  /* ImageAnalyze */
  --bg-primary: #f4f6fb;
  --bg-secondary: rgba(44, 120, 255, 0.05);
  --text-primary: #222222;
  --text-secondary: #555555;
  --highlight: #1a6cff;
  --accent: #00a8a8;
  --upload-dashed: #ffd966;
  --button-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --button-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --result-bg: #e0e6f6;
  --fake-color: #d9534f;
  --real-color: #28a745;

  /* URLAuthenticate */

}

/**************************************************** Dark Theme ***************************************************************/
:root[data-theme='dark'] {
  --bg-color: rgba(10,12,18,0.92);
  --text-color: #e0e6f6;
  --subtext-color: #b0b8d4;
  --iridescence-color: #1b2148;
  --card-color: rgba(30, 34, 54, 0.85);

  /* SideBar */
  --sidebar-bg: linear-gradient(
      135deg,
      rgba(30, 34, 54, 0.92) 70%,
      rgba(44, 120, 255, 0.1) 100%
    ),
    linear-gradient(
      120deg,
      rgba(44, 120, 255, 0.08) 0%,
      rgba(0, 230, 230, 0.06) 100%
    );
  --sidebar-text: #e0e6f6;
  --sidebar-link: #b6c8f6;
  --sidebar-link-active-bg: rgba(44, 120, 255, 0.13);
  --sidebar-link-active-text: #4f8cff;
  --sidebar-link-hover-bg: rgba(44, 120, 255, 0.1);
  --sidebar-link-hover-text: #4f8cff;

  /* Topbar */
  --topbar-bg: linear-gradient(
      135deg,
      rgba(30,34,54,0.92) 70%,
      rgba(44,120,255,0.10) 100%
    ),
    linear-gradient(
      120deg,
      rgba(44,120,255,0.08) 0%,
      rgba(0,230,230,0.06) 100%
    );
  --topbar-border: rgba(79,140,255,0.18);
  --topbar-shadow: 0 2px 12px 0 rgba(44,120,255,0.08);
  --topbar-text: #e0e6f6;
  --muted-text: #b6c8f6;
  --profile-bg: #23293a;
  --profile-text: #e0e6f6;
  --status-bg: #23293a;
  --status-text: #b6c8f6;
  --status-border: #4f8cff;
  --status-hover-bg: #4f8cff;
  --status-hover-text: #fff;
  --status-hover-border: #3766c9;
  --toggle-bg: #23293a;
  --toggle-text: #e0e6f6;
  --toggle-border: #4f8cff;
  --toggle-hover-bg: #4f8cff;
  --toggle-hover-text: #fff;

  /* Dashboard */
  --hero-bg-overlay: rgba(10,12,18,0.72);
  --hero-text: #ffffff;
  --hero-tool-color: #4f8cff;
  --hero-tool-hover-color: #00e6e6;
  --widget-bg: rgba(30,34,54,0.92);
  --widget-text: #e0e6f6;
  --widget-shadow: 0 2px 12px rgba(44,120,255,0.08);
  --widget-hover-shadow: 0 8px 20px rgba(44,120,255,0.25);
  --step-bg: rgba(30,34,54,0.92);
  --step-text: #e0e6f6;
  --step-number: #4f8cff;
  --step-subtext: #b0b8d4;
  --tool-icon: #4f8cff;
  --table-border: #23293a;
  --label-fake: #ff6b6b;
  --label-real: #00e6a8;
  --signin-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --signin-bg-hover: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --signin-text: #fff;

  /* Login */
  --login-bg: rgba(30, 34, 54, 0.88);
  --login-text: #e0e6f6;
  --login-subtext: #b6c8f6;
  --login-input-bg: #181c24;
  --login-input-border: #444b5a;
  --login-input-text: #fff;
  --login-input-focus-bg: #23293a;
  --login-input-focus-border: #4f8cff;
  --login-input-focus-shadow: rgba(79, 140, 255, 0.33);
  --login-button-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --login-button-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --login-button-text: #fff;
  --login-error-bg: rgba(255, 107, 107, 0.15);
  --login-error-border: #ff6b6b55;
  --login-error-text: #ff6b6b;
  --back-arrow-color: #b6c8f6;
  --back-arrow-hover-color: #4f8cff;
  --input-icon-color: #888;

  /* Tools */
  --tools-bg: rgba(30, 34, 54, 0.95);
  --tools-text: #e0e6f6;
  --tools-hover-bg: rgba(44,120,255,0.1);
  --tools-hover-text: #ffffff;
  --tools-hover-accent: #00e6e6;
  --tools-icon: #4f8cff;
  --tools-icon-hover: #00e6e6;
  --benefits-text: #cbd3f5;
  --benefits-icon: #00e6a8;
  --signin-text: #ffffff;
  --signin-bg: linear-gradient(90deg, #4f8cff 0%, #00e6e6 100%);
  --signin-hover-bg: linear-gradient(90deg, #3766c9 0%, #00b3b3 100%);
  --signin-shadow: 0 6px 16px rgba(44,120,255,0.25);
  --signin-hover-shadow: 0 0 16px rgba(0, 230, 230, 0.7), 0 4px 20px rgba(44,120,255,0.3);
  --fake-label: #ff6b6b;
  --real-label: #00e6a8;

  /* NewsAnalyze */
  --news-h3: #e0e6f6;
  --news-p: #b6c8f6;
  --option-bg: rgba(30, 34, 54, 0.95);
  --option-text: #d6dcf2;
  --option-title: #ffffff;
  --option-desc: #b0b8d4;
  --option-hover-bg: rgba(44,120,255,0.12);
  --option-hover-shadow: 0 8px 20px rgba(44,120,255,0.25);
  --option-icon: #4f8cff;
  --option-icon-hover: #00e6e6;
  --option-icon-shadow: 0 0 10px rgba(0,230,230,0.7);
  --analysis-bg: rgba(30, 34, 54, 0.92);
  --analysis-text: #4f8cff;
  --card-shadow: 0 4px 18px rgba(0,0,0,0.2);
  --result-true-bg: rgba(0, 255, 128, 0.15);
  --result-true-border: #00ff80;
  --result-true-text: #00ff80;
  --result-true-shadow: rgba(0, 255, 128, 0.5);
  --result-false-bg: rgba(255, 64, 64, 0.15);
  --result-false-border: #ff4040;
  --result-false-text: #ff4040;
  --result-false-shadow: rgba(255, 64, 64, 0.5);
  --result-unsure-bg: rgba(255, 215, 0, 0.15);
  --result-unsure-border: #ffd700;
  --result-unsure-text: #ffd700;
  --result-unsure-shadow: rgba(255, 215, 0, 0.5);
  --result-bg: #23293a;
  --result-text: #e0e6f6;
  --source-bg: linear-gradient(90deg, #00ff80, #00b36b);
  --source-hover-bg: linear-gradient(90deg, #00cc66, #008f4d);
  --source-text: #ffffff;
  --source-shadow: rgba(0, 255, 128, 0.5);

  /* ImageAnalyze */
  --bg-primary: rgba(30, 34, 54, 0.95);
  --bg-secondary: rgba(44, 120, 255, 0.08);
  --text-primary: #e0e6f6;
  --text-secondary: #b6c8f6;
  --highlight: #4f8cff;
  --accent: #00e6e6;
  --upload-dashed: #FFF9AF;
  --button-bg: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  --button-hover-bg: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
  --result-bg: #23293a;
  --fake-color: #ff6b6b;
  --real-color: #00e6a8;

  /* URLAuthenticate */
  
}

.silk-container {
    width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;
}

body {
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  background: transparent;
  color: var(--text-color);
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  backdrop-filter: blur(12px) brightness(1.08);
  -webkit-backdrop-filter: blur(12px) brightness(1.08);
  box-shadow: 0 8px 32px 0 rgba(44,120,255,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.18) inset;
  transition: background 0.25s, color 0.25s;
}


.sticky {
  position: sticky;
  top: 0;
}
.content-area {
  flex: 1;
  overflow-y: auto;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

.overflow-hidden {
  overflow: hidden;
}

.page-layout {
  display: flex;
  min-height: 100vh;
  background: transparent;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
}

.page-content {
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-header {
    color: var(--text-color);
    margin-top: 64px;
    margin-bottom: 32px; /* more breathing space */
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    animation: fadeInUp 0.6s ease;
}

.section-title {
    font-size: 40px;
    font-weight: bold;
    color: var(--text-color);
}

.section-subtitle {
  font-size: 20px;
  margin-top: 16px;
  color: var(--subtext-color);
}

.logo {
  width: 75px;
  height: 75px;
  border-radius: 100px;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>