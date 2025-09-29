<template>
  <div class="login-container">
    <form @submit.prevent="handleRegister">
      <!-- Back arrow -->
      <FontAwesomeIcon
        :icon="byPrefixAndName.fas['arrow-left-long']"
        class="back-arrow"
        @click="$router.push('/')"
      />

      <!-- Logo -->
      <div id="logo-container">
        <img src="../assets/img/logo.png" class="logo" />
      </div>
      <h2 class="login-title">Create account</h2>
      <br>

      <button
        type="button"
        class="brand-login-btn"
        @click="registerWithGoogle"
      >
        <FontAwesomeIcon :icon="['fab','google']" class="brand-icon" />
        Sign up with Google
      </button>
      <button
        type="button"
        class="brand-login-btn"
      >
        <FontAwesomeIcon :icon="['fab','facebook']" class="brand-icon" />
        Sign up with Facebook
      </button>

      <!-- Divider -->
      <div class="divider">
        <span>or</span>
      </div>

      <!-- Username -->
      <div class="input-group">
        <FontAwesomeIcon
          :icon="byPrefixAndName.fas['user']"
          class="input-icon"
        />
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <!-- Password -->
      <div class="input-group">
        <FontAwesomeIcon
          :icon="byPrefixAndName.fas['lock']"
          class="input-icon"
        />
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <!-- Confirm Password -->
      <div class="input-group">
        <FontAwesomeIcon
          :icon="byPrefixAndName.fas['lock']"
          class="input-icon"
        />
        <input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />
      </div>

      <button type="submit" class="primary-btn">Register</button>
    </form>

    <!-- Error box -->
    <div v-if="error" class="error-box">
      <FontAwesomeIcon :icon="byPrefixAndName.fas['triangle-exclamation']" />
      <span>{{ error }}</span>
    </div>

    <!-- Links -->
    <div class="login-links">
      <router-link to="/login" class="login-link">Already have an account?</router-link>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeftLong, faUser, faLock, faEnvelope, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { auth, googleProvider } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

library.add(faGoogle, faFacebook);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      byPrefixAndName: {
        fas: {
          "arrow-left-long": faArrowLeftLong,
          user: faUser,
          lock: faLock,
          envelope: faEnvelope,
          "triangle-exclamation": faTriangleExclamation,
        },
      },
    };
  },
  methods: {
    async handleRegister() {
      this.error = "";
      if (!this.username || !this.password || !this.confirmPassword) {
        this.error = "Please fill in all fields.";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      try {
        // Firebase registration
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;

        // Save Firebase token for backend calls
        const idToken = await user.getIdToken();
        localStorage.setItem("firebaseToken", idToken);

        window.dispatchEvent(new Event("auth-changed"));
        localStorage.setItem("isLoggedIn", "true");
        // Navigate to home
        this.$router.push("/");
      } catch (err) {
        console.error("Registration failed:", err.message);
        this.error = err.message;
      }
    },
    async registerWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        const idToken = await user.getIdToken();
        localStorage.setItem("firebaseToken", idToken);
        localStorage.setItem("isLoggedIn", "true");
        window.dispatchEvent(new Event("auth-changed"));

        this.$router.push("/");
      } catch (err) {
        console.error("Google registration failed:", err.message);
        this.error = err.message;
      }
    },
  },
};
</script>

<style scoped>
/* ...existing code from Login.vue... */
.login-container {
  position: fixed;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 360px;
  max-width: 95%;
  background: var(--login-bg);
  color: var(--login-text);
  padding: 36px 32px 28px;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(44,120,255,0.10), 0 2px 8px rgba(0,0,0,0.18);
  font-family: "Segoe UI", "Roboto", "Arial", sans-serif;
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(79,140,255,0.18);
  text-align: center;
}

#logo-container {
  display: flex;
  justify-content: center;
}
.logo {
  max-width: 80px;
  margin-bottom: 10px;
}

.login-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.input-group {
  position: relative;
  margin-bottom: 18px;
  width: 100%;
}
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--input-icon-color);
  font-size: 1rem;
  pointer-events: none;
}
.login-container input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1.5px solid var(--login-input-border);
  border-radius: 8px;
  background: var(--login-input-bg);
  color: var(--login-input-text);
  font-size: 1rem;
  transition: border 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.login-container input:focus {
  outline: none;
  border: 1.5px solid var(--login-input-focus-border);
  background: var(--login-input-focus-bg);
  box-shadow: 0 0 8px 0 var(--login-input-focus-shadow);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #888;
  margin: 18px 0;
  font-size: 0.9rem;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ddd;
}
.divider:not(:empty)::before {
  margin-right: 0.75em;
}
.divider:not(:empty)::after {
  margin-left: 0.75em;
}

.login-container button {
  width: 100%;
  padding: 10px 0;
  background: var(--login-button-bg);
  color: var(--login-button-text);
  border: none;
  border-radius: 8px;
  font-size: 1.08rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 6px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 12px 0 rgba(44, 120, 255, 0.1);
}
.login-container button:hover {
  background: var(--login-button-hover-bg);
  box-shadow: 0 4px 16px 0 rgba(44, 120, 255, 0.18);
}

.brand-login-btn {
  width: 100%;
  padding: 10px 0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
  border: 1.5px solid var(--status-border) !important;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.brand-login-btn:hover {
  background: #f1f1f1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.brand-icon {
  color: #4285f4;
  font-size: 1.2rem;
}

.error-box {
  margin-top: 14px;
  background: var(--login-error-bg);
  border: 1px solid var(--login-error-border);
  color: var(--login-error-text);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.back-arrow {
  position: absolute;
  top: 12px;
  left: 12px;
  cursor: pointer;
  color: var(--back-arrow-color);
  transition: color 0.15s;
  font-size: 1.4rem;
  z-index: 10000;
}
.back-arrow:hover { 
    color: var(--back-arrow-hover-color); 
}

.login-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  font-size: 0.97rem;
}
.login-link {
  color: var(--sidebar-link-active-text, #4f8cff);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.18s;
}
.login-link:hover {
  color: var(--sidebar-link-hover-text, #3766c9);
  text-decoration: underline;
}
</style>
