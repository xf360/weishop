<template>
  <!-- 全部通知 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">
          <a-form-item label="状态">
            <a-select style="width:100px" placeholder="选择状态" allowClear>
              <a-select-option :value="2">
                撤销
              </a-select-option>
              <a-select-option :value="1">
                正常
              </a-select-option>
              <a-select-option :value="0">
                草稿
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="发布时间">
             <a-range-picker placeholder="选择时间" style="width:250px" @change="onChange" />
          </a-form-item>
                
          <a-form-item label="关键字">
            <a-input style="width:300px" placeholder="请输入标题、内容搜索" />
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
        <span slot="status" slot-scope="text">
          <span v-if="text===0">草稿</span>
          <span v-if="text===1">正常</span>
          <span v-if="text===2">撤销</span>
        </span>
        <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="selectid=record.id;detailvisible=true">查看</a>
          <a-popconfirm v-if="record.status===1" style="width:250px"  title="撤销后，代理的消息中心将不显示该条公告，是否撤销？" @confirm="() => sendorcancle(record)" okText='确认' cancelText='取消'>
            <a href="javascript:;">撤销</a>
          </a-popconfirm>
          <a  v-if="record.status===0" @click="sendorcancle(record)" href="javascript:;">发送</a>
          <a-popconfirm v-if="record.status===2" style="width:250px"  title="删除后不可恢复，是否删除？" @confirm="() => onDelete(record)" okText='确认' cancelText='取消'>
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="新建通知" v-model="createvisible" :width="800">
      <noticenew v-if="createvisible" ref="noticenew" :id="selectid"></noticenew>
      <template slot="footer">
        <a-button key="back" @click="createvisible=false">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="create">确认</a-button>
      </template>
    </a-modal>
    <a-modal destroyOnClose :maskClosable="false" title="通知详情" v-model="detailvisible" :width="800">
      <noticedetail v-if="detailvisible" ref="noticedetail" :id="selectid"></noticedetail>
      <template slot="footer">
        <a-button key="back" @click="detailvisible=false">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import noticenew from './noticenew.vue'
  import noticedetail from './noticedetail.vue'
  export default {
    components: {
      noticenew,
      noticedetail
    },
    data() {
      return {
        createvisible:false,
        detailvisible:false,
        selectid:null,
        pagination:{
              total:0,
          },
        params:{
          maxResultCount:10,
          skipCount:0,
          status:null,
          startDate:null,
          endDate:null,
          searchKey:null,
        },
        list: [],
        loading: false,
        columns: [{
          title: '发送时间',
          dataIndex: 'creationTime'
        },  {
          title: '标题',
          dataIndex: 'title'
        },{
          title: '发布人',
          dataIndex: 'name6'
        },  {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status'
          },
        }, {
          title: '操作',
          key: 'action',
          width:250,
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
      onChange(data,datastr){
        this.params.startDate=datastr[0]+' 00:00:00'
        this.params.endDate=datastr[1]+' 23:59:59'
      },
      pagechange(page){
        this.params.maxResultCount=page.pageSize;
        this.params.skipCount=(page.current-1)*page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading=true;
        var ret=await this.$http.Get('/api/services/app/B_Notice/GetList',this.params)
        this.loading=false
        if(ret.success){
          this.list=ret.result.items;
          this.pagination.total=ret.result.totalCount;
        }
      },
      async sendorcancle(row){
        var ret=await this.$http.Post('/api/services/app/B_Notice/SendOrCancle',{id:row.id});
        if(ret.success){
          this.loadlist();
        }
      },
      async onDelete(row){
        var ret=await this.$http.Post('/api/services/app/B_Notice/Delete',{id:row.id});
        if(ret.success){
          this.loadlist();
        }
      },
      async create(){
        var ret=await this.$refs.noticenew.submit();
        if(ret){
          this.createvisible=false;
          this.loadlist();
        }
      },
    }
  }

</script>
