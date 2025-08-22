import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import App from './App.vue'
import { theme } from './primevue'
import router from './router'
import 'uno.css'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: theme,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
    },

  },
})
app.use(ToastService)
app.mount('#app')
