import { computed, defineComponent, toRefs, onMounted } from 'vue-demi';
// import './index.scss';

export default defineComponent({
  name: 'DZSwitch',
  setup(props: any, { slots }) {
    onMounted(() => {
      console.log('>>>switch')
    })
  },
  render() {
    return  (
      <div class={['switch-container']}>
        switch
      </div>
    );
  }
});
