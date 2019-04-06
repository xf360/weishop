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
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="opendetail(record)">查看</a>
        </span>
      </a-table>
    </a-card>
    <a-modal title="详情" v-model="detailvisible" :width="800">
      
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
        data: [{
          id:1,
          name1: 'test'
        }],
        loading: false,
        columns: [{
          title: '代理编号',
          dataIndex: 'name1'
        },  {
          title: '代理姓名',
          dataIndex: 'name3'
        }, {
          title: '代理等级',
          dataIndex: 'name5'
        }, {
          title: '保证金',
          dataIndex: 'name6'
        }, {
          title: '订单金额',
          dataIndex: 'name7'
        }, {
          title: '充值金额',
          dataIndex: 'name8'
        },  {
          title: '提现金额',
          dataIndex: 'name8'
        },  {
          title: '奖励金额',
          dataIndex: 'name10'
        }, {
          title: '下级代理订单金额',
          dataIndex: 'name10'
        },{
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
      opendetail(row){
        this.selectid=row.id
        this.detailvisible=true
      },
    }
  }

</script>
