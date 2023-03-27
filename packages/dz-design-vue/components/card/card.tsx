import { computed, defineComponent, toRefs, onMounted } from 'vue-demi';
// import './index.scss';

export default defineComponent({
  name: 'DZCard',
  setup(props: any, { slots }) {
    onMounted(() => {
      console.log('>>>card')
    })
  },
  render() {
    return  (
      <div class={['card-container']}>
        card
      </div>
    );
  }
});
