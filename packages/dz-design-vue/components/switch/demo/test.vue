<script lang="ts">
import { Switch }from '@components/switch'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
    'dz-switch':Switch
  },
  data() {
    return {
      value1: true,
      value2: true
    }
  }
})
</script>

<template>
  <div>
    <h2>Switch test</h2>
    <dz-switch v-model="value1"></dz-switch>
    <dz-switch v-model="value2" disabled></dz-switch>
  </div>
</template>
