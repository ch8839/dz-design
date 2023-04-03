import { computed, defineComponent, toRefs, onMounted } from 'vue-demi'
import { Card } from '@ss/mtd-vue2'

import props from './props'
// import './index.scss';

export default defineComponent({
  name: 'DzCard',
  components: {
    Card,
  },
  props: props,
  setup(props: any, { slots }: any) {
    onMounted(() => {
      console.log('>>>card', slots)
    })
  },
  render() {
    const { title } = this
    return (
      <div class={['card-container']}>
        <Card title={title}>{this.$slots.default}</Card>
      </div>
    )
  },
})
