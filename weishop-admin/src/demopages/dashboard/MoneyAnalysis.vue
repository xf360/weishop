<template>
  <div>
    <a-row style="margin: 0 -12px">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总销售额（元）" :total="allcount.totalSaleAmout" :hidecontent="true">
          <a-tooltip title="总销售额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总充值金额（元）" :total="allcount.totalPrePayAmout" :hidecontent="true">
          <a-tooltip title="总充值金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总提现金额（元）" :total="allcount.totalWithDrawalAmout" :hidecontent="true">
          <a-tooltip title="总提现金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总保证金额（元）" :total="allcount.totalDeposite" :hidecontent="true">
          <a-tooltip title="总保证金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总奖励金额（元）" :total="allcount.totalRewardAmount" :hidecontent="true">
          <a-tooltip title="总奖励金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总推荐将金额（元）" :total="allcount.totalInviteAmout" :hidecontent="true">
          <a-tooltip title="总推荐将金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总提货奖金额（元）" :total="allcount.totalOrderOutBonusAmout" :hidecontent="true">
          <a-tooltip title="总提货奖金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总销售返点奖金额（元）" :total="allcount.totalTeamDisAmout" :hidecontent="true">
          <a-tooltip title="总销售返点奖金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="代理总余额（元）" :total="allcount.totalAgencyBlance" :hidecontent="true">
          <a-tooltip title="代理总余额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="代理总货款（元）" :total="allcount.totalAgencyPayment" :hidecontent="true">
          <a-tooltip title="代理总货款（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="平台余额（元）" :total="allcount.totalSystemBlance" :hidecontent="true">
          <a-tooltip title="平台余额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="平台留存金额（元）" :total="allcount.totalSystemAmout" :hidecontent="true">
          <a-tooltip title="平台留存金额（元）" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
         @change="tabchange">
          <div class="extra-wrap" slot="tabBarExtraContent">
            
            <a-range-picker :ranges="quickranges" :value="[moment( getSyatemAmoutStatisParm.startDate),moment( getSyatemAmoutStatisParm.endDate)]"
            :placeholder="['开始时间','结束时间']" :style="{width: '256px'}"
            @change="(dates, dateStrings)=>{ this.getSyatemAmoutStatisParm.startDate=dateStrings[0];this.getSyatemAmoutStatisParm.endDate=dateStrings[1];this.getSyatemAmoutStatis()}"
            ></a-range-picker>
          </div>
          <a-tab-pane tab="销售额" key="1">
          </a-tab-pane>
          <a-tab-pane tab="充值金额" key="2">
          </a-tab-pane>
          <a-tab-pane tab="提现金额" key="3">
          </a-tab-pane>
          <a-tab-pane tab="保证金" key="4">
          </a-tab-pane>
          <!-- <a-tab-pane tab="奖励金额" key="5">
          </a-tab-pane> -->
          <a-tab-pane tab="提货奖" key="7">
          </a-tab-pane>
          <a-tab-pane tab="推荐奖" key="6">
          </a-tab-pane>
          <a-tab-pane tab="销售返点奖" key="8">
          </a-tab-pane>
          <!-- <a-tab-pane tab="代理余额" key="9">
          </a-tab-pane>
          <a-tab-pane tab="代理货款" key="10">
          </a-tab-pane>
          <a-tab-pane tab="平台余额" key="11">
          </a-tab-pane>
          <a-tab-pane tab="平台留存金额" key="12">
          </a-tab-pane> -->
        </a-tabs>
        <a-row>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <bar title="充值金额(元)" :data="linedata" />
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-row>
      <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <ranking-list title="销售排行榜" :list="rankList" />
      </a-col>
      <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <ranking-list title="单人销售排行榜" :list="rankList" />
      </a-col>
      <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <ranking-list title="奖励领取排行榜" :list="rankList" />
      </a-col>
      <a-col :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <ranking-list title="充值排行榜" :list="rankList" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment';
  import ChartCard from '../../components/card/ChartCard'
  import MiniArea from '../../components/chart/MiniArea'
  import MiniBar from '../../components/chart/MiniBar'
  import MiniProgress from '../../components/chart/MiniProgress'
  import Bar from '../../components/chart/Bar'
  import RankingList from '../../components/chart/RankingList'
  import HotSearch from '../../components/analysis/HotSearch'
  import SalesData from '../../components/analysis/SalesData'
  import Trend from '../../components/chart/Trend'

  export default {
    name: 'analysis',
    data() {
      return {
        quickranges: {
          '本周': [moment().subtract(6, 'd'), moment()],
          '本月': [moment().startOf('month'), moment()],
          '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        getSyatemAmoutStatisParm:{
          startDate: moment().subtract(6, 'd').format('YYYY/MM/DD'),
          endDate: moment().format('YYYY/MM/DD'),
          dayOrMonth: 1,
          bType:1,
        },
        areacolumns: [{
          title: '城市',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: '代理人数',
          dataIndex: 'count',
          key: 'count'
        }, {
          title: '占比',
          dataIndex: 'persent',
          key: 'persent'
        }],
        allcount: {},
        linedata: [{
          x: '2019-6-1',
          y: 0
        }],
        levellist: [{
          name: '一级',
          id: '5f2714f4-9fa6-4560-608d-08d6c17aef53'
        }, {
          name: '二级',
          id: 'af7e1490-5654-4442-9330-cc274bec495b'
        }],
        rankList:[],
      }
    },
    components: {
      Trend,
      SalesData,
      HotSearch,
      RankingList,
      Bar,
      MiniProgress,
      MiniBar,
      MiniArea,
      ChartCard
    },
    methods:{
      moment,
      tabchange(name){
        this.getSyatemAmoutStatisParm.bType=name*1;
        this.getSyatemAmoutStatis();
      },
      async getAllMoney(){
        var ret=await this.$http.Get('/api/services/app/B_Order/GetOrderMoneyStatis');
        if(ret.success){
          this.allcount=ret.result;
        }
      },
      async getSyatemAmoutStatis() {
        var ret = await this.$http.Get('/api/services/app/B_Order/GetSyatemAmoutStatis', this.getSyatemAmoutStatisParm);
        if (ret.success) {
          this.linedata = [];
          if (ret.result.items.length == 0) {
            return;
          }
          for (var i in ret.result.items) {
            var t = {
              x: ret.result.items[i].date,
              y: ret.result.items[i].amout,
            }
            this.linedata.push(t)
          }
        }
      },
    },
    mounted(){
      this.getAllMoney();
      this.getSyatemAmoutStatis();
    }
  }

</script>

<style lang="less" scoped>
  .extra-wrap {}

  .chart-card-content {
    display: none !important;
  }

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }

</style>
