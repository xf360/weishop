<template>
  <!-- 全部代理 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">
          <a-form-item label="等级">
            <a-select v-model="params.agencyLevelId" style="width:100px" placeholder="选择等级" allowClear>
              <a-select-option :value="item.id" v-for="(item,index) in levellist" :key="index">
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="状态">
            <a-select v-model="params.status" style="width:100px" placeholder="选择状态" allowClear>
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
            <a-input v-model="params.searchKey" style="width:300px" placeholder="请输入代理姓名、电话、微信、身份证搜索" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
          <a-form-item style="text-align:right">
            <a-button type="primary" @click="createvisible=true">
              新建
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-alert style="margin-top:20px" :message="`代理人数：${total}。`" type="info" :show-icon="true" />
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list"
        :loading="loading" @change="pagechange" :pagination="pagination">
        <span slot="creationTime" slot-scope="text">
          <span>{{text|dateformat}}</span>
        </span>
        <span slot="status" slot-scope="text">
          <span v-if="text===0">正常</span>
          <span v-if="text===1">封号</span>
        </span>
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
    <a-modal title="新建代理" v-model="createvisible" :width="800">
      <agentnew ref="agentnew"></agentnew>
      <template slot="footer">
        <a-button  @click="createvisible=false">关闭</a-button>
         <a-button type="primary" @click="submit">保存</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import agentinfo from './agentinfo.vue'
  import agentnew from '../audit/agentauditnew.vue'
  export default {
    components: {
      agentinfo,
      agentnew
    },
    data() {
      return {
        total:0,
        detailvisible: false,
        createvisible:false,
        selectid: null,
        pagination: {},
        params: {
          maxResultCount: 10,
          skipCount: 0,
          agencyLevelId: null,
          status: null,
          startDate: null,
          endDate: null,
          searchKey: null,
        },
        list: [{
          id: 1,
          name1: 'test'
        }],
        levellist: [],
        loading: false,
        columns: [{
          title: '代理编号',
          dataIndex: 'agenCyCode'
        }, {
          title: '代理姓名',
          dataIndex: 'userName'
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
          title: '通过时间',
          dataIndex: 'creationTime',
          scopedSlots: {
            customRender: 'creationTime'
          },
        },
        //  {
        //   title: '层级',
        //   dataIndex: 'agencyLevelName'
        // }, 
        {
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
    methods: {
      onChange(data, datastr) {
        this.params.startDate = datastr[0] + ' 00:00:00'
        this.params.endDate = datastr[1] + ' 23:59:59'
      },
      pagechange(page) {
        this.params.maxResultCount = page.pageSize;
        this.params.skipCount = (page.current - 1) * page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading = true;
        var ret = await this.$http.Get('/api/services/app/B_Agency/GetManagerList', this.params)
        this.loading = false
        if (ret.success) {
          this.total=ret.result.totalCount;
          this.list = ret.result.items;
        }
      },
      async submit(){
        var ret=await this.$refs.agentnew.submit();
        if(ret){
          this.createvisible=false;
          this.loadlist();
        }
      },
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
      opendetail(row) {
        this.selectid = row.id
        this.detailvisible = true;

      },
    },
    mounted() {
      this.loadlevel()
      this.loadlist()
    }
  }

</script>
