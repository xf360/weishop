<template>
  <!-- 库存管理 -->
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
          <a-form-item label="全部小类">
            <a-select style="width:100px" placeholder="选择分类" allowClear>
              <a-select-option :value="1">
                子分类1
              </a-select-option>
              <a-select-option :value="2">
                子分类2
              </a-select-option>
              <a-select-option :value="3">
                子分类3
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="关键字">
            <a-input style="width:300px" placeholder="请输入商品编号、商品名称" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
          <!-- <a-form-item style="float:right">
            <a-button type="primary" @click="opennew">
              新建
            </a-button>
          </a-form-item> -->
        </a-form>
      </div>

      <a-table style="margin-top:20px"  :columns="columns" :dataSource="data"
        :loading="loading" @change="pagechange" :pagination="pagination">
        <a-table slot="expandedRowRender" :columns="stockcolumns"  :dataSource="stacklist" slot-scope="text" :pagination="false">
        </a-table>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="openaudit(record)">新增库存</a>
        </span>
      </a-table>
    </a-card>
    <a-modal title="商品" v-model="detailvisible" @ok="save" cancelText="取消" okText="确认">
      <goodedit ref="detail" :id="selectid"></goodedit>
    </a-modal>

  </div>
</template>
<script>
  import goodedit from './goodedit.vue'
  export default {
    components: {
      goodedit
    },
    data() {
      return {
        detailvisible: false,
        selectid: null,
        pagination: {},
        list: [],
        params: {
          maxResultCount: 10,
          skipCount: 0,
          categroyIdP: null,
          categroyId: null,
          searchKey: null,
        },
        stacklist:[{
            createtime:'2018-03-29 12:23:23',
            num:22,
            needback:false,
            createusername:'admin'
        }],
        loading: false,
        columns: [{
          title: '商品编号',
          dataIndex: 'code'
        }, {
          title: '商品名称',
          dataIndex: 'name'
        }, {
          title: '型号',
          dataIndex: 'modeType'
        }, {
          title: '规格',
          dataIndex: 'spe'
        }, {
          title: '单位',
          dataIndex: 'unitName'
        }, {
          title: '商品大类',
          dataIndex: 'categroyIdPName'
        }, {
          title: '商品小类',
          dataIndex: 'categroyIdName'
        }, {
          title: '原价',
          dataIndex: 'price'
        }, {
          title: '优惠价',
          dataIndex: 'pirce1'
        }, {
          title: '商品图',
          dataIndex: 'name10'
        }, {
          title: '状态',
          dataIndex: 'status'
        }, {
          title: '操作',
          key: 'action',
          scopedSlots: {
            customRender: 'action'
          },
        }],
        stockcolumns:[{
          title: '时间',
          dataIndex: 'createtime'
        }, {
          title: '新增库存',
          dataIndex: 'num'
        },{
          title: '是否回执',
          dataIndex: 'needback'
        },{
          title: '操作员',
          dataIndex: 'createusername'
        },]
      }
    },
    mounted(){
      debugger;
      this.loadlist()
    },
    methods: {
      pagechange(page) {
        this.params.maxResultCount = page.pageSize;
        this.params.skipCount = (page.current - 1) * page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading = true;
        var ret = await this.$http.Get('/api/services/app/B_Goods/GetList', this.params)
        this.loading = false
        if (ret.success) {
          this.list = ret.result.items;
        }
      },
      onDelete() {},
      openaudit(row) {
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
