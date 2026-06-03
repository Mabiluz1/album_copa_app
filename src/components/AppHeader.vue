<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>
        {{ titulo }}
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/vue'

defineProps<{
  titulo: string
}>()
</script>