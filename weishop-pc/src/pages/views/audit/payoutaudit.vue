<template>
  <!-- 提现审核 -->
  <div>
    <a-card>
      <div class="tools">
        <a-form layout="inline">
          <a-form-item label="打款方式">
            <a-select style="width:100px" placeholder="选择打款方式" allowClear>
              <a-select-option :value="1">
                微信
              </a-select-option>
              <a-select-option :value="2">
                支付宝
              </a-select-option>
              <a-select-option :value="3">
                银行卡转账
              </a-select-option>
            </a-select>
          </a-form-item>
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
            <a-input style="width:300px" placeholder="请输入提现单号、姓名、联系电话" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-alert style="margin-top:20px" message="待审核人数：11，已通过人数：22，未通过人数:33。" type="info" :show-icon="true" />
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
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
        data: [{
          id:1,
          name1: 'test'
        }],
        loading: false,
        columns: [{
          title: '提现单号',
          dataIndex: 'name1'
        }, {
          title: '姓名',
          dataIndex: 'name2'
        }, {
          title: '联系电话',
          dataIndex: 'name5'
        },  {
          title: '银行名称',
          dataIndex: 'name8'
        }, {
          title: '开户行名称',
          dataIndex: 'name9'
        }, {
          title: '姓名',
          dataIndex: 'name10'
        }, {
          title: '卡号',
          dataIndex: 'name11'
        }, {
          title: '金额',
          dataIndex: 'name12'
        },{
          title: '申请时间',
          dataIndex: 'name18'
        }, {
          title: '状态',
          dataIndex: 'name13'
        }, {
          title: '操作',
          key: 'action',
          dataIndex: 'name14',
          scopedSlots: {
            customRender: 'action'
          },
        }]
      }
    },
    methods: {
      async loadlist() {
        this.loading=true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading=false
      },
      async loaddetail(){
        this.loading=true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading=false
      },
      openaudit(row){
        this.selectid=row.id
        this.auditvisible=true
      },
      onChange() {},
      auditpass(){
        this.$success({
        title: '该记录审核已通过。',
        content: (  // JSX support
          <div>
            <p>你可以继续处理其他记录。</p>
          </div>
        ),
      });
      },//审核通过
      handleReasonOk(){//审核不通过并提交原因
        debugger;
        this.$refs.reasoncom.submit();

      }
    }
  }

</script>
