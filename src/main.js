

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// je crée un variable qui va stocké le lien de mon api
app.config.globalProperties.API_URL ="http://127.0.0.1:8000/api";

app.use(router)

app.mount('#app')
