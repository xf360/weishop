<template>
  <!-- 商品管理 -->
  <div>
    <a-card>
      <div class="tools">
        <a-form layout="inline">
          <a-form-item label="全部大类">
            <a-select v-model="params.categroyIdP" style="width:100px" placeholder="选择分类" allowClear>
              <a-select-option :value="1">
                第一类
              </a-select-option>
              <a-select-option :value="2">
                第二类
              </a-select-option>

            </a-select>
          </a-form-item>
          <a-form-item label="全部小类">
            <a-select v-model="params.categroyId" style="width:100px" placeholder="选择分类" allowClear>
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
            <a-input v-model="params.searchKey" style="width:300px" placeholder="请输入商品编号、商品名称" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loadlist">
              搜索
            </a-button>
          </a-form-item>
          <a-form-item style="float:right">
            <a-button type="primary" @click="opennew">
              新建
            </a-button>
          </a-form-item>
        </a-form>
      </div>

      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list"
        :loading="loading" @change="pagechange" :pagination="pagination">
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="openaudit(record)">编辑</a>
          <a v-if="record.status" href="javascript:;" @click="enable(record)">上架</a>
          <a v-if="!record.status" href="javascript:;" @click="enable(record)">下架</a>
          <a-popconfirm title="确定要删除该记录吗？" @confirm="() => onDelete(record.key)" okText='确认' cancelText='取消'>
            <a href="javascript:;">删除</a>
          </a-popconfirm>
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
        }]
      }
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
      async loaddetail() {
        this.loading = true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
      },
      onDelete() {},
      openaudit(row) {
        this.selectid = row.id
        this.detailvisible = true
      },
      async enable(row) {
        var ret = await this.$http.Post('/api/services/app/B_Goods/Enable', {
          id: row.id
        });
        if (ret.success) {
          this.loadlist();
        }
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
