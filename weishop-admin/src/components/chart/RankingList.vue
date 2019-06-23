<template>
  <div class="rank">
   
    <div class="tool">
      <h4 class="title">{{title}}</h4>
      <a-range-picker :ranges="quickranges" :placeholder="['开始时间','结束时间']" style="width:220px;"></a-range-picker>
    </div>
    <ul v-if="list&&list.length>0" class="list">
      <li :key="index" v-for="(item, index) in list">
        <span :class="index < 3 ? 'active' : null">{{index + 1}}</span>
        <span>{{item.name}}</span>
        <span>{{item.agencyCount}}</span>
      </li>
    </ul>
    <div v-else><center>暂无数据</center></div>
  </div>
</template>

<script>
import moment from 'moment';
  export default {
    name: 'RankingList',
    props: ['title', 'list'],
    methods:{
      moment
    },
    data(){
      return {
          quickranges:{ '本周': [moment().subtract(6,'d'), moment()], '本月': [moment().startOf('month'), moment()] ,'上月':[moment().subtract(1,'month').startOf('month'),moment().subtract(1,'month').endOf('month')]},

      }
    },
  }

</script>

<style lang="less" scoped>
  .rank {
    padding: 0 32px 32px 72px;
.tool{
  display: grid;
  grid-template-columns: auto 250px;
}
.tool .quick{
  line-height: 32px;
}
    .title {}

    .list {
      margin: 25px 0 0;
      padding: 0;
      list-style: none;

      li {
        margin-top: 16px;

        span {
          color: rgba(0, 0, 0, .65);
          font-size: 14px;
          line-height: 22px;
        }

        span:first-child {
          background-color: #f5f5f5;
          border-radius: 20px;
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }

        span.active {
          background-color: #314659;
          color: #fff;
        }

        span:last-child {
          float: right;
        }
      }
    }
  }

</style>
