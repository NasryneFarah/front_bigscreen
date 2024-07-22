

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

// je crée un variable qui va stocké le lien de mon api
app.config.globalProperties.API_URL ="http://127.0.0.1:8000/api";

app.use(router)
app.use(PrimeVue)
app.mount('#app')
