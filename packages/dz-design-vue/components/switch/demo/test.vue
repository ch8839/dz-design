<script lang="ts">
import Switch from '../index'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
    'dz-switch':Switch
  }
})
</script>

<template>
  <div>
    <h2>Switch test</h2>
    <dz-switch></dz-switch>
  </div>
</template>
