import { computed, defineComponent, toRefs, onMounted } from 'vue-demi'

import props from './props'
import './index.scss';

export default defineComponent({
  name: 'DzSwitch',
  // components: {
  //   'mtd-switch': Switch,
  // },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: props,
  setup(props: any, { slots, emit }: any) {
    onMounted(() => {
      console.log('>>>switch', props)
    })
    const changeValue = (value: boolean) => {
      console.log('>>>value', value)
      emit('update:modelValue', value)
    }
    return {
      changeValue,
    }
  },
  render() {
    const { modelValue, size, disabled, loading, changeValue } = this

    return (
      <div class={['switch-container']}>
        switch
      </div>
    )
  },
})
