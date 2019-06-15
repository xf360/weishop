<template>
  <!-- 代理金额 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">

          <a-form-item label="等级">
            <a-select style="width:100px" placeholder="选择等级" allowClear>
              <a-select-option :value="1">
                一级代理
              </a-select-option>
              <a-select-option :value="2">
                二级代理
              </a-select-option>
              <a-select-option :value="3">
                三级代理
              </a-select-option>
            </a-select>
          </a-form-item>


          <a-form-item label="关键字">
            <a-input style="width:300px" placeholder="请输入代理姓名、代理编号搜索" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-alert style="margin-top:20px" :message="`总保证金金额：0，总充值金额：0，总提现金额：0，总奖励金额：0。`" type="info" :show-icon="true" />
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns"
        :rowKey="record => record.id" :dataSource="list" :loading="loading" @change="pagechange"
        :pagination="pagination">
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="opendetail(record)">查看</a>
        </span>
      </a-table>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="详情" v-model="detailvisible" :width="800">
      <a-select v-model="detailparams.businessType" :defaultValue="null" style="width: 120px" @change="loaddetail">
        <a-select-option :value="null">全部类型</a-select-option>
        <a-select-option :value="1">进货</a-select-option>
        <a-select-option :value="2">提货</a-select-option>
        <a-select-option :value="3">提现</a-select-option>
        <a-select-option :value="4">充值</a-select-option>
        <a-select-option :value="5">团队管理奖金</a-select-option>
        <a-select-option :value="6">保证金</a-select-option>
        <a-select-option :value="7">推荐奖金</a-select-option>
      </a-select>
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="detailcolumns"
      :rowKey="record => record.id" :dataSource="detaillist" :loading="loading" @change="detailpagechange"
        :pagination="pagination">
        <span slot="creationTime" slot-scope="text">
          <span>{{text|dateformat('yyyy-MM-dd')}}</span>
        </span>
        
        </a-table>
      <template slot="footer">

        <a-button key="submit" type="primary">确认</a-button>
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
        pagination: {
          total:0,
        },
        detailparams:{
           businessType:null,
           userId:null,
          maxResultCount:99,
          skipCount:0
        },
        params: {
          searchKey: null,
          maxResultCount: 10,
          skipCount: 0,
        },
        detailvisible: false,
        selectid: null,
        list: [],
        detaillist:[],
        loading: false,
        detailcolumns:[{
          title: '时间',
          dataIndex: 'creationTime',
          scopedSlots: {
            customRender: 'creationTime'
          },
        },{
          title: '类型',
          dataIndex: 'businessTitle'
        },{
          title: '金额',
          dataIndex: 'amout'
        },],
        columns: [{
          title: '代理编号',
          dataIndex: 'agencyCode'
        }, {
          title: '代理姓名',
          dataIndex: 'agencyName'
        }, {
          title: '代理等级',
          dataIndex: 'agencyLevelName'
        }, {
          title: '可用余额',
          dataIndex: 'blance'
        }, {
          title: '充值金额',
          dataIndex: 'orderInAmout'
        }, {
          title: '可用货款',
          dataIndex: 'goodsPayment'
        }, {
          title: '提现金额',
          dataIndex: 'withdrawalAmout'
        }, {
          title: '推荐奖',
          dataIndex: 'inviteAmout'
        }, {
          title: '下级提货奖',
          dataIndex: 'childOrderinOutAmout'
        }, {
          title: '团队奖',
          dataIndex: 'teamBonus'
        },{
          title: '操作',
          key: 'action',
          scopedSlots: {
            customRender: 'action'
          },
        }]
      }
    },
    mounted() {
      this.loadlist();
    },
    methods: {
      pagechange(page) {
        this.params.maxResultCount = page.pageSize;
        this.params.skipCount = (page.current - 1) * page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading = true
        var ret = await this.$http.Get('/api/services/app/B_Order/GetAgencyMoneyStatic', this.params);
        this.loading = false;
        if (ret.success) {
          this.list = ret.result.items;
          this.pagination.total=ret.result.totalCount;
        }
      },
      async loaddetail() {
        this.loading = true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
      },
      async opendetail(row) {
        this.selectid = row.userId
        this.detailparams.userId=row.userId
        await this.loaddetail();
        this.detailvisible = true
      },
      async loaddetail(){
        var ret= await this.$http.Get('/api/services/app/B_Order/GetAgencyMoneyDetailList',this.detailparams)
        if(ret.success){
          this.detaillist=ret.result.items;
        }
      }
    }
  }
</script>