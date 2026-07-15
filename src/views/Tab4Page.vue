<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Conquistas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="summary-card">
        <ion-card-content>
          <div>
            <strong>{{ desbloqueadas }}/{{ conquistas.length }}</strong>
            <span>insígnias desbloqueadas</span>
          </div>
          <ion-progress-bar
            color="success"
            :value="conquistas.length ? desbloqueadas / conquistas.length : 0"
          />
        </ion-card-content>
      </ion-card>

      <ion-spinner v-if="carregando" class="centered" />

      <ion-card
        v-for="conquista in conquistas"
        v-else
        :key="conquista.id"
        :class="{ locked: !conquista.desbloqueada }"
      >
        <ion-card-header>
          <div class="achievement-heading">
            <div class="achievement-icon" :class="{ unlocked: conquista.desbloqueada }">
              <ion-icon :icon="achievementIcon(conquista.icone)" />
            </div>
            <div class="achievement-copy">
              <ion-card-title>{{ conquista.nome }}</ion-card-title>
              <ion-card-subtitle>{{ conquista.descricao }}</ion-card-subtitle>
            </div>
            <ion-badge :color="conquista.desbloqueada ? 'success' : 'medium'">
              {{ conquista.desbloqueada ? 'Desbloqueada' : 'Bloqueada' }}
            </ion-badge>
          </div>
        </ion-card-header>

        <ion-card-content>
          <ion-progress-bar
            :color="conquista.desbloqueada ? 'success' : 'primary'"
            :value="conquista.progresso_percentual"
          />
          <div class="achievement-footer">
            <ion-note>
              Progresso: {{ formatProgress(conquista.progresso_atual) }} / {{ conquista.meta }}
            </ion-note>
            <ion-note v-if="conquista.data_desbloqueio" color="success">
              Desbloqueada em {{ formatDate(conquista.data_desbloqueio) }}
            </ion-note>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
  IonTitle,
  IonToolbar,
  onIonViewWillEnter
} from '@ionic/vue'
import {
  albumsOutline,
  constructOutline,
  diamondOutline,
  flagOutline,
  medalOutline,
  ribbonOutline,
  sparklesOutline,
  starHalfOutline,
  starOutline,
  trendingUpOutline,
  trophyOutline
} from 'ionicons/icons'
import { useAchievements } from '@/composables/useAchievements'

const { conquistas, carregando, verificarConquistas } = useAchievements()

const desbloqueadas = computed(
  () => conquistas.value.filter((item) => item.desbloqueada === 1).length
)

const icons: Record<string, string> = {
  'ribbon-outline': ribbonOutline,
  'medal-outline': medalOutline,
  'albums-outline': albumsOutline,
  'construct-outline': constructOutline,
  'star-outline': starOutline,
  'star-half-outline': starHalfOutline,
  'sparkles-outline': sparklesOutline,
  'diamond-outline': diamondOutline,
  'trending-up-outline': trendingUpOutline,
  'trophy-outline': trophyOutline,
  'flag-outline': flagOutline
}

onIonViewWillEnter(verificarConquistas)

function achievementIcon(name: string): string {
  return icons[name] ?? ribbonOutline
}

function formatDate(value: string): string {
  const normalized = value.includes('T') ? value : value.replace(' ', 'T')
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date)
}

function formatProgress(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}
</script>

<style scoped>
.centered {
  display: block;
  margin: 48px auto;
}

.summary-card strong,
.summary-card span {
  display: block;
}

.summary-card strong {
  font-size: 1.8rem;
}

.summary-card ion-progress-bar {
  margin-top: 14px;
}

.achievement-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}

.achievement-copy {
  flex: 1;
  min-width: 0;
}

.achievement-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--ion-color-light-shade);
  color: var(--ion-color-medium);
  font-size: 1.7rem;
}

.achievement-icon.unlocked {
  background: var(--ion-color-warning-tint);
  color: var(--ion-color-warning-contrast);
}

.locked {
  opacity: 0.78;
}

.achievement-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

ion-progress-bar {
  height: 8px;
  border-radius: 8px;
}

@media (max-width: 520px) {
  .achievement-heading {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .achievement-copy {
    min-width: 180px;
  }
}
</style>
