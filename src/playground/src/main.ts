import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import './addMonacco'

const app = createApp(App)

app.use(router)

app.use(VueMonacoEditorPlugin, {
    paths: {
        // The recommended CDN config
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
    },
})

app.mount('#app')
