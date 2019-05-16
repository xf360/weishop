<template>
  <!-- 提现审核 -->
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
        :message="`待审核人数：${static.waitAuditCount}，已通过人数：${static.passCount}，未通过人数:${static.noPassCount}。`" type="info"
        :show-icon="true" />
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list"
        :loading="loading" @change="pagechange" :pagination="pagination">
        <span slot="status" slot-scope="text">
          <span v-if="text===0">待审核</span>
          <span v-if="text===1">已通过</span>
          <span v-if="text===2">未通过</span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="openaudit(record)">审核</a>
          <a href="javascript:;" @click="detailvisible=true">查看</a>
        </span>
      </a-table>
    </a-card>
    <a-modal title="审核不通过" v-model="reasonvisible" @ok="handleReasonOk" cancelText="取消" okText="确认">
      <auditresult ref="reasoncom"></auditresult>
    </a-modal>
    <a-modal title="审核" v-model="auditvisible" :width="800">
      <payoutinfo :id="selectid"></payoutinfo>
      <template slot="footer">
        <a-button key="back" @click="reasonvisible=true">审核不通过</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="auditpass">审核通过</a-button>
      </template>
    </a-modal>
    <a-modal title="查看详情" v-model="detailvisible" :width="800">
      <payoutinfo :id="selectid"></payoutinfo>
      <template slot="footer">
        <a-button key="back" @click="detailvisible=false">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import auditresult from './auditresult.vue'
  import payoutinfo from './payoutauditinfo.vue'
  export default {
    components: {
      auditresult,
      payoutinfo
    },
    data() {
      return {
        reasonvisible: false,
        detailvisible:false,
        auditvisible:false,
        selectid:null,
        list: [],
        levellist: [],
        static: {
          waitAuditCount: 0,
          passCount: 0,
          noPassCount: 0,
        },
        params: {
          payType: null,
          agencyLevelId: null,
          status: null,
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
        }, {
          title: '姓名',
          dataIndex: 'userName'
        }, {
          title: '联系电话',
          dataIndex: 'tel'
        },  {
          title: '银行名称',
          dataIndex: 'bankName'
        }, {
          title: '开户行名称',
          dataIndex: 'bankBranchName'
        }, {
          title: '开户姓名',
          dataIndex: 'bankUserName'
        }, {
          title: '卡号',
          dataIndex: 'bankNumber'
        }, {
          title: '金额',
          dataIndex: 'amout'
        },{
          title: '申请时间',
          dataIndex: 'creationTime'
        }, {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status'
          },
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
        var ret = await this.$http.Get('/api/services/app/B_Withdrawal/GetAuditCount');
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
      openaudit(row) {
        this.selectid = row.id
        this.auditvisible = true
      },
      onChange() {},
      async auditpass() {
        var ret = await this.$http.Post('/api/services/app/B_Withdrawal/Audit', {
          id: this.selectid,
          isPass: true
        })
        if (ret.success) {
          this.auditvisible = false;
          this.loadlist();
        }
      }, //审核通过
      async handleReasonOk() { //审核不通过并提交原因
        this.$refs.reasoncom.form.validateFields(async (err, values) => {
          if (!err) {
            values.isPass = false;
            var ret = await this.$http.Post('/api/services/app/B_Withdrawal/Audit', values);
            if(ret.success){
              this.$message.success("操作成功", 3)
              }
            this.reasonvisible = false;
            this.loadlist()
          } else {

          }
        });

      }
    }
  }

</script>
