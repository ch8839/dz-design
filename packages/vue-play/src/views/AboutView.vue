<template>
  <div class="about">
    <div class="left-container">
      <h1>This is an about page</h1>
      <Card></Card>
    </div>

    <TheWelcome />
  </div>
</template>

<script lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { Card } from '@my-test/dz-design-vue/index'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
    Card,
    TheWelcome
  },
})
</script>
<style>
.left-container {
  margin-right: 100px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
