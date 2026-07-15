<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/login" />
        </ion-buttons>
        <ion-title>Criar conta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="form-container">
        <ion-item>
          <ion-input
            v-model="nome"
            label="Nome"
            label-placement="floating"
            autocomplete="name"
          />
        </ion-item>

        <ion-item>
          <ion-input
            v-model="email"
            label="E-mail"
            label-placement="floating"
            type="email"
            autocomplete="email"
          />
        </ion-item>

        <ion-item>
          <ion-input
            v-model="senha"
            label="Senha"
            label-placement="floating"
            type="password"
            autocomplete="new-password"
            helper-text="Use pelo menos 6 caracteres."
          />
        </ion-item>

        <ion-button
          expand="block"
          class="ion-margin-top"
          :disabled="carregando"
          @click="salvar"
        >
          <ion-spinner v-if="carregando" name="crescent" />
          <span v-else>Cadastrar</span>
        </ion-button>
      </div>

      <ion-toast
        :is-open="mostrarToast"
        :message="mensagem"
        :color="sucesso ? 'success' : 'danger'"
        :duration="2200"
        @didDismiss="mostrarToast = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { cadastrar } = useAuth()

const nome = ref('')
const email = ref('')
const senha = ref('')
const carregando = ref(false)
const mostrarToast = ref(false)
const mensagem = ref('')
const sucesso = ref(false)

function emailValido(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function salvar(): Promise<void> {
  if (!nome.value.trim() || !email.value.trim() || !senha.value) {
    sucesso.value = false
    mensagem.value = 'Preencha todos os campos.'
    mostrarToast.value = true
    return
  }

  if (!emailValido(email.value.trim())) {
    sucesso.value = false
    mensagem.value = 'Informe um e-mail válido.'
    mostrarToast.value = true
    return
  }

  if (senha.value.length < 6) {
    sucesso.value = false
    mensagem.value = 'A senha deve possuir no mínimo 6 caracteres.'
    mostrarToast.value = true
    return
  }

  carregando.value = true
  const resultado = await cadastrar({
    nome: nome.value,
    email: email.value,
    senha: senha.value
  })
  carregando.value = false
  sucesso.value = resultado.sucesso
  mensagem.value = resultado.mensagem
  mostrarToast.value = true

  if (resultado.sucesso) {
    await router.replace('/login')
  }
}
</script>

<style scoped>
.form-container {
  max-width: 460px;
  margin: 8vh auto 0;
}
</style>
