<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you'  re looking for doesn't exist.</p>
    <button @click="$router.push('/')">Go Home</button>
  </div>
</template>

<script>
export default {
  name: "404",
};
</script>

<style scoped>
.not-found {
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #e0e6f6;
}
.not-found h1 {
  font-size: 6rem;
  margin-bottom: 12px;
  color: var(--text-color);
}
.not-found button {
  margin-top: 20px;
  padding: 10px 20px;
  background: var(--signin-bg);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.2s;
}

.not-found button:hover {
    background: var(--signin-bg-hover);
}
</style>
