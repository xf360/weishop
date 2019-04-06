<template>
  <!-- 账户设置 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">
          <a-form-item label="账户类型">
            <a-select style="width:100px" placeholder="选择账户类型" allowClear>
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
          
        
         
          <a-form-item label="关键字">
            <a-input style="width:300px" placeholder="请输入账号" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
          <a-form-item style="float:right">
            <a-button type="primary" @click="createvisible=true">
              新建
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a-popconfirm style="width:250px"  title="上线后，该账户信息将显示在货款充值页面，是否确定上线？" @confirm="() => onDelete(record.key)" okText='确认' cancelText='取消'>
            <a href="javascript:;">上线</a>
          </a-popconfirm>
          <a-popconfirm  title="下线后，该账户信息将不显示在货款充值页面，是否确定下线？" @confirm="() => onDelete(record.key)" okText='确认' cancelText='取消'>
            <a href="javascript:;">下线</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
    <a-modal title="新建账户" v-model="createvisible" :width="800">
      <accountnew :id="selectid"></accountnew>
      <template slot="footer">
        <a-button key="back" @click="createvisible=false">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="create">确认</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import accountnew from './accountnew.vue'
  export default {
    components: {
      accountnew
    },
    data() {
      return {
        createvisible:false,
        selectid:null,
        data: [{
          id:1,
          name1: 'test'
        }],
        loading: false,
        columns: [{
          title: '类型',
          dataIndex: 'name1'
        },  {
          title: '账户',
          dataIndex: 'name3'
        }, {
          title: '银行名称',
          dataIndex: 'name5'
        }, {
          title: '户名',
          dataIndex: 'name6'
        }, {
          title: '微信客服',
          dataIndex: 'name7'
        }, {
          title: '备注',
          dataIndex: 'name8'
        },  {
          title: '状态',
          dataIndex: 'name11'
        }, {
          title: '操作',
          key: 'action',
          dataIndex: 'name12',
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
      create(){
        this.$success({
        title: '该记录审核已添加。',
        content: (  // JSX support
          <div>
            <p>你可以继续处理其他记录。</p>
          </div>
        ),
      });
      this.createvisible=false;
      },
    }
  }

</script>
