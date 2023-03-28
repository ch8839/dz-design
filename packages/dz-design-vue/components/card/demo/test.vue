<script lang="ts">
import { Card }from '@components/card'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
    Card
  }
})
</script>

<template>
  <div>
    <h2>card test</h2>
    <Card title="卡片1">
        卡片1内容
    </Card>
  </div>
</template>
