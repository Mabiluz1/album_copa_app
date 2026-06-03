<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Coleção</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>

      <ion-segment v-model="filtro">

        <ion-segment-button value="todas">
          <ion-label>Todas</ion-label>
        </ion-segment-button>

        <ion-segment-button value="coletadas">
          <ion-label>Coletadas</ion-label>
        </ion-segment-button>

        <ion-segment-button value="pendentes">
          <ion-label>Pendentes</ion-label>
        </ion-segment-button>

      </ion-segment>

      <StickerCard
  v-for="figurinha in listaFiltrada"
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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/vue'

import { ref, computed } from 'vue'
import StickerCard from '@/components/StickerCard.vue'
import { useAlbum } from '@/composables/useAlbum'

const {
  lista,
  marcarColetada
} = useAlbum()

const filtro = ref('todas')

const listaFiltrada = computed(() => {

  if (filtro.value === 'coletadas') {
    return lista.value.filter(
      item => item.coletada
    )
  }

  if (filtro.value === 'pendentes') {
    return lista.value.filter(
      item => !item.coletada
    )
  }

  return lista.value

})
</script>