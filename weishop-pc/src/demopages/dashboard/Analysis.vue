<template>
  <div>
    <a-row style="margin: 0 -12px">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="代理总人数" :total="allcount.agentCount" :hidecontent="true">
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
        <chart-card title="总访问量" :total="allcount.visitorCount" :hidecontent="true">
          <a-tooltip title="总访问量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card title="昨日访问量" :total="allcount.yesterdayCount" :hidecontent="true">
          <a-tooltip title="昨日访问量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
    </a-row>
    <a-row style="margin: 0 -12px">
      <a-col :sm="24" :md="12" :xl="6" v-for="(item,index) in allcount.angentLevelCount" :key="index">
        <chart-card :title="item.name" :total="item.count" :hidecontent="true">
          <a-tooltip :title="item.name" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>本周</a>
              <a>本月</a>
            </div>
            <a-range-picker placeholder="选择时间" :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane loading="true" tab="新增代理人数" key="1">
            <!-- <a-row>
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <bar title="新增代理人数" :data="linedata"/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <ranking-list title="门店销售排行榜" :list="rankList"/>
              </a-col>
            </a-row> -->
          </a-tab-pane>
          <a-tab-pane tab="新增团队数" key="2">
          </a-tab-pane>
          <a-tab-pane tab="访问总量" key="3">
          </a-tab-pane>
          <a-tab-pane v-for="(item) in levellist" :tab="item.name" :key="item.id">
          </a-tab-pane>
        </a-tabs>
        <a-row>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <bar title="访问总量" :data="linedata" />
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-row>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <ranking-list title="团队人数排行榜" :list="rankList" />
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <ranking-list title="推荐人数排行榜" :list="rankList" />
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <sales-data title="各级代理人数占比" :source="levelpersent" />
      </a-col>
    </a-row>
    <a-row style="margin: 0 -12px">
      <a-col style="padding: 0 12px" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false" style="margin-top: 24px" title="热门搜索">
          <a-table :locale="{emptyText: '暂无数据'}" :dataSource="agentarealist" :columns="areacolumns" size="small" :pagination="false"></a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
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
        allcount: {
          agentCount: 233,
          teamCount: 50,
          visitorCount: 23434,
          yesterdayCount: 322,
          angentLevelCount: [{
              name: '一级代理',
              count: 233
            },
            {
              name: '二级代理',
              count: 343
            },
            {
              name: '三级代理',
              count: 54
            }
          ]
        },
        linedata: [{
            x: '2019-03-01',
            y: 25
          },
          {
            x: '2019-03-02',
            y: 35
          },
          {
            x: '2019-03-03',
            y: 22
          },
          {
            x: '2019-03-04',
            y: 12
          },
          {
            x: '2019-03-05',
            y: 24
          },
          {
            x: '2019-03-06',
            y: 35
          },
        ],
        levellist: [{
          name: '一级',
          id: '5f2714f4-9fa6-4560-608d-08d6c17aef53'
        }, {
          name: '二级',
          id: 'af7e1490-5654-4442-9330-cc274bec495b'
        }],
        rankList: [{
            name: 'A团队',
            total: 12454
          },
          {
            name: 'A团队',
            total: 12454
          },
          {
            name: 'A团队',
            total: 12454
          },
          {
            name: 'A团队',
            total: 12454
          },
          {
            name: 'A团队',
            total: 12454
          },
          {
            name: 'A团队',
            total: 12454
          },
        ],
        levelpersent: [{
            item: '一级代理',
            count: 40
          },
          {
            item: '二级代理',
            count: 21
          },
        ],
        agentarealist: [{
            name: '成都',
            count: 500,
            persent: 10
          },
          {
            name: '成都',
            count: 500,
            persent: 10
          },
          {
            name: '成都',
            count: 500,
            persent: 10
          }
        ]
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
