<template>
  <div style="">
    <!-- <a-radio-group>
      <a-radio-button value="a">全渠道</a-radio-button>
      <a-radio-button value="b">线上</a-radio-button>
      <a-radio-button value="c">门店</a-radio-button>
    </a-radio-group> -->
    <h4>{{title}}</h4>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" position="right" :offsetX="-140" />
      <v-pie position="percent" color="item" :vStyle="pieStyle" :label="labelConfig" />
      <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
    </v-chart>
  </div>
</template>

<script>
  const DataSet = require('@antv/data-set')

  const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }]




  export default {
    name: 'SalesData',
    props: ['title', 'source'],
    mounted(){
      this.transform();
    },
    methods: {
      transform() {
        if (this.source) {
          const dv = new DataSet.View().source(this.source);
          dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
          })
         this.data = dv.rows
        }
      }
    },
    data() {
      return {
        data: [],
        scale,
        height: 356,
        pieStyle: {
          stroke: '#fff',
          lineWidth: 1
        },
        labelConfig: ['percent', {
          formatter: (val, item) => {
            return item.point.item + ': ' + val
          }
        }]
      }
    }
  }

</script>

<style scoped>

</style>
