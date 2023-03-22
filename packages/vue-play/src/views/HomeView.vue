<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
    TheWelcome
  }
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
