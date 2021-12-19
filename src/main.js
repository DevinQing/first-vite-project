import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request'
import storage from './utils/storage'
import store from './store'
import * as icons from '@element-plus/icons'

const app = createApp(App)

// 全局引用 icon
Object.keys(icons).forEach((key) => {
  app.component(key, icons[key])
})

// 挂载用 $ 访问的全局变量
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.use(router).use(ElementPlus, { size: 'small' }).use(store).mount('#app')
