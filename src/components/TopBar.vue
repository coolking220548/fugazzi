<template>
  <header class="top-bar">
    <div class="top-bar-left">
      <!-- <span class="current-date">{{ currentDate }}</span> -->
    </div>
    <div class="top-bar-right">
      <!-- Controls moved to SideBar -->
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      // Remove status, theme, currentDate if not needed elsewhere
    };
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 32px;
  background: var(--topbar-bg);
  border-bottom: 1.5px solid var(--topbar-border);
  box-shadow: var(--topbar-shadow);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px) brightness(1.08);
  color: var(--topbar-text);
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 18px;
}
</style>