import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SideBar from './components/SideBar.vue'
import TopBar from './components/TopBar.vue'
import TextInputAnalysis from './components/TextInputAnalysis.vue'

const app = createApp(App)
app.component('SideBar', SideBar)
app.component('TopBar', TopBar)
app.component('TextInputAnalysis', TextInputAnalysis)
app.use(router);
app.mount('#app')
