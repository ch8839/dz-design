<script lang="ts">
// import { Card } from '@my-test/dz-design-vue'

import TheWelcome from '../components/TheWelcome.vue'
import { Card } from '@my-test/dz-design-vue'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
    Card,
    TheWelcome
  }
})
</script>

<template>
  <main>
    <Card></Card>
    12
    <TheWelcome />
  </main>
</template>
