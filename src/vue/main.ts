import { createApp } from 'vue'
import '../assets/styles/style.css'
import App from './App.vue'

export default function initVue() {
  createApp(App).mount('#app')
}
