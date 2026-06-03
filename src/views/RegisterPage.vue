<template>
  <ion-page>
    <ion-content class="ion-padding">

      <h1>Cadastro</h1>

      <ion-item>
        <ion-input
          v-model="nome"
          label="Nome"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="email"
          label="Email"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="senha"
          label="Senha"
          type="password"
        />
      </ion-item>

      <ion-button
        expand="block"
        @click="salvar"
      >
        Cadastrar
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

const { cadastrar } = useAuth()

const nome = ref('')
const email = ref('')
const senha = ref('')

function salvar(){

  if(senha.value.length < 6){
    alert('Senha muito fraca')
    return
  }

  cadastrar({
    nome: nome.value,
    email: email.value,
    senha: senha.value
  })

  alert('Cadastro realizado!')
}
</script>