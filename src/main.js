import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request'
import storage from './utils/storage'
// import '../src/assets/style/index.scss'
// import '../src/assets/style/reset.css'

const app = createApp(App)
// 挂载用 $ 访问的全局变量
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage

app.use(router).use(ElementPlus).mount('#app')
