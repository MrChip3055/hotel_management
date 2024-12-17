import { createApp } from 'vue';
import 'mdui/mdui.css';
import 'mdui';
import App from './App.vue';
import router from './router'; // 导入路由配置
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router); // 挂载路由
app.use(ElementPlus);
app.mount('#app');
