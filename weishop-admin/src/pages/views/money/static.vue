<template>
  <!-- 平台金额流水 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">
          <a-form-item label="打款方式">
            <a-select v-model="params.businessType" style="width:100px" placeholder="选择打款方式" allowClear>
              <a-select-option :value="1">
                订单
              </a-select-option>
              <a-select-option :value="3">
                提现
              </a-select-option>
              <a-select-option :value="4">
                充值
              </a-select-option>
              <a-select-option :value="5">
                团队管理奖金
              </a-select-option>
              <a-select-option :value="6">
                保证金
              </a-select-option>
              <a-select-option :value="7">
                推荐奖金
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="等级">
            <a-select v-model="params.agencyLevelId" style="width:100px" placeholder="选择等级" allowClear>
              <a-select-option :value="item.id" v-for="(item,index) in levellist" :key="index">
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="类别">
            <a-select v-model="params.inOrOut" style="width:100px" placeholder="选择出账或入账" allowClear>
              <a-select-option :value="0">
                出账
              </a-select-option>
              <a-select-option :value="1">
                入账
              </a-select-option>
            </a-select>
          </a-form-item>
         <a-form-item label="流水时间">
            <a-range-picker :placeholder="['开始时间','结束时间']" style="width:250px" @change="onChange" />
          </a-form-item>
          <a-form-item label="关键字">
            <a-input v-model="params.searchKey" style="width:300px" placeholder="请输入代理姓名、电话、微信、身份证搜索" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-alert style="margin-top:20px" message="总金额：11，入账金额：22，出账金额:33，总笔数：33，入账笔数：11，出账笔数：22。" type="info" :show-icon="true" />
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list"
        :loading="loading" @change="pagechange" :pagination="pagination">
        <span slot="creationTime" slot-scope="text">
          <span>{{text|dateformat('yyyy-MM-dd HH:mm:ss')}}</span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="opendetail(record)">查看</a>
        </span>
      </a-table>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="详情" v-model="detailvisible" :width="800">
      
      <template slot="footer">
        
        <a-button key="submit" type="primary" >确认</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  export default {
    components: {
      
    },
    data() {
      return {
        detailvisible:false,
        selectid:null,
        pagination:{
              total:0,
          },
        levellist: [],
        params: {
          maxResultCount: 10,
          skipCount: 0,
          agencyLevelId: null,
          status: null,
          startDate: null,
          endDate: null,
          searchKey: null,
        },
        list: [],
        loading: false,
        columns: [{
          title: '金额类型',
          dataIndex: 'businessTypeTitle'
        },  {
          title: '入账（元）',
          dataIndex: 'inOrOut'
        }, {
          title: '出账（元）',
          dataIndex: 'amout'
        }, {
          title: '代理名称',
          dataIndex: 'agencyName'
        }, {
          title: '代理编号',
          dataIndex: 'agencyCode'
        }, {
          title: '代码等级',
          dataIndex: 'agencyLeavelName'
        },  {
          title: '日期',
          dataIndex: 'creationTime',
          scopedSlots: {
            customRender: 'creationTime'
          },
        }]
      }
    },
    mounted(){
      this.loadlist()
      this.loadlevel();
    },
    methods: {
      onChange(data, datastr) {
        this.params.startDate = datastr[0] + ' 00:00:00'
        this.params.endDate = datastr[1] + ' 23:59:59'
      },
      async loadlevel() {
        this.loading = true
        var ret = await this.$http.Get('/api/services/app/B_AgencyLevel/GetList', {
          MaxResultCount: 999,
          SkipCount: 0
        })
        this.loading = false
        if (ret.success) {
          this.levellist = ret.result.items;
        }
      },
      pagechange(page) {
        this.params.maxResultCount = page.pageSize;
        this.params.skipCount = (page.current - 1) * page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading=true
        var ret=await this.$http.Get('/api/services/app/B_Order/GetAmoutManagerStatis',this.params);
        this.loading=false;
        if(ret.success){
          this.list=ret.result.items;
          this.pagination.total=ret.result.totalCount;
        }
      },
      async loaddetail(){
        this.loading=true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading=false
      },
      opendetail(row){
        this.selectid=row.id
        this.detailvisible=true
      },
    }
  }

</script>
