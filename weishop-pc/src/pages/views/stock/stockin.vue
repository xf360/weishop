<template>
  <!-- 进货管理 -->
  <div>
    <a-card>
      <div class="tools">
        <a-form layout="inline">
          <!-- <a-form-item label="全部大类">
            <a-select style="width:100px" placeholder="选择分类" allowClear>
              <a-select-option :value="1">
                第一类
              </a-select-option>
              <a-select-option :value="2">
                第二类
              </a-select-option>

            </a-select>
          </a-form-item> -->

          <a-form-item label="关键字">
            <a-input v-model="params.searchKey" style="width:300px" placeholder="请输入订单编号、代理商名称" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
        </a-form>
      </div>

      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading" @change="pagechange"  :pagination="pagination">
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
         list: [],
         pagination:{},
         params:{
          status:null,
          lowerUsers:true,
          startDate:null,
          endDate:null,
          searchKey:null,
          maxResultCount:10,
          skipCount:0,
        },
        loading: false,
        columns: [{
          title: '订单编号',
          dataIndex: 'orderNo'
        }, {
          title: '下单时间',
          dataIndex: 'creationTime'
        }, {
          title: '代理姓名',
          dataIndex: 'userName'
        }, {
          title: '商品件数',
          dataIndex: 'number'
        }, {
          title: '订单金额',
          dataIndex: 'amout'
        }, {
          title: '货款支付',
          dataIndex: 'goodsPayment'
        }, {
          title: '余额支付',
          dataIndex: 'balance'
        },{
          title: '状态',
          dataIndex: 'status'
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
        var ret=await this.$http.Get('/api/services/app/B_InOrder/GetB_InOrderListAsync',this.params);
        this.loading=false
        if(ret.success){
          this.list=ret.result.items;
        }
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
