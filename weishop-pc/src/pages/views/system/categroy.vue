<template>
  <!-- 分类管理 -->
  <div>
    <a-card>
      <div class="tools" style="text-align:right">
        <a-button type="primary" @click="opennew">
          新建
        </a-button>
      </div>
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <span slot="action" slot-scope="text, record">
          <!-- <a-popconfirm title="你确定要删除？" @confirm="del(record)">
            <a-icon slot="icon" type="question-circle-o" style="color: red" />
            <a href="#">删除</a>
          </a-popconfirm> -->
          <a href="#" @click="loaddetail(record)">编辑</a>
        </span>
      </a-table>
    </a-card>
    <a-modal title="新建类别" v-model="addvisible" :width="800" @ok="save" :confirmLoading="confirmLoading" cancelText="取消"
      okText="确认">
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="类别名称" fieldDecoratorId="name"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入类别名称，不可重复。',whitespace: true}]}">
          <a-input placeholder="请输入类别名称，不可重复。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="属性" fieldDecoratorId="level"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择属性'}]}">
          <a-select placeholder="请选择属性">
            <a-select-option :value="1">
              进提货
            </a-select-option>
            <a-select-option :value="2">
              直购
            </a-select-option>
            <a-select-option :value="3">
              试装
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="父级" fieldDecoratorId="p_Id">
          <a-cascader changeOnSelect  placeholder="请选择父级" :options="pctree" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="单位" fieldDecoratorId="unit"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入单位。',whitespace: true}]}">
          <a-input placeholder="请输入单位。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="价格" fieldDecoratorId="price"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入价格。'}]}">
          <a-input-number :min="0" :max="999999" placeholder="请输入价格。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="备注" fieldDecoratorId="remark">
          <a-input placeholder="请输入备注。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="缩略图" extra="" fieldDecoratorId="file">
          <a-upload name="logo" accept=".jpg, .jpeg, .png" :action="uploadurl" list-type="picture">
            <a-button>
              <a-icon type="upload" />选择文件
            </a-button>
          </a-upload>
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
        pctree: [],
        uploadurl:api+'api/AbpFile/Post',
        confirmLoading: false,
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        addvisible: false,
        selectid: null,
        info: {
          name: '',
          level: 1
        },
        data: [],
        loading: false,
        columns: [{
          title: '类别名称',
          dataIndex: 'name'
        }, {
          title: '价格',
          dataIndex: 'price'
        }, {
          title: '单位',
          dataIndex: 'unit'
        }, {
          title: '备注',
          dataIndex: 'remark'
        }, {
          title: '操作',
          key: 'action',
          scopedSlots: {
            customRender: 'action'
          },
        }]
      }
    },
    mounted() {
      this.loadlist();
     
    },
    methods: {
      async loadCator() {
        var ret = await this.$http.Get('/api/services/app/B_Categroy/GetList')
        if (ret.success) {
          this.pctree = help.list2tree(ret.result.items, null);
        }
      },
      opennew() {
        this.loadCator();
        this.addvisible = true;
        this.form.resetFields();
      },
      async del(row) {
        var ret = await this.$http.Delete('/api/services/app/B_Categroy/Delete', {
          id: row.id
        });
        if (ret.success) {
          this.loadlist()
        }
      },
      async save() {
        var vm = this;
        await this.form.validateFields(async function (err, values) {
          if (err) {
            return;
          } else {
            if(values.p_Id&&values.p_Id.length>0){
              values.p_Id=values[values.p_Id.length-1];
            }else{
              values.p_Id=null;
            }
            vm.confirmLoading = true;
            var ret = await vm.$http.Post('/api/services/app/B_Categroy/Create', values);
            vm.confirmLoading = false;
            if (ret.success) {
              vm.addvisible = false;
              vm.loadlist();
            }

          }
        });

      },
      async loadlist() {
        this.loading = true;
        var ret = await this.$http.Get('/api/services/app/B_Categroy/GetList', {
          MaxResultCount: 10,
          SkipCount: 0
        })
        this.loading = false;
        if (ret.success) {
          this.data = ret.result.items;
        }
      },
      async loaddetail(row) {
        debugger;
        this.loading = true;
        this.addvisible=true;
        var ret=await this.$http.Get('/api/services/app/B_Categroy/Get',{id:row.id});
        this.loading = false;
        if(ret.success){
          var info=ret.result;
          this.form.setFieldsValue(info);
        }
      },
      opendetail(row) {
        this.selectid = row.id
        this.detailvisible = true
      },
    }
  }

</script>
