<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'App',
  components: {},

  data() {
    return {
      status: localStorage.getItem('isLoggedIn') === 'true' ? 'Logout' : 'Login'
    };
  },
  methods: {
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
    window.addEventListener('storage', this.updateStatus);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateStatus);
  }
};
</script>

<style>
body {
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    background: #0a0c12;
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
}
/* body::before {
    content: "";
    display: block;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    background: radial-gradient(ellipse 60% 40% at 60% 40%, rgba(44, 120, 255, 0.32) 0%, rgba(0,0,0,0) 70%),
                radial-gradient(ellipse 40% 60% at 40% 60%, rgba(0, 255, 255, 0.18) 0%, rgba(0,0,0,0) 80%);
    filter: blur(0.5px);
    pointer-events: none;
} */

nav {
    background: rgba(30, 34, 54, 0.85);
    padding: 18px 36px;
    border-radius: 18px;
    margin: 40px auto 32px auto;
    max-width: 520px;
    box-shadow: 0 6px 32px rgba(44,120,255,0.10), 0 2px 8px rgba(0,0,0,0.18);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(8px);
    border: 1.5px solid rgba(79,140,255,0.18);
    z-index: 1000;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 28px;
}
nav li {
    display: inline;
}
nav a {
    color: #e0e6f6;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.13rem;
    padding: 10px 22px;
    border-radius: 10px;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    letter-spacing: 0.5px;
    box-shadow: none;
}
nav a.router-link-exact-active {
    background: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
    color: #fff;
    box-shadow: 0 2px 12px 0 rgba(44,120,255,0.18);
}
nav a:hover {
    background: rgba(44,120,255,0.18);
    color: #fff;
    box-shadow: 0 2px 8px 0 rgba(44,120,255,0.10);
}
</style>