<template>
    <aside class="sidebar">
      <div class="sidebar-logo">Fugazzi</div>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/analyze">Analyze</router-link></li>
            <li v-if="!isLoggedIn">Admin</li>
        </ul>
      </nav>
    </aside>
</template>

<script>
export default {
  name: 'SideBar',
  computed: {
    isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: rgba(30, 34, 54, 0.95);
  color: #e0e6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 0 0;
  border-right: 1.5px solid rgba(79,140,255,0.18);
  box-shadow: 2px 0 16px 0 rgba(44,120,255,0.08);
}
.sidebar-logo {
  font-size: 2.2rem;
  margin-bottom: 32px;
}
.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.sidebar nav li {
  padding: 16px 0 16px 32px;
  font-size: 1.13rem;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.2s, border-color 0.2s;
  display: flex;
  align-items: center;
}
.sidebar nav li:hover {
  background: rgba(44,120,255,0.10);
  border-left: 3px solid #4f8cff;
}
</style>