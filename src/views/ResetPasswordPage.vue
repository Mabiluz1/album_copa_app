<template>
  <ion-page>
    <ion-content class="ion-padding">

      <h1>Recuperar Senha</h1>

      <ion-item>
        <ion-input
          v-model="email"
          label="Email"
        />
      </ion-item>

      <ion-button
        expand="block"
        @click="enviar"
      >
        Enviar
      </ion-button>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
IonPage,
IonContent,
IonItem,
IonInput,
IonButton
} from '@ionic/vue'

import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { resetarSenha } = useAuth()

const email = ref('')

function enviar(){

  alert(
    resetarSenha(
      email.value
    )
  )
}
</script>