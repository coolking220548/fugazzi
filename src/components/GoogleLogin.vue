<template>
  <div>
    <button class="google-login-btn" @click="loginWithGoogle">Login with Google</button>
    <!-- <p v-if="user">Logged in as: {{ user.displayName }}</p> -->
  </div>
</template>

<script>
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        this.user = result.user;

        // Get Firebase ID Token to send to backend
        const idToken = await result.user.getIdToken();
        console.log("Firebase ID Token:", idToken);

        // Save token for API calls
        localStorage.setItem("firebaseToken", idToken);
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  }
};
</script>

<style scoped>
.google-login-btn {
  background: linear-gradient(90deg, #4285f4 60%, #34a853 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(66,133,244,0.12);
  transition: background 0.2s, box-shadow 0.2s, transform 0.12s;
  letter-spacing: 0.5px;
  margin: 12px 0;
  display: inline-block;
}
.google-login-btn:hover {
  background: linear-gradient(90deg, #357ae8 60%, #2e7d32 100%);
  box-shadow: 0 4px 18px rgba(66,133,244,0.18);
  transform: translateY(-2px);
}
</style>
