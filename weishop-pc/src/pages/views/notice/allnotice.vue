<template>
  <!-- 全部通知 -->
  <div>
    <a-card>
      <div class="tools">

        <a-form layout="inline">
          <a-form-item label="状态">
            <a-select style="width:100px" placeholder="选择状态" allowClear>
              <a-select-option :value="1">
                撤销
              </a-select-option>
              <a-select-option :value="2">
                正常
              </a-select-option>
              <a-select-option :value="3">
                草稿
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="发布时间">
            <a-range-picker style="width:250px" />
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
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <span slot="action" slot-scope="text, record">
            <a href="javascript:;">查看</a>
          <a-popconfirm style="width:250px"  title="撤销后，代理的消息中心将不显示该条公告，是否撤销？" @confirm="() => onDelete(record.key)" okText='确认' cancelText='取消'>
            <a href="javascript:;">撤销</a>
          </a-popconfirm>
          <a href="javascript:;">发送</a>
          <a-popconfirm style="width:250px"  title="删除后不可恢复，是否删除？" @confirm="() => onDelete(record.key)" okText='确认' cancelText='取消'>
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
    <a-modal title="新建账户" v-model="createvisible" :width="800">
      <noticenew :id="selectid"></noticenew>
      <template slot="footer">
        <a-button key="back" @click="createvisible=false">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="create">确认</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import noticenew from './noticenew.vue'
  export default {
    components: {
      noticenew
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
          title: '发送时间',
          dataIndex: 'name1'
        },  {
          title: '标题',
          dataIndex: 'name3'
        }, {
          title: '内容',
          dataIndex: 'name5'
        }, {
          title: '发布人',
          dataIndex: 'name6'
        },  {
          title: '状态',
          dataIndex: 'name11'
        }, {
          title: '操作',
          key: 'action',
          width:250,
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
