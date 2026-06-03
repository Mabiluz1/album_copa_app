<template>

<ion-page>

  <ion-header>
    <ion-toolbar>
      <ion-title>
        Álbum da Copa
      </ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>

    <ion-card>

      <ion-card-header>
        <ion-card-title>
          Resumo
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>

        Total:
        {{ lista.length }}

        <br>

        Coletadas:
        {{ coletadas }}

      </ion-card-content>

    </ion-card>

    <StickerCard
  v-for="figurinha in lista"
  :key="figurinha.id"
  :figurinha="figurinha"
  @toggle="marcarColetada(figurinha.id)"
/>

  </ion-content>

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonContent,
IonHeader,
IonToolbar,
IonTitle,
IonCard,
IonCardHeader,
IonCardTitle,
IonCardContent
} from '@ionic/vue'

import StickerCard
from '@/components/StickerCard.vue'

import { computed } from 'vue'
import { useAlbum } from '@/composables/useAlbum'

const {
lista,
marcarColetada
}
= useAlbum()

const coletadas = computed(() =>
lista.value.filter(
item => item.coletada
).length
)

</script>