<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Coleção</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Histórico recente</ion-card-title>
          <ion-card-subtitle>Últimas 10 figurinhas coletadas</ion-card-subtitle>
        </ion-card-header>
        <ion-list v-if="recentes.length">
          <ion-item v-for="figurinha in recentes" :key="`recent-${figurinha.id}`">
            <ion-label>
              <h2>{{ figurinha.nome }}</h2>
              <p>{{ figurinha.selecao }} · {{ figurinha.raridade }}</p>
            </ion-label>
            <ion-note slot="end">{{ formatDate(figurinha.collected_at) }}</ion-note>
          </ion-item>
        </ion-list>
        <ion-card-content v-else>
          Nenhuma figurinha foi coletada ainda.
        </ion-card-content>
      </ion-card>

      <ion-segment
        :value="filtroAtual"
        :scrollable="true"
        @ionChange="onFilterChange"
      >
        <ion-segment-button value="coletadas">
          <ion-label>Coletadas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="favoritas">
          <ion-label>Favoritas</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-item lines="none">
        <ion-select
          label="Ordenar"
          label-placement="stacked"
          :value="ordenacaoAtual"
          @ionChange="onOrderChange"
        >
          <ion-select-option value="coleta_recente">Mais recentes</ion-select-option>
          <ion-select-option value="coleta_antiga">Mais antigas</ion-select-option>
          <ion-select-option value="numero">Número da figurinha</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-spinner v-if="carregando" class="centered" />
      <ion-text v-else-if="lista.length === 0" color="medium">
        <p class="empty-state">Nenhuma figurinha encontrada nesta seção.</p>
      </ion-text>

      <sticker-card
        v-for="figurinha in lista"
        v-else
        :key="figurinha.id"
        :figurinha="figurinha"
        @toggle="onToggle(figurinha.id)"
        @favorite="onFavorite(figurinha.id)"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  onIonViewWillEnter
} from '@ionic/vue'
import StickerCard from '@/components/StickerCard.vue'
import { useAlbum } from '@/composables/useAlbum'
import type { FiltroFigurinha, OrdenacaoFigurinha } from '@/models'

const {
  lista,
  recentes,
  carregando,
  filtroAtual,
  ordenacaoAtual,
  carregarFigurinhas,
  carregarPorFiltro,
  ordenar,
  marcarColetada,
  alternarFavorita,
  carregarRecentes
} = useAlbum()

async function refresh(): Promise<void> {
  if (filtroAtual.value === 'todas') filtroAtual.value = 'coletadas'
  if (ordenacaoAtual.value === 'numero') ordenacaoAtual.value = 'coleta_recente'
  await Promise.all([carregarFigurinhas(), carregarRecentes()])
}

onIonViewWillEnter(refresh)

function onFilterChange(event: CustomEvent): void {
  carregarPorFiltro(event.detail.value as FiltroFigurinha)
}

function onOrderChange(event: CustomEvent): void {
  ordenar(event.detail.value as OrdenacaoFigurinha)
}

async function onToggle(id: number): Promise<void> {
  await marcarColetada(id)
  await carregarRecentes()
}

async function onFavorite(id: number): Promise<void> {
  await alternarFavorita(id)
  await carregarRecentes()
}

function formatDate(value: string | null): string {
  if (!value) return ''
  const normalized = value.includes('T') ? value : value.replace(' ', 'T')
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date)
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
