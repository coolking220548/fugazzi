<template>
    <header class="top-bar">
        <div class="top-bar-left">
          <span class="current-date">{{ currentDate }}</span>
          <button v-if="$route.path === '/'" class="refresh-btn">Refresh</button>
        </div>
        <div class="top-bar-right">
          <span class="user-profile">Branzz</span>
          <span class="user-status" @click.prevent="handleLoginLogout">{{ status }}</span>
        </div>
      </header>
</template>

<script>
export default {
  data() {
    return {
      currentDate: this.formatDate(new Date()),
      status: localStorage.getItem('isLoggedIn') === 'true' ? 'Logout' : 'Login'
    };
  },
  methods: {
    formatDate(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    },
    updateStatus() {
      this.status = localStorage.getItem('isLoggedIn') === 'true' ? 'Logout' : 'Login';
    },
    handleLoginLogout() {
      if (this.status === 'Logout') {
        localStorage.removeItem('isLoggedIn');
        this.updateStatus();
        this.$router.push('/login');
      } else {
        this.$router.push('/login');
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.currentDate = this.formatDate(new Date());
    }, 60 * 1000);
    window.addEventListener('storage', this.updateStatus);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateStatus);
  }
};
</script>

<style>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 32px;
  background: rgba(30, 34, 54, 0.85);
  border-bottom: 1.5px solid rgba(79,140,255,0.18);
  box-shadow: 0 2px 12px 0 rgba(44,120,255,0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}
.top-bar-left {
  display: flex;
  align-items: center;
  gap: 18px;
}
.current-date {
  color: #b6c8f6;
  font-weight: 500;
}
.refresh-btn {
  background: #23293a;
  color: #4f8cff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.refresh-btn:hover {
  background: #4f8cff;
  color: #fff;
}
.top-bar-right .user-profile {
  background: #23293a;
  color: #e0e6f6;
  border-radius: 50px;
  padding: 7px 18px;
  font-size: 1rem;
  font-weight: 500;
}

.top-bar-right .user-status {
  color: #b6c8f6;
  background: #23293a;
  padding: 6px 12px;
  border: 1px solid #4f8cff;
  font-size: 0.9rem;
  cursor: pointer;
  margin-left: 16px;
  transition: background 0.2s, color 0.2s;
}

.top-bar-right .user-status:hover {
  background: #4f8cff;
  color: #fff;
}
</style>