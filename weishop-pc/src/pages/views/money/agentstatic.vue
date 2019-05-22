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
      <a-select :defaultValue="null" style="width: 120px">
        <a-select-option :value="null">全部类型</a-select-option>
        <a-select-option value="">进货</a-select-option>
        <a-select-option value="">提货</a-select-option>
        <a-select-option value="">提现</a-select-option>
        <a-select-option value="">充值</a-select-option>
        <a-select-option value="">团队管理奖金</a-select-option>
        <a-select-option value="">保证金</a-select-option>
        <a-select-option value="">推荐奖金</a-select-option>
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
        pagination: {},
        detailparams:{},
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
          title: '保证金',
          dataIndex: 'deposite'
        }, {
          title: '充值金额',
          dataIndex: 'orderInAmout'
        }, {
          title: '提现金额',
          dataIndex: 'withdrawalAmout'
        }, {
          title: '奖励金额',
          dataIndex: 'inviteAmout'
        }, {
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
        }
      },
      async loaddetail() {
        this.loading = true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
      },
      async opendetail(row) {
        this.selectid = row.userId
        var ret= await this.$http.Get('/api/services/app/B_Order/GetAgencyMoneyDetailList',{
          businessType:0,
          userId:row.userId,
          maxResultCount:99,
          skipCount:0
        })
        if(ret.success){
          this.detaillist=ret.result.items;
        }
        this.detailvisible = true
      },
    }
  }
</script>