import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import axios from 'axios'
import config from './config'
import request from './utils/request'

const app = createApp(App)
// 挂载用 $ 访问的全局变量
app.config.globalProperties.$request = request
app.use(router).use(ElementPlus).mount('#app')
