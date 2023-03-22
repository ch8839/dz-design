import { computed, defineComponent, toRefs } from 'vue-demi';
// import './card.scss';

export default defineComponent({
  name: 'DZCard',
  setup(props: any, { slots }) {
    
    return () => (
      <div class={['card-container']}>
        card
      </div>
    );
  },
});
