<template>
  <ion-page>
    <ion-content class="ion-padding">

      <h1>Login</h1>

      <ion-item>
        <ion-input
          v-model="email"
          label="Email"
          label-placement="floating"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="senha"
          label="Senha"
          label-placement="floating"
          type="password"
        />
      </ion-item>

      <ion-button
        expand="block"
        class="ion-margin-top"
        @click="entrar"
      >
        Entrar
      </ion-button>

      <ion-button
        expand="block"
        fill="outline"
        class="ion-margin-top"
        @click="router.push('/register')"
      >
        Cadastrar
      </ion-button>

      <ion-button
        expand="block"
        fill="clear"
        @click="router.push('/reset')"
      >
        Esqueci minha senha
      </ion-button>

      <ion-toast
        :is-open="mostrarToast"
        message="Login realizado com sucesso!"
        :duration="2000"
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

const { login } = useAuth()

const email = ref('')
const senha = ref('')

const mostrarToast = ref(false)

function entrar() {

  const usuario = login(
    email.value,
    senha.value
  )

  if (usuario) {

    mostrarToast.value = true

    setTimeout(() => {
      router.push('/tabs/tab1')
    }, 1000)

  } else {

    alert('Email ou senha incorretos')

  }
}
</script>