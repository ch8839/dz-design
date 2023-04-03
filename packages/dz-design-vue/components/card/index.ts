import Card from './card'

Card.install = function (Vue: any) {
  Vue.component(Card.name, Card)
}
// export { Card }

export default Card
