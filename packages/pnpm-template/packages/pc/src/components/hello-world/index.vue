<template>
  <div>
    <span>{{ msg }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const msg = 'hello world!'
    return {
      msg,
    }
  },
})
</script>
