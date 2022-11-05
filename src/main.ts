import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIncons from './global/register-icons'

createApp(App).use(registerIncons).use(pinia).use(router).mount('#app')
