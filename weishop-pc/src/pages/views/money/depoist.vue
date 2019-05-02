<template>
  <!-- 提现打款 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">
          <a-form-item label="打款方式">
            <a-select v-model="params.payType" style="width:100px" placeholder="选择打款方式" allowClear>
              <!-- <a-select-option :value="1">
                微信
              </a-select-option> -->
              <a-select-option :value="0">
                支付宝
              </a-select-option>
              <a-select-option :value="1">
                银行卡转账
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
          <a-form-item label="状态">
            <a-select style="width:100px" placeholder="选择状态" allowClear>
              <a-select-option :value="1">
                正常
              </a-select-option>
              <a-select-option :value="2">
                异常
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="打款日期">
            <a-range-picker style="width:250px" @change="onChange" />
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
       <a-alert style="margin-top:20px"
        :message="`待审核人数：${static.waitAuditCount}，已通过人数：${static.passCount}，未通过人数:${static.noPassCount}。已审核金额：${static.passAmout}，未审核金额：${static.waitAmout}。`" type="info"
        :show-icon="true" />
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list"
        :loading="loading" @change="pagechange" :pagination="pagination">
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="openaudit(record)">打款</a>
          <!-- <a href="javascript:;" @click="detailvisible=true">查看</a> -->
        </span>
      </a-table>
    </a-card>
    <a-modal title="审核" v-model="auditvisible" :width="800">
      <depoistaudit :id="selectid" ref="depoistaudit"></depoistaudit>
      <template slot="footer">
        <a-button key="back">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="auditpass">确认</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import depoistaudit from './depoistaudit.vue'
  export default {
    components: {
      depoistaudit
    },
    mounted() {
      this.loadlist();
      this.loadlevel();
      this.loadstatic();
    },
    data() {
      return {
        auditvisible:false,
        selectid:null,
         list: [],
        levellist: [],
        static: {
          waitAuditCount: 0,
          passCount: 0,
          noPassCount: 0,
          passAmout:0,
          waitAmout:0
        },
        params: {
          payType: null,
          agencyLevelId: null,
          status: 1,
          payDateStart: null,
          payDateEnd: null,
          searchKey: null,
          maxResultCount: 10,
          skipCount: 0,
        },
        loading: false,
        columns: [{
          title: '提现单号',
          dataIndex: 'code'
        },  {
          title: '姓名',
          dataIndex: 'userName'
        }, {
          title: '联系电话',
          dataIndex: 'tel'
        }, {
          title: '银行名称',
          dataIndex: 'bankName'
        }, {
          title: '支行名称',
          dataIndex: 'bankBranchName'
        }, {
          title: '开户姓名',
          dataIndex: 'bankUserName'
        }, {
          title: '卡号',
          dataIndex: 'bankNumber'
        },{
          title: '金额',
          dataIndex: 'amout'
        }, {
          title: '打款日期',
          dataIndex: 'payTime'
        }, {
          title: '状态',
          dataIndex: 'status'
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
      this.loadlevel();
      this.loadstatic();
    },
    methods: {
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
      async loadstatic() {
        var ret = await this.$http.Get('/api/services/app/B_Withdrawal/GetCount');
        if (ret.success) {
          this.static = ret.result;
        }
      },
      pagechange(page) {
        this.params.maxResultCount = page.pageSize;
        this.params.skipCount = (page.current - 1) * page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading = true
        var ret = await this.$http.Get('/api/services/app/B_Withdrawal/GetList', this.params);
        this.loading = false
        if (ret.success) {
          this.list = ret.result.items;
        }
      },
      openaudit(row){
        this.selectid=row.id
        this.auditvisible=true
      },
      async auditpass(){
        var ret=await this.$refs.depoistaudit.submit();
        if(ret){
          this.auditvisible=false;
          this.loadlist()
        }
      }
    }
  }

</script>
