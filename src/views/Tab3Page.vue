<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Estatísticas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-spinner v-if="carregando" class="centered" />
      <ion-text v-else-if="erro" color="danger">
        <p class="centered-text">{{ erro }}</p>
      </ion-text>

      <template v-else>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Progresso do álbum</ion-card-title>
            <ion-card-subtitle>
              {{ estatisticas.coletadas }} de {{ estatisticas.total }} figurinhas
            </ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <strong class="percentage">{{ estatisticas.percentual.toFixed(1) }}%</strong>
            <ion-progress-bar :value="estatisticas.percentual / 100" />
          </ion-card-content>
        </ion-card>

        <div class="stats-grid">
          <ion-card>
            <ion-card-content>
              <ion-icon :icon="albumsOutline" color="secondary" />
              <strong>{{ estatisticas.total }}</strong>
              <span>Total cadastrado</span>
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-content>
              <ion-icon :icon="albumsOutline" color="primary" />
              <strong>{{ estatisticas.coletadas }}</strong>
              <span>Coletadas</span>
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-content>
              <ion-icon :icon="albumsOutline" color="medium" />
              <strong>{{ estatisticas.faltantes }}</strong>
              <span>Faltantes</span>
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-content>
              <ion-icon :icon="diamondOutline" color="tertiary" />
              <strong>{{ estatisticas.raras }}</strong>
              <span>Raras coletadas</span>
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-content>
              <ion-icon :icon="sparklesOutline" color="warning" />
              <strong>{{ estatisticas.brilhantes }}</strong>
              <span>Brilhantes coletadas</span>
            </ion-card-content>
          </ion-card>
        </div>

        <ion-card>
          <ion-card-header>
            <div class="ranking-heading">
              <div>
                <ion-card-subtitle>Ranking pessoal</ion-card-subtitle>
                <ion-card-title>Nível {{ ranking.nivel }}</ion-card-title>
              </div>
              <ion-badge color="secondary">{{ ranking.pontos }} pontos</ion-badge>
            </div>
          </ion-card-header>
          <ion-card-content>
            <ion-progress-bar :value="ranking.progresso" color="secondary" />
            <p v-if="ranking.proximoNivel !== null">
              Faltam <strong>{{ ranking.pontosRestantes }} pontos</strong> para o próximo nível.
            </p>
            <p v-else>Você alcançou o nível máximo.</p>
            <ion-note>
              Pontuação: comum = 1 ponto, rara = 5 pontos e brilhante = 10 pontos.
            </ion-note>
          </ion-card-content>
        </ion-card>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonNote,
  IonPage,
  IonProgressBar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  onIonViewWillEnter
} from '@ionic/vue'
import { albumsOutline, diamondOutline, sparklesOutline } from 'ionicons/icons'
import { useStatistics } from '@/composables/useStatistics'

const {
  estatisticas,
  ranking,
  carregando,
  erro,
  carregarEstatisticas
} = useStatistics()

onIonViewWillEnter(carregarEstatisticas)
</script>

<style scoped>
.centered {
  display: block;
  margin: 48px auto;
}

.centered-text {
  text-align: center;
}

.percentage {
  display: block;
  font-size: 2rem;
  margin-bottom: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.stats-grid ion-card-content {
  min-height: 135px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
}

.stats-grid ion-icon {
  font-size: 1.7rem;
}

.stats-grid strong {
  font-size: 1.65rem;
}

.ranking-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

ion-progress-bar {
  height: 10px;
  border-radius: 10px;
}
</style>
