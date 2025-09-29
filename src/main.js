import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SideBar from './components/SideBar.vue'
import TopBar from './components/TopBar.vue'
import AnalyzeResult from './components/AnalyzeResult.vue'

const app = createApp(App)
app.component('SideBar', SideBar)
app.component('TopBar', TopBar)
app.component('AnalyzeResult', AnalyzeResult)
app.use(router);
app.mount('#app')
