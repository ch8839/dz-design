<script lang="ts">
import { defineComponent } from 'vue-demi'
import { componentRoutes } from '../router/routes'

export default defineComponent({
  data() {
    return {
      componentRoutes,
    }
  },
})
</script>

<template>
  <main class="main-container">
    <div v-for="(item, index) of componentRoutes" :key="index" class="link-cell">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </div>
  </main>
</template>

<style lang="scss">
.main-container {
  .link-cell {
    width: 300px;
    height: 100px;
    padding: 10px;
  }
}
</style>
