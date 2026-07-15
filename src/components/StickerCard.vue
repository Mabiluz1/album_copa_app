<template>
  <ion-card class="sticker-card">
    <ion-img
      class="sticker-image"
      :src="figurinha.foto || fallbackImage"
      :alt="`Imagem da figurinha ${figurinha.nome}`"
    />

    <ion-card-header>
      <div class="card-heading">
        <div>
          <ion-card-title>{{ figurinha.nome }}</ion-card-title>
          <ion-card-subtitle>{{ figurinha.selecao }}</ion-card-subtitle>
        </div>
        <ion-button
          fill="clear"
          :color="figurinha.favorite ? 'danger' : 'medium'"
          :aria-label="figurinha.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
          @click="$emit('favorite')"
        >
          <ion-icon
            slot="icon-only"
            :icon="figurinha.favorite ? heart : heartOutline"
          />
        </ion-button>
      </div>
    </ion-card-header>

    <ion-card-content>
      <div class="badges">
        <ion-chip :color="rarityColor">
          <ion-icon :icon="sparklesOutline" />
          <ion-label>{{ figurinha.raridade }}</ion-label>
        </ion-chip>
        <ion-badge :color="figurinha.coletada ? 'success' : 'medium'">
          {{ figurinha.coletada ? 'Coletada' : 'Não coletada' }}
        </ion-badge>
      </div>

      <p v-if="figurinha.collected_at" class="collected-date">
        Coletada em {{ formatDate(figurinha.collected_at) }}
      </p>

      <ion-button
        expand="block"
        :color="figurinha.coletada ? 'medium' : 'primary'"
        @click="$emit('toggle')"
      >
        <ion-icon
          slot="start"
          :icon="figurinha.coletada ? removeCircleOutline : checkmarkCircleOutline"
        />
        {{ figurinha.coletada ? 'Marcar como faltante' : 'Marcar como coletada' }}
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonImg,
  IonLabel
} from '@ionic/vue'
import {
  checkmarkCircleOutline,
  heart,
  heartOutline,
  removeCircleOutline,
  sparklesOutline
} from 'ionicons/icons'
import type { Figurinha } from '@/models'

const fallbackImage = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

const props = defineProps<{
  figurinha: Figurinha
}>()

defineEmits<{
  (event: 'toggle'): void
  (event: 'favorite'): void
}>()

const rarityColor = computed(() => {
  switch (props.figurinha.raridade.toLowerCase()) {
    case 'brilhante':
      return 'warning'
    case 'rara':
      return 'tertiary'
    default:
      return 'primary'
  }
})

function formatDate(value: string): string {
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
.sticker-card {
  max-width: 520px;
  margin-inline: auto;
}

.sticker-image {
  height: 180px;
  object-fit: contain;
  padding-top: 16px;
}

.card-heading,
.badges {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.badges {
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.collected-date {
  color: var(--ion-color-medium);
  font-size: 0.9rem;
  margin: 8px 0 16px;
}
</style>
