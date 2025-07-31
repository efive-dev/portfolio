<template>
  <div class="fixed inset-0 w-screen h-screen overflow-hidden -z-10">
    <Beams
      :beam-width="2"
      :beam-height="30"
      :beam-number="12"
      :light-color="'#C6E2FF'"
      :speed="6"
      :noise-intensity="1.75"
      :scale="0.2"
      :rotation="45"
    />
  </div>
</template>

<script setup lang="ts">
import Beams from "./components/BeamsBackground.vue";
</script>
