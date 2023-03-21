<template>
  <div class="home">
    <img alt="Rome logo" src="../../../assets/logo.png" width="200px" height="200px" />
    <h1>Welcome to Your Rome App</h1>
    <mtd-button class="btn-demo-item" type="primary" size="large">
      <a href="https://sky.sankuai.com/docs/nibfe/rome-doc/" target="_blank" rel="noopener"
        >快速开始</a
      >
    </mtd-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Home',
})
</script>
<style lang="scss" scoped>
.home {
  text-align: center;
  margin-top: 60px;
}
a {
  color: #fff;
  text-decoration: none;
}
</style>
