<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin">
            <FontAwesomeIcon
                :icon="byPrefixAndName.fas['arrow-left-long']"
                class="back-arrow"
                @click="$router.push('/')"
            />
            <div>
                <label for="username">Username:</label>
                <input id="username" v-model="username" type="text" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" v-model="password" type="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

export default {
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            username: '',
            password: '',
            error: '',
            byPrefixAndName: {
                fas: {
                    'arrow-left-long': faArrowLeftLong
                }
            }
        };
    },
    methods: {
        handleLogin() {
            if (!this.username || !this.password) {
                this.error = 'Please enter both username and password.';
                return;
            }
            if (this.username === 'user' && this.password === '123') {
                this.error = '';
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful!');
                this.$router.push('/analyze');
            } else {
                this.error = 'Invalid credentials.';
            }
        }
    }
};
</script>

<style>

.login-container {
    width: 340px;
    background: rgba(30, 34, 54, 0.88);
    color: #e0e6f6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 36px 32px 28px 32px;
    border-radius: 18px;
    box-shadow: 0 6px 32px rgba(44,120,255,0.10), 0 2px 8px rgba(0,0,0,0.18);
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    backdrop-filter: blur(8px);
    border: 1.5px solid rgba(79,140,255,0.18);
}

.login-container label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #b6c8f6;
    letter-spacing: 0.2px;
}

.login-container input {
    width: 100%;
    margin-bottom: 18px;
    padding: 10px 12px;
    box-sizing: border-box;
    border: 1.5px solid #444b5a;
    border-radius: 8px;
    background: #181c24;
    color: #fff;
    font-size: 1rem;
    transition: border 0.2s, box-shadow 0.2s;
    box-shadow: 0 1px 4px rgba(44,120,255,0.08);
}

.login-container input:focus {
    outline: none;
    border: 1.5px solid #4f8cff;
    background: #23293a;
    box-shadow: 0 0 8px 0 #4f8cff55;
}

.login-container button {
    width: 100%;
    padding: 10px 0;
    background: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.08rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    margin-top: 6px;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 12px 0 rgba(44,120,255,0.10);
}

.login-container button:hover {
    background: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
    box-shadow: 0 4px 16px 0 rgba(44,120,255,0.18);
}

.error {
    color: #ff6b6b;
    margin-top: 14px;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.2px;
}

.back-arrow {
    cursor: pointer;
    color: #b6c8f6;
    margin-bottom: 16px;
    transition: color 0.2s;
    font-size: 1.5rem;
}

.back-arrow:hover {
    color: #4f8cff;
}
</style>