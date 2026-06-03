<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sobre</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Álbum Digital da Copa
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>

          Projeto desenvolvido em
          Vue + Ionic.

          <br><br>

         Codificar aplicações para dispositivos móveis

          <br><br>

          Aluno: Amábile Luz

        </ion-card-content>
      </ion-card>

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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue'
</script>