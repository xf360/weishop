<template>
  <!-- 账户设置 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">
          <a-form-item label="打款方式">
            <a-select v-model="params.type" style="width:100px" placeholder="选择打款方式" allowClear>
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
          
        
         
          <a-form-item label="关键字">
            <a-input v-model="params.searchKey"  style="width:300px" placeholder="请输入账号" />
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
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list"
        :loading="loading" @change="pagechange"  :pagination="pagination">
         <span slot="type" slot-scope="text">
   <span v-if="text===0">支付宝{{text}}</span>
   <span v-if="text===1">银行转账</span>
 </span>
 <span slot="status" slot-scope="text">
   <span v-if="text===0">上线</span>
   <span v-if="text===1">下线</span>
 </span>
        <span slot="action" slot-scope="text, record">
          <a-popconfirm v-if="record.status===1" style="width:250px"  title="上线后，该账户信息将显示在货款充值页面，是否确定上线？" @confirm="() => upordown(record.id)" okText='确认' cancelText='取消'>
            <a href="javascript:;">上线</a>
          </a-popconfirm>
          <a-popconfirm v-if="record.status===0"  title="下线后，该账户信息将不显示在货款充值页面，是否确定下线？" @confirm="() => upordown(record.id)" okText='确认' cancelText='取消'>
            <a href="javascript:;">下线</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="新建账户" v-model="createvisible" :width="800">
      <accountnew v-if="createvisible" :id="selectid" ref="accountnew"></accountnew>
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
        params:{
          type:null,
          searchKey:null,
          maxResultCount:10,
          skipCount:0,
        },
        list:[],
        loading: false,
        columns: [{
          title: '类型',
          dataIndex: 'type',
          scopedSlots: {
            customRender: 'type'
          },
        },  {
          title: '账户',
          dataIndex: 'account'
        }, {
          title: '银行名称',
          dataIndex: 'bankName'
        }, {
          title: '户名',
          dataIndex: 'bankUserName'
        }, {
          title: '微信客服',
          dataIndex: 'wxName'
        }, {
          title: '备注',
          dataIndex: 'remark'
        },  {
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
    mounted(){
      this.loadlist();
    },
    methods: {
      pagechange(page){
        this.params.maxResultCount=page.pageSize;
        this.params.skipCount=(page.current-1)*page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading=true
        var ret=await this.$http.Get('/api/services/app/B_ManagerPayAccount/GetList',this.params);
        this.loading=false
        if(ret.success){
          this.list=ret.result.items;
        }
      },
      async upordown(id){
        var ret=await this.$http.Post('/api/services/app/B_ManagerPayAccount/UpOrDown',{id:id});
        if(ret.success){
          this.$message.success('操作成功。');
          this.loadlist();
        }
      },
      async create(){
        var ret= await this.$refs.accountnew.submit();
        if(ret){
          this.createvisible=false;
          this.loadlist();
        }
      },
    }
  }

</script>
