<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab5" />
        </ion-buttons>
        <ion-title>Sobre</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Álbum Digital da Copa</ion-card-title>
          <ion-card-subtitle>Versão {{ appVersion }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>
            Aplicativo para acompanhar a coleção de figurinhas, visualizar
            estatísticas, marcar favoritas e desbloquear conquistas.
          </p>
          <p>Desenvolvido com Vue, Ionic e SQLite.</p>
        </ion-card-content>
      </ion-card>

      <ion-list inset>
        <ion-item button detail router-link="/terms">
          <ion-icon slot="start" :icon="documentTextOutline" />
          <ion-label>Termos de Uso</ion-label>
        </ion-item>
        <ion-item button detail router-link="/privacy">
          <ion-icon slot="start" :icon="shieldCheckmarkOutline" />
          <ion-label>Política de Privacidade</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
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
import { documentTextOutline, shieldCheckmarkOutline } from 'ionicons/icons'

const appVersion = '1.0.0'
</script>
