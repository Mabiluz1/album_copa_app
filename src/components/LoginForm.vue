<template>
  <div>

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
      @click="entrar"
    >
      Entrar
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

const emit = defineEmits<{
  (
    e:'login',
    email:string,
    senha:string
  ):void
}>()

const email = ref('')
const senha = ref('')

function entrar(){
  emit(
    'login',
    email.value,
    senha.value
  )
}
</script>