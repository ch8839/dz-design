<script lang="ts">
import Card from '@component/card'
console.log('>>>card', Card)
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
    Card,
  },
})
</script>

<template>
  <div>
    <h2>card test</h2>
    <Card title="卡片2"> 卡片2内容 </Card>
  </div>
</template>
