<template>
  <ion-page>
    <ion-content class="ion-padding">

      <h1>Recuperar Senha</h1>

      <p>
        Informe o e-mail cadastrado para receber as instruções de recuperação.
      </p>

      <ion-item>
        <ion-input
          v-model="email"
          label="E-mail"
          label-placement="floating"
          type="email"
        />
      </ion-item>

      <ion-button
        expand="block"
        class="ion-margin-top"
        @click="enviar"
      >
        Enviar
      </ion-button>

      <ion-button
        expand="block"
        fill="outline"
        class="ion-margin-top"
        @click="router.push('/login')"
      >
        Voltar ao Login
      </ion-button>

      <ion-toast
        :is-open="mostrarToast"
        :message="mensagem"
        :duration="2500"
        @didDismiss="mostrarToast = false"
      />

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonToast
} from '@ionic/vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()

const { resetarSenha } = useAuth()

const email = ref('')

const mostrarToast = ref(false)
const mensagem = ref('')

async function enviar(): Promise<void> {

  if (!email.value) {
    alert('Informe um e-mail.')
    return
  }

  mensagem.value = await resetarSenha(email.value)

  mostrarToast.value = true

}
</script>