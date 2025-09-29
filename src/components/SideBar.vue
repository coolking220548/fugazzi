<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <router-link to="/">
        <img src="@/assets/img/logo.png" class="logo" />
      </router-link>
    </div>

    <nav>
      <ul>
        <li>
          <router-link to="/" exact-active-class="active">
            <span class="icon"><font-awesome-icon :icon="['fas', 'home']" /></span>
            <span class="label">Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/tools" exact-active-class="active">
            <span class="icon"><font-awesome-icon :icon="['fas', 'wrench']" /></span>
            <span class="label">Tools</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" exact-active-class="active">
            <span class="icon"><font-awesome-icon :icon="['fas', 'circle-info']" /></span>
            <span class="label">About</span>
          </router-link>
        </li>
        <li>
          <router-link to="/faq" exact-active-class="active">
            <span class="icon"><font-awesome-icon :icon="['fas', 'question-circle']" /></span>
            <span class="label">FAQ</span>
          </router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/admin" exact-active-class="active">
            <span class="icon"><font-awesome-icon :icon="['fas', 'user-shield']" /></span>
            <span class="label">Admin</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Sidebar Actions -->
    <div class="sidebar-actions">
      <!-- Theme Toggle -->
      <button class="theme-toggle" @click="toggleTheme">
        <font-awesome-icon :icon="theme === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']" class="theme-icon" />
        {{ theme === 'dark' ? 'Light UI' : 'Dark UI' }}
      </button>

      <!-- User Profile Block or Login Button -->
      <div v-if="isLoggedIn" class="user-block" @click="toggleDropdown">
        <span
            class="user-avatar"
            :style="userPhoto ? { backgroundImage: `url(${userPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
            <template v-if="!userPhoto">{{ username.charAt(0) }}</template>
        </span>

        <span class="user-name">{{ username }}</span>
        <font-awesome-icon :icon="['fas', 'chevron-down']" class="dropdown-icon" />
        <!-- Dropdown -->
        <transition name="fade">
          <ul v-if="showDropdown" class="user-dropdown">
            <li>
              <router-link to="/profile">
                <font-awesome-icon :icon="['fas', 'user']" class="dropdown-item-icon" />
                Profile
              </router-link>
            </li>
            <li>
              <router-link to="/settings">
                <font-awesome-icon :icon="['fas', 'gear']" class="dropdown-item-icon" />
                Settings
              </router-link>
            </li>
            <li @click.prevent="handleLoginLogout">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="dropdown-item-icon" />
              {{ status }}
            </li>
          </ul>
        </transition>
      </div>
      <button
        v-else
        class="login-btn"
        @click="handleLoginLogout"
      >
        <font-awesome-icon :icon="['fas', 'user']" class="login-btn-icon" />
         Sign in
      </button>
    </div>
  </aside>
</template>

<script>
import { auth, signOut } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faSun, faMoon , faHome, faWrench, faCircleInfo, 
    faQuestionCircle, faUserShield, faChevronDown, faUser, faGear, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faSun, faMoon, faHome, faWrench, faCircleInfo, 
    faQuestionCircle, faUserShield, faChevronDown, faUser, faGear, faRightFromBracket
);

export default {
  name: 'SideBar',
  components: { FontAwesomeIcon },
  data() {
    return {
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
      status: localStorage.getItem("isLoggedIn") === "true" ? "Sign out" : "Login",
      username: "",
      userPhoto: "",
      theme: localStorage.getItem('theme') || 'dark',
      showDropdown: false,
    };
  },
  mounted() {
    window.addEventListener("auth-changed", this.updateStatus);
    document.documentElement.setAttribute('data-theme', this.theme);
    document.addEventListener("click", this.handleClickOutside);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.username = user.displayName || user.email;
        this.userPhoto = user.photoURL || "";
      } else {
        this.username = "";
        this.userPhoto = "";
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener("auth-changed", this.updateStatus);
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    updateStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      this.status = this.isLoggedIn ? "Sign out" : "Login";
    },
    handleLoginLogout() {
      if (this.status === 'Sign out') {
        signOut(auth).then(() => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('firebaseToken')
          window.dispatchEvent(new Event("auth-changed"));
          this.updateStatus();
          this.$router.push('/login');
        });
      } else {
        this.$router.push('/login');
      }
      this.showDropdown = false;
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    handleClickOutside(e) {
    // if click is outside user-block or dropdown, close it
        if (
            this.showDropdown &&
            !this.$el.querySelector(".user-block").contains(e.target) &&
            !this.$el.querySelector(".user-dropdown")?.contains(e.target)
        ) {
            this.showDropdown = false;
        }
    }
  },
};
</script>

<style scoped>
.sidebar {
  scroll-behavior: smooth;
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right: 1.5px solid rgba(79, 140, 255, 0.18);
  box-shadow: 0 0.5rem 1.2rem rgba(44,120,255,0.10);
  backdrop-filter: blur(10px) brightness(1.08);
  -webkit-backdrop-filter: blur(10px) brightness(1.08);
  z-index: 10;
  min-width: 220px;
  transition: box-shadow 0.2s;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 24px 18px 24px;
  border-bottom: 1px solid rgba(79,140,255,0.10);
  margin-bottom: 8px;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  box-shadow: 0 2px 8px rgba(44,120,255,0.08);
}

nav {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 0;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar nav li {
  width: 100%;
  display: flex;
}

.sidebar nav a,
.sidebar nav li > span {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  color: var(--sidebar-link);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  letter-spacing: 0.2px;
  box-shadow: none;
  margin: 0;
  padding: 0 24px;
  position: relative;
  gap: 14px;
}

.sidebar nav a.active,
.sidebar nav a.router-link-exact-active {
  background: var(--sidebar-link-active-bg);
  color: var(--sidebar-link-active-text);
  box-shadow: 0 2px 8px 0 rgba(44, 120, 255, 0.08);
}

.sidebar nav a:hover,
.sidebar nav li > span:hover {
  background: var(--sidebar-link-hover-bg);
  color: var(--sidebar-link-hover-text);
}

.icon {
  font-size: 1.18rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  min-width: 22px;
}

.label {
  font-size: 1.01rem;
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 1;
  color: inherit;
  margin: 0;
  text-align: left;
  white-space: nowrap;
}

.sidebar-actions {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 14px;
  padding: 18px 12px 24px 12px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid rgba(79,140,255,0.10);
  background: linear-gradient(180deg, transparent 60%, rgba(44,120,255,0.04) 100%);
}

.theme-toggle {
  background: var(--toggle-bg);
  color: var(--toggle-text);
  border: 1px solid var(--toggle-border);
  border-radius: 8px;
  padding: 8px 0;
  font-size: 0.97rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, transform 0.12s;
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
}
.theme-toggle:hover {
  background: var(--toggle-hover-bg);
  color: var(--toggle-hover-text);
  transform: translateY(-1px);
}

.theme-icon {
  font-size: 1.1rem;
  margin-right: 2px;
}
.user-block {
  position: relative; /* anchor for the floating menu */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--profile-bg);
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.user-block:hover {
  background: var(--profile-hover-bg);
}
.user-avatar {
  background: linear-gradient(135deg, #4f8cff, #00e6e6);
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
.user-name {
  flex: 1;
  font-weight: 500;
  color: var(--sidebar-text);
}
.dropdown-icon {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* Dropdown */
/* .user-dropdown {
  list-style: none;
  margin: 8px 0 0;
  padding: 6px 0;
  background: var(--sidebar-bg);
  border: 1px solid rgba(79,140,255,0.2);
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
} */
.user-dropdown {
  position: absolute;
  bottom: 100%;   /* instead of top: 100% */
  left: 0;
  width: 100%;
  z-index: 1000;
  list-style: none;
  margin: 0 0 6px 0; /* space above */
  padding: 6px 0;
  background: var(--sidebar-bg);
  border: 1px solid rgba(79,140,255,0.2);
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.user-dropdown li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.user-dropdown li:hover {
  background: var(--sidebar-link-hover-bg);
}
.user-dropdown a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
  display: block;
}
.dropdown-item-icon {
  font-size: 1rem;
  min-width: 18px;
  color: var(--sidebar-link-hover-text);
  opacity: 0.85;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.login-btn {
  background: var(--toggle-bg);
  color: var(--toggle-text);
  border: 1px solid var(--toggle-border);
  border-radius: 8px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 0;
  box-sizing: border-box;
  transition: background 0.18s, color 0.18s, transform 0.12s;
}
.login-btn:hover {
  background: var(--toggle-hover-bg);
  color: var(--toggle-hover-text);
  transform: translateY(-1px);
}
.login-btn-icon {
  font-size: 1.1rem;
  margin-right: 2px;
}
</style>