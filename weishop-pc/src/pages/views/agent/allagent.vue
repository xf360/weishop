<template>
  <!-- 全部代理 -->
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
          <a-form-item label="通过日期">
            <a-range-picker style="width:250px" @change="onChange" />
          </a-form-item>
          <a-form-item label="关键字">
            <a-input style="width:300px" placeholder="请输入代理姓名、电话、微信、身份证搜索" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-alert style="margin-top:20px" message="代理人数：11。" type="info" :show-icon="true" />
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="opendetail(record)">查看</a>
        </span>
      </a-table>
    </a-card>
    <a-modal title="查看详情" v-model="detailvisible" :width="800">
     <agentinfo :id="selectid"></agentinfo>
      <template slot="footer">
        <a-button key="back" @click="detailvisible=false">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import agentinfo from './agentinfo.vue'
  export default {
    components: {
        agentinfo
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
        }, {
          title: '代理姓名',
          dataIndex: 'name3'
        }, {
          title: '等级',
          dataIndex: 'name4'
        }, {
          title: '联系电话',
          dataIndex: 'name5'
        }, {
          title: '微信号',
          dataIndex: 'name6'
        }, {
          title: '通过时间',
          dataIndex: 'name7'
        }, {
          title: '层级',
          dataIndex: 'name8'
        }, {
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
      opendetail(row){
        this.selectid=row.id
        this.detailvisible=true
      },
    }
  }

</script>
