<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Álbum da Copa</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          placeholder="Buscar jogador, seleção ou raridade"
          :debounce="300"
          @ionInput="onSearch"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-segment
        :value="filtroAtual"
        :scrollable="true"
        @ionChange="onFilterChange"
      >
        <ion-segment-button value="todas">
          <ion-label>Todas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="coletadas">
          <ion-label>Coletadas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="pendentes">
          <ion-label>Faltantes</ion-label>
        </ion-segment-button>
        <ion-segment-button value="favoritas">
          <ion-label>Favoritas</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Resultado</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ lista.length }} figurinha(s) encontrada(s) no banco de dados.
        </ion-card-content>
      </ion-card>

      <ion-spinner v-if="carregando" class="centered" />
      <ion-text v-else-if="erro" color="danger">
        <p class="empty-state">{{ erro }}</p>
      </ion-text>
      <ion-text v-else-if="lista.length === 0" color="medium">
        <p class="empty-state">Nenhuma figurinha corresponde aos filtros.</p>
      </ion-text>

      <sticker-card
        v-for="figurinha in lista"
        v-else
        :key="figurinha.id"
        :figurinha="figurinha"
        @toggle="marcarColetada(figurinha.id)"
        @favorite="alternarFavorita(figurinha.id)"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  onIonViewWillEnter
} from '@ionic/vue'
import StickerCard from '@/components/StickerCard.vue'
import { useAlbum } from '@/composables/useAlbum'
import type { FiltroFigurinha } from '@/models'

const {
  lista,
  carregando,
  erro,
  filtroAtual,
  carregarFigurinhas,
  carregarPorFiltro,
  pesquisar,
  marcarColetada,
  alternarFavorita
} = useAlbum()

onIonViewWillEnter(() => carregarFigurinhas())

function onSearch(event: CustomEvent): void {
  pesquisar(String(event.detail.value ?? ''))
}

function onFilterChange(event: CustomEvent): void {
  carregarPorFiltro(event.detail.value as FiltroFigurinha)
}
</script>

<style scoped>
.centered {
  display: block;
  margin: 40px auto;
}

.empty-state {
  text-align: center;
  margin: 40px 16px;
}
</style>
