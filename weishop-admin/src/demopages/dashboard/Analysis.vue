<template>
  <div>
    <a-row style="margin: 0 -12px">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="代理总人数" :total="allcount.totalCount" :hidecontent="true">
          <a-tooltip title="代理总人数" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="团队总数" :total="allcount.teamCount" :hidecontent="true">
          <a-tooltip title="团队总数" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="总访问量" total="0" :hidecontent="true">
          <a-tooltip title="总访问量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="昨日访问量" total="0" :hidecontent="true">
          <a-tooltip title="昨日访问量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
    </a-row>
    <a-row style="margin: 0 -12px">
      <a-col :sm="24" :md="12" :xl="6" v-for="(item,index) in allcount.leavels" :key="index">
        <chart-card :title="item.leavel+'级代理'" :total="item.count" :hidecontent="true">
          <a-tooltip :title="item.leavel+'级代理'" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs @change="tabchange" default-active-key="1" size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <a-range-picker :placeholder="['开始时间','结束时间']"
              @change="(dates, dateStrings)=>{ this.getAddAgencyListParm.startDate=dateStrings[0];this.getAddAgencyListParm.endDate=dateStrings[1];this.getAddAgencyList()}"
              :value="[moment( getAddAgencyListParm.startDate),moment( getAddAgencyListParm.endDate)]"
              :ranges="quickranges" :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane loading="true" tab="新增代理人数" key="-1">
          </a-tab-pane>
          <a-tab-pane tab="新增团队数" key="-2">
          </a-tab-pane>
          <a-tab-pane tab="访问总量" key="-3">
          </a-tab-pane>
          <a-tab-pane v-for="(item) in allcount.leavels" :tab="item.leavel+'级代理'" :key="item.leavel">
          </a-tab-pane>
        </a-tabs>
        <a-row>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <bar title="总量" :data="linedata" />
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-row>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <ranking-list title="团队人数排行榜" :list="teamlist" />
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <ranking-list title="推荐人数排行榜" :list="inVitelist" />
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <sales-data v-if="levelpersent.length>0" title="各级代理人数占比" :source="levelpersent" />
      </a-col>
    </a-row>
    <a-row style="margin: 0 -12px">
      <a-col style="padding: 0 12px" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false" style="margin-top: 24px">
          <div slot="title">
            <span>热门搜索</span>
            <span style="margin-left:20px">
              <a-select style="width: 120px" v-model="defaultcity">
                <a-select-option v-for="(item,index) in provincelist" :value="item" :key="index">{{item|areaname}}
                </a-select-option>
              </a-select>
            </span>
          </div>
          <a-table :locale="{emptyText: '暂无数据'}" :dataSource="agentarealist" :columns="areacolumns" size="small"
            :pagination="false">
            <span slot="name" slot-scope="text">
            <span>{{text|areaname}}</span>
          </span>
          <span slot="proportion" slot-scope="text">
            <span>{{(text*100).toFixed(2)}}%</span>
          </span>
            </a-table>
        </a-card>
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
        areacolumns: [{
          title: '城市',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: {
            customRender: 'name'
          },
        }, {
          title: '代理人数',
          dataIndex: 'agencyCount',
          key: 'agencyCount'
        }, {
          title: '占比',
          dataIndex: 'proportion',
          key: 'proportion',
          scopedSlots: {
            customRender: 'proportion'
          },
        }],
        quickranges: {
          '本周': [moment().subtract(6, 'd'), moment()],
          '本月': [moment().startOf('month'), moment()],
          '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        provincelist: [],
        allcount: {
          totalCount: 0,
          teamCount: 0,
          visitorCount: 0,
          yesterdayCount: 0,
          leavels: [],
        },
        getAddAgencyListParm: {
          startDate: moment().subtract(6, 'd').format('YYYY/MM/DD'),
          endDate: moment().format('YYYY/MM/DD'),
          dayOrMonth: 1,
          leavel: null,
        },
        linedata: [{
          x: '2019-6-1',
          y: 0
        }],
        levelpersent: [],
        teamlist: [],
        inVitelist: [],
        defaultcity:'',
        agentarealist: []
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
    methods: {
      moment,
      tabchange(name) {
        switch (name) {
          case '-1':
            this.getAddAgencyListParm.leavel = null;
            this.getAddAgencyList();
            break;
          case '-2':
            this.linedata = [];
            break;
          case '-3':
            this.linedata = [];
            break;
          default:
            this.getAddAgencyListParm.leavel = name;
            this.getAddAgencyList();
            break;
        }
      },
      async allstatic() {
        var ret = await this.$http.Get('/api/services/app/B_Agency/GetStatis');
        if (ret.success) {
          this.allcount = ret.result;
          debugger;
          this.levelpersent = [];
          if (this.allcount.leavels) {
            for (var i in this.allcount.leavels) {
              var t = {
                item: this.allcount.leavels[i].leavel + '级代理',
                count: this.allcount.leavels[i].count
              }
              this.levelpersent.push(t);

            }
          }
        }
      },
      async getAddAgencyList() {
        var ret = await this.$http.Get('/api/services/app/B_Agency/GetAddAgencyList', this.getAddAgencyListParm);
        if (ret.success) {
          debugger;
          this.linedata = [];
          if (ret.result.items.length == 0) {
            return;
          }
          for (var i in ret.result.items) {
            var t = {
              x: ret.result.items[i].date,
              y: ret.result.items[i].count,
            }
            this.linedata.push(t)
          }
        }
      },
      async getTeamCountStatis() {
        var ret = await this.$http.Get('/api/services/app/B_Agency/GetTeamCountStatis');
        if (ret.success) {
          this.teamlist = ret.result.items;
        }
      },
      async getInViteCountStatis() {
        var ret = await this.$http.Get('/api/services/app/B_Agency/GetInViteCountStatis');
        if (ret.success) {
          this.inVitelist = ret.result.items;
        }
      },
      async getAgencyAreaList() {
        var ret = await this.$http.Get('/api/services/app/B_Agency/GetAgencyAreaList');
        if (ret.success) {
          this.provincelist = ret.result;
          this.defaultcity=this.provincelist[0]
        }
      },
      async getAgencyAreaStatis(code){
        if(!code){
          return;
        }
        var ret = await this.$http.Get('/api/services/app/B_Agency/GetAgencyAreaStatis',{provinceCode:code});

        if (ret.success) {
          this.agentarealist = ret.result;
        }
      }

    },
    watch:{
      'defaultcity':function(nv){
        this.getAgencyAreaStatis(nv)
      }
    },
    mounted() {
      this.allstatic();
      this.getAddAgencyList();
      this.getTeamCountStatis();
      this.getInViteCountStatis();
      this.getAgencyAreaList();
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