<template>
  <!-- 商品管理 -->
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
          <a-form-item style="float:right">
            <a-button type="primary" @click="opennew">
              新建
            </a-button>
          </a-form-item>
        </a-form>
      </div>

      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="openaudit(record)">编辑</a>
          <a v-if="record.status" href="javascript:;">上架</a>
          <a v-if="!record.status" href="javascript:;">下架</a>
          <a-popconfirm  title="确定要删除该记录吗？" @confirm="() => onDelete(record.key)" okText='确认' cancelText='取消'>
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
          title: '商品编号',
          dataIndex: 'name1'
        }, {
          title: '商品名称',
          dataIndex: 'name2'
        }, {
          title: '型号',
          dataIndex: 'name3'
        }, {
          title: '规格',
          dataIndex: 'name4'
        }, {
          title: '单位',
          dataIndex: 'name5'
        }, {
          title: '商品大类',
          dataIndex: 'name6'
        }, {
          title: '商品小类',
          dataIndex: 'name7'
        }, {
          title: '原价',
          dataIndex: 'name8'
        }, {
          title: '优惠价',
          dataIndex: 'name9'
        }, {
          title: '商品图',
          dataIndex: 'name10'
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
