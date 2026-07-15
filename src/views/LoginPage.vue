<template>
  <ion-page>
    <ion-content class="ion-padding auth-content">
      <div class="auth-container">
        <h1>Álbum da Copa</h1>
        <p>Entre para acessar sua coleção persistida.</p>

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
            autocomplete="current-password"
          />
        </ion-item>

        <ion-button
          expand="block"
          class="ion-margin-top"
          :disabled="carregando"
          @click="entrar"
        >
          <ion-spinner v-if="carregando" name="crescent" />
          <span v-else>Entrar</span>
        </ion-button>

        <ion-button
          expand="block"
          fill="outline"
          class="ion-margin-top"
          @click="router.push('/register')"
        >
          Criar conta
        </ion-button>

        <ion-button expand="block" fill="clear" @click="router.push('/reset')">
          Esqueci minha senha
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
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonToast
} from '@ionic/vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { login } = useAuth()

const email = ref('')
const senha = ref('')
const carregando = ref(false)
const mostrarToast = ref(false)
const mensagem = ref('')
const sucesso = ref(false)

async function entrar(): Promise<void> {
  if (!email.value.trim() || !senha.value) {
    sucesso.value = false
    mensagem.value = 'Preencha o e-mail e a senha.'
    mostrarToast.value = true
    return
  }

  carregando.value = true
  const resultado = await login(email.value, senha.value)
  carregando.value = false
  sucesso.value = resultado.sucesso
  mensagem.value = resultado.sucesso
    ? 'Login realizado com sucesso.'
    : (resultado.mensagem ?? 'Não foi possível realizar o login.')
  mostrarToast.value = true

  if (resultado.sucesso) {
    const redirect = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : '/tabs/tab1'
    await router.replace(redirect)
  }
}
</script>

<style scoped>
.auth-content {
  --background: var(--ion-color-light);
}

.auth-container {
  max-width: 460px;
  margin: 12vh auto 0;
  padding: 24px;
  border-radius: 18px;
  background: var(--ion-background-color);
  box-shadow: 0 12px 32px rgb(0 0 0 / 10%);
}

h1 {
  margin-bottom: 4px;
}

p {
  color: var(--ion-color-medium);
  margin-top: 0;
  margin-bottom: 24px;
}
</style>
