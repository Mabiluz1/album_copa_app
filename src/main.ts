import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonicVue } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'
import { defineCustomElements as defineJeepSqlite } from 'jeep-sqlite/loader'
import { initDatabase } from '@/services/database'

import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'
import '@ionic/vue/css/palettes/dark.system.css'
import './theme/variables.css'

async function bootstrap(): Promise<void> {
  if (Capacitor.getPlatform() === 'web') {
    defineJeepSqlite(window)
    await customElements.whenDefined('jeep-sqlite')

    if (!document.querySelector('jeep-sqlite')) {
      const jeepSqlite = document.createElement('jeep-sqlite')
      jeepSqlite.setAttribute('autoSave', 'true')
      document.body.appendChild(jeepSqlite)
    }
  }

  await initDatabase()

  const app = createApp(App)
    .use(IonicVue)
    .use(router)

  await router.isReady()
  app.mount('#app')
}

bootstrap().catch((error) => {
  console.error('Falha ao iniciar o aplicativo:', error)
  const root = document.querySelector('#app')
  if (root) {
    root.innerHTML = '<p style="padding:24px;font-family:sans-serif">Não foi possível inicializar o banco de dados.</p>'
  }
})
