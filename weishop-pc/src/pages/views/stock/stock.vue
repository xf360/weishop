<template>
  <!-- 库存管理 -->
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
          <!-- <a-form-item label="全部小类">
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
          </a-form-item> -->
          <a-form-item label="分类">
            <a-cascader placeholder="选择分类" :options="pctree" v-model="params.categroyId" />
          </a-form-item>
          <a-form-item label="关键字">
            <a-input v-model="params.searchKey" style="width:300px" placeholder="请输入商品编号、商品名称" />
          </a-form-item>
          <a-form-item>
            <a-button  type="primary" @click="loadlist">
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

      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" :columns="columns" :dataSource="list" :loading="loading" @change="pagechange"
        :pagination="pagination" @expand="expand">
        <a-table :locale="{emptyText: '暂无数据'}" slot="expandedRowRender" :columns="stockcolumns" :dataSource="stacklist" slot-scope="text"
          :pagination="false">
          <span slot="creationTime" slot-scope="text">
          <span>{{text|dateformat}}</span>
        </span>
          <span slot="status" slot-scope="text,record">
            <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked :checked="text" @change="statuschange(record)"/>
          </span>
        </a-table>
        
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="openaudit(record)">新增库存</a>
        </span>
      </a-table>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="商品" v-model="detailvisible" @ok="save" cancelText="取消" okText="确认">
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="新增库存" fieldDecoratorId="count"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入新增库存。'}]}">
          <a-input-number style="width:150px;" :min="0" :max="999999" placeholder="请输入新增库存。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="是否回执" fieldDecoratorId="status"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择是否回执'}]}">
        <a-select placeholder="请选择是否回执">
          <a-select-option :value="1">
            是
          </a-select-option>
          <a-select-option :value="0">
            否
          </a-select-option>
        </a-select>
      </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>
<script>
  import help from '../../../utils/help.js'
  export default {
    data() {
      return {
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        detailvisible: false,
        selectid: null,
        pctree: [],
        pagination: {},
        list: [],
        params: {
          maxResultCount: 10,
          skipCount: 0,
          categroyIdP: null,
          categroyId: null,
          searchKey: null,
        },
        stacklist: [],
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
          title: '剩余库存',
          dataIndex: 'inventory'
        }, {
          title: '操作',
          key: 'action',
          scopedSlots: {
            customRender: 'action'
          },
        }],
        stockcolumns: [{
          title: '时间',
          dataIndex: 'creationTime',
          scopedSlots: {
            customRender: 'creationTime'
          },
        }, {
          title: '新增库存',
          dataIndex: 'count'
        }, {
          title: '是否回执',
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status'
          },
        }, {
          title: '操作员',
          dataIndex: 'confirmUserName'
        }, ]
      }
    },
    mounted() {
      this.loadlist();
      this.loadCator();
    },
    methods: {
      statuschange(val){
        debugger;
        this.comfirm(val.id);
      },
      async comfirm(id){
        var ret=await this.$http.Post('/api/services/app/B_InventoryAddRecord/Confirm',{id:id});
        if(ret.success){
          this.$message.success('操作成功。');
          this.getstacklist();
        }
      },
      async expand(expanded, record){
        if(expanded){
          debugger;
          this.getstacklist(record.id)
        }
      },
      async getstacklist(id){
        var ret= await this.$http.Get('/api/services/app/B_InventoryAddRecord/GetList',{
            goodsid:id,
            maxResultCount:99,
            skipCount:0
          });
          if(ret.success){
            this.stacklist=ret.result.items;
          }
      },
      async loadCator() {
        var ret = await this.$http.Get('/api/services/app/B_Categroy/GetList', this.cparams)
        if (ret.success) {
          this.pctree = help.list2tree(ret.result.items, null);
        }
      },
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
         this.form.validateFields(async (err, values) => {
            if (!err) {
              values.goodsid=this.selectid;
              values.confirmUserId=this.$store.state.account.loginInfo.user.id;
              var ret= await this.$http.Post('/api/services/app/B_InventoryAddRecord/Create',values);
              if(ret.success){
                this.detailvisible=false;
                this.expand(true,{id:this.selectid});
              }
            }
         })
      },

    }
  }

</script>
