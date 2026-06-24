<template>
  <ion-card>

    <img :src="figurinha.foto" alt="Jogador" />

    <ion-card-header>
      <ion-card-title>
        {{ figurinha.nome }}
      </ion-card-title>

      <ion-card-subtitle>
        {{ figurinha.selecao }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>

      <ion-badge
        :color="figurinha.coletada ? 'success' : 'danger'"
      >
        {{ figurinha.coletada ? 'Coletada' : 'Pendente' }}
      </ion-badge>

      <ion-button
        expand="block"
        class="ion-margin-top"
        @click="emit('toggle')"
      >
        Alterar Status
      </ion-button>

    </ion-card-content>

  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonButton
} from '@ionic/vue'

interface Figurinha {
  id: number
  nome: string
  selecao: string
  foto: string
  coletada: boolean
}

defineProps<{
  figurinha: Figurinha
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<style scooped>


</style>