<template>
  <!-- 进货管理 -->
  <div>
    <a-card>
      <div class="tools">
        <a-form layout="inline">
          <a-form-item label="全部大类">
            <a-select style="width:100px" placeholder="选择分类" allowClear>
              <a-select-option :value="1">
                第一类
              </a-select-option>
              <a-select-option :value="2">
                第二类
              </a-select-option>

            </a-select>
          </a-form-item>

          <a-form-item label="关键字">
            <a-input style="width:300px" placeholder="请输入订单编号、代理商名称" />
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
    <a-modal title="详情" v-model="detailvisible" @ok="save" cancelText="取消" okText="确认">
      
    </a-modal>

  </div>
</template>
<script>

  export default {
    components: {
      
    },
    data() {
      return {
        detailvisible: false,
        selectid: null,
        data: [{
          id: 1,
          status:0,
          name1: 'test'
        },{
          id: 1,
          status:1,
          name1: 'test2'
        }],
        loading: false,
        columns: [{
          title: '订单编号',
          dataIndex: 'name1'
        }, {
          title: '下单时间',
          dataIndex: 'name2'
        }, {
          title: '代理姓名',
          dataIndex: 'name3'
        }, {
          title: '商品件数',
          dataIndex: 'name4'
        }, {
          title: '订单金额',
          dataIndex: 'name5'
        }, {
          title: '货款支付',
          dataIndex: 'name6'
        }, {
          title: '余额支付',
          dataIndex: 'name7'
        },{
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
        this.loading = true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
      },
      async loaddetail() {
        this.loading = true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
      },
      onDelete() {},
      opendetail(row) {
        this.selectid = row.id
        this.detailvisible = true
      },
      opennew() {
        this.detailvisible = true
      },
      save() {
        this.$refs.detail.submit();
      },

    }
  }

</script>
