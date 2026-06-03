<template>
  <div>

    <StickerCard
      v-for="figurinha in figurinhas"
      :key="figurinha.id"
      :figurinha="figurinha"
      @toggle="emit('toggle', figurinha.id)"
    />

  </div>
</template>

<script setup lang="ts">
import StickerCard from './StickerCard.vue'

defineProps<{
  figurinhas: any[]
}>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
}>()
</script>