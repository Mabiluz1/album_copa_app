<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-avatar class="profile-avatar">
            <div>{{ initials }}</div>
          </ion-avatar>
          <ion-card-title>{{ usuarioLogado?.nome }}</ion-card-title>
          <ion-card-subtitle>{{ usuarioLogado?.email }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>
            Sua sessão e a evolução do álbum ficam salvas no banco de dados do aplicativo.
          </p>
        </ion-card-content>
      </ion-card>

      <ion-list inset>
        <ion-item button detail @click="router.push('/tabs/about')">
          <ion-icon slot="start" :icon="informationCircleOutline" />
          <ion-label>
            <h2>Sobre o aplicativo</h2>
            <p>Versão, termos de uso e privacidade</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-button expand="block" color="danger" fill="outline" @click="sair">
        <ion-icon slot="start" :icon="logOutOutline" />
        Sair
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
import { informationCircleOutline, logOutOutline } from 'ionicons/icons'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { usuarioLogado, logout } = useAuth()

const initials = computed(() => {
  const parts = usuarioLogado.value?.nome.trim().split(/\s+/).filter(Boolean) ?? []
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'AC'
})

async function sair(): Promise<void> {
  await logout()
  await router.replace('/login')
}
</script>

<style scoped>
ion-card-header {
  text-align: center;
}

.profile-avatar {
  margin: 8px auto 16px;
}

.profile-avatar div {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--ion-color-primary-contrast);
  background: var(--ion-color-primary);
  font-weight: 700;
}
</style>
