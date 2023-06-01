// import './assets/main.css'
import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

for (let i in Icons) {
    app.component(i, Icons[i])
}

app.mount('#app')
