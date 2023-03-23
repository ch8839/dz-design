import { computed, defineComponent, toRefs, onMounted } from 'vue-demi';
import './card.scss';

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
