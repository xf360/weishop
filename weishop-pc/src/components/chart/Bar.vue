<template>
  <div >
    <h4>{{title}}</h4>
    <v-chart :force-fit="true" height="351" :data="data">
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y"/>
    </v-chart>
  </div>
</template>

<script>

// const data = []
// for (let i = 0; i < 12; i += 1) {
//   data.push({
//     x: `${i + 1}月`,
//     y: Math.floor(Math.random() * 1000) + 200
//   })
// }
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]

const scale = [{
  dataKey: 'x',
  title: '日期',
}, {
  dataKey: 'y',
  title: '人数',
}]
export default {
  name: 'Bar',
  props: ['title','data'],
  data () {
    return {
      scale,
      tooltip
    }
  }
}
</script>

<style scoped>

</style>
