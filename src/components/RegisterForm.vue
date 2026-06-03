<template>
  <div>

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
      @click="cadastrar"
    >
      Cadastrar
    </ion-button>

  </div>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonInput,
  IonButton
} from '@ionic/vue'

import { ref } from 'vue'

const emit = defineEmits([
  'register'
])

const nome = ref('')
const email = ref('')
const senha = ref('')

function cadastrar(){

  emit(
    'register',
    {
      nome: nome.value,
      email: email.value,
      senha: senha.value
    }
  )

}
</script>