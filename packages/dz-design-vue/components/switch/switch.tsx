import { computed, defineComponent, toRefs, onMounted } from 'vue-demi'
import '@ss/mtd-vue2/lib/theme-chalk/switch.css'
import Switch from '@ss/mtd-vue2/es/switch'

import props from './props'
// import './index.scss';

export default defineComponent({
  name: 'DZSwitch',
  components: {
    'mtd-switch': Switch
  },
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
      changeValue
    }
  },
  render() {
    const { modelValue, size, disabled, loading, changeValue } = this
    console.log('>>>this', this)
    return  (
      <div class={['switch-container']}>
        <mtd-switch modelValue={modelValue} onInput={changeValue} disabled={disabled}>
        </mtd-switch>
      </div>
    );
  }
});
