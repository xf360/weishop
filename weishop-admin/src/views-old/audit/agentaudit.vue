<template>
  <!-- 代理审核 -->
  <div>
    <a-card>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="新代理" key="new">
          <div class="tools">

            <a-form layout="inline">
              <a-form-item label="打款方式">
                <a-select v-model="params.payType" style="width:100px" placeholder="选择打款方式" allowClear>
                  <!-- <a-select-option :value="1">
                微信
              </a-select-option> -->
                  <a-select-option :value="1">
                    支付宝
                  </a-select-option>
                  <a-select-option :value="2">
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
          <a-alert style="margin-top:20px"
            :message="`待审核人数：${static.waitAuditCount}，已通过人数：${static.passCount}，未通过人数:${static.noPassCount}。`"
            type="info" :show-icon="true" />
          <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns"
            :rowKey="record => record.id" :dataSource="list" :loading="loading" @change="pagechange"
            :pagination="pagination">
            <span slot="payType" slot-scope="text">
              <span>{{text|payType}}</span>
            </span>
            <span slot="payDate" slot-scope="text">
              <span>{{text|dateformat('yyyy-MM-dd')}}</span>
            </span>
            <span slot="action" slot-scope="text, record">
              <a v-if="record.status===0" href="javascript:;" @click="openaudit(record)">审核</a>
              <a href="javascript:;" @click=" selectid = record.id;detailvisible=true">查看</a>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="升级代理" key="old">
          <agentupdate></agentupdate>
        </a-tab-pane>
      </a-tabs>

    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="审核不通过" v-model="reasonvisible" @ok="handleReasonOk"
      cancelText="取消" okText="确认">
      <auditresult :id="selectid" v-if="reasonvisible" ref="reasoncom"></auditresult>
    </a-modal>
    <a-modal destroyOnClose :maskClosable="false" title="审核" v-model="auditvisible" :width="800">
      <agengtinfo v-if="auditvisible" :id="selectid"></agengtinfo>
      <template slot="footer">
        <a-button key="back" @click="reasonvisible=true">审核不通过</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="auditpass">审核通过</a-button>
      </template>
    </a-modal>
    <a-modal destroyOnClose :maskClosable="false" title="查看详情" v-model="detailvisible" :width="800">
      <agengtinfo v-if="detailvisible" :id="selectid"></agengtinfo>
      <template slot="footer">
        <a-button key="back" @click="detailvisible=false">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import auditresult from './auditresult.vue'
  import agengtinfo from './agentauditinfo.vue'
  import agentupdate from './agentupdateaudit.vue'
  export default {
    components: {
      auditresult,
      agengtinfo,
      agentupdate
    },
    data() {
      return {
        reasonvisible: false,
        detailvisible: false,
        auditvisible: false,
        selectid: '',
        list: [],
        levellist: [],
        pagination: {
          total:0,
        },
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
          title: '邀请代理',
          dataIndex: 'invitUserName'
        }, {
          title: '邀请代理电话',
          dataIndex: 'invitUserTel'
        }, {
          title: '代理姓名',
          dataIndex: 'name'
        }, {
          title: '等级',
          dataIndex: 'agencyLevelName'
        }, {
          title: '联系电话',
          dataIndex: 'tel'
        }, {
          title: '微信号',
          dataIndex: 'wxId'
        }, {
          title: '身份证号',
          dataIndex: 'pNumber'
        }, {
          title: '打款方式',
          dataIndex: 'payType',
          scopedSlots: {
            customRender: 'payType'
          },
        }, {
          title: '打款金额',
          dataIndex: 'payAmout'
        }, {
          title: '打款日期',
          dataIndex: 'payDate',
          scopedSlots: {
            customRender: 'payDate'
          },
        }, {
          title: '状态',
          dataIndex: 'statusTitle'
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
        var ret = await this.$http.Get('/api/services/app/B_AgencyApply/GetCount');
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
        var ret = await this.$http.Get('/api/services/app/B_AgencyApply/GetList', this.params);
        this.loading = false
        if (ret.success) {
          this.list = ret.result.items;
          this.pagination.total=ret.result.totalCount;
        }
      },

      openaudit(row) {
        this.selectid = row.id
        this.auditvisible = true
      },
      onChange(data, datastr) {
        this.params.payDateStart = datastr[0] + ' 00:00:00'
        this.params.payDateEnd = datastr[1] + ' 23:59:59'
      },
      async auditpass() {
        var ret = await this.$http.Post('/api/services/app/B_AgencyApply/Audit', {
          id: this.selectid,
          isPass: true
        })
        if (ret.success) {
          this.auditvisible = false;
          this.loadlist();
          this.loadstatic();
        }
      }, //审核通过
      async handleReasonOk() { //审核不通过并提交原因
        this.$refs.reasoncom.form.validateFields(async (err, values) => {
          if (!err) {
            values.isPass = false;
            values.id = this.selectid;
            var ret = await this.$http.Post('/api/services/app/B_AgencyApply/Audit', values);
            if (ret.success) {
              this.$message.success("操作成功", 3)
            }
            this.reasonvisible = false;
            this.detailvisible = false;
            this.loadlist();
            this.loadstatic();
          } else {

          }
        });

      }
    }
  }

</script>
