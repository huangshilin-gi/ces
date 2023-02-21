import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import setConfig from './set.config'
import 'normalize.css'
import './index.css'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)

app.config.globalProperties.$setConfig = setConfig

app.use(router).use(createPinia()).mount('#app')
