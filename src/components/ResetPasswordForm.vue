<template>
  <div>

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
      Recuperar Senha
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
  'reset'
])

const email = ref('')

function enviar(){
  emit(
    'reset',
    email.value
  )
}
</script>