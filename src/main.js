import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createMetaManager } from 'vue-meta';

const app = createApp(App);
const metaManager = createMetaManager();
app.use(router);
app.use(metaManager);
app.mount('#app');