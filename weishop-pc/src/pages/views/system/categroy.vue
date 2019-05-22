<template>
  <!-- 分类管理 -->
  <div>
    <a-card>
      <div class="tools" style="text-align:right">
        <a-button type="primary" @click="opennew">
          新建
        </a-button>
      </div>
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns"
        :rowKey="record => record.id" :dataSource="data" :loading="loading">
        <span slot="action" slot-scope="text, record">
          <!-- <a-popconfirm title="你确定要删除？" @confirm="del(record)">
            <a-icon slot="icon" type="question-circle-o" style="color: red" />
            <a href="#">删除</a>
          </a-popconfirm> -->
          <a href="#" @click="loaddetail(record)">编辑</a>
        </span>
      </a-table>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="新建类别" v-model="addvisible" :width="800" @ok="save"
      :confirmLoading="confirmLoading" cancelText="取消" okText="确认">
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="类别名称" fieldDecoratorId="name"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入类别名称，不可重复。',whitespace: true}]}">
          <a-input placeholder="请输入类别名称，不可重复。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="属性"
          fieldDecoratorId="firestLevelCategroyPropertyId"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择属性'}]}">
          <a-select :disabled="!!selectid" placeholder="请选择属性">
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
          <a-cascader changeOnSelect placeholder="请选择父级" :options="pctree" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="单位" fieldDecoratorId="unit"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入单位。',whitespace: true}]}">
          <a-input placeholder="请输入单位。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="价格" fieldDecoratorId="price"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入价格。'}]}">
          <a-input-number :min="0" :max="999999" placeholder="请输入价格。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="备注" fieldDecoratorId="remark"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入备注。'}]}">
          <a-input placeholder="请输入备注。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="缩略图" extra="" fieldDecoratorId="file"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请上传缩略图。'}]}">
          <a-upload name="logo" accept=".jpg, .jpeg, .png" :action="uploadurl" :fileList="fileList"
            @change="handleChange" list-type="picture-card">
            <div v-if="fileList&&fileList.length<1">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  import Vue from 'vue'
  import help from '../../../utils/help.js'
  export default {
    data() {
      return {
        pctree: [],
        selectid: null,
        uploadurl: this.$http.api + 'api/AbpFile/Post',
        confirmLoading: false,
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        addvisible: false,
        selectid: null,
        info: {},
        data: [],
        fileList: [],
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
      this.loadCator();
    },
    methods: {
      async loadCator() {
        var ret = await this.$http.Get('/api/services/app/B_Categroy/GetList')
        if (ret.success) {
          this.pctree = help.list2tree(ret.result.items, null);
        }
      },
      handleChange(filelist) {
        this.fileList = filelist.fileList
      },
      opennew() {
        this.addvisible = true;
        this.selectid = null;
        this.fileList = [];
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
            if (values.p_Id && values.p_Id.length > 0) {
              values.p_Id = values.p_Id[values.p_Id.length - 1];
            } else {
              values.p_Id = null;
            }
            if (!values.file) {
              vm.$message.error("请上传图片。", 3)
              return;
            }
            if (values.file.fileList) {
              if (values.file.fileList.length > 0) {
                values.file = values.file.fileList[0].response.result.data[0]
              } else {
                vm.$message.error("请上传图片。", 3)
                return;
              }
            }
            vm.confirmLoading = true;
            values.id = vm.selectid;
            if (!values.id) {
              var ret = await vm.$http.Post('/api/services/app/B_Categroy/Create', values);
              vm.confirmLoading = false;
              if (ret.success) {
                vm.addvisible = false;
                vm.loadlist();
              }
            } else {
              var ret = await vm.$http.Put('/api/services/app/B_Categroy/Update', values);
              vm.confirmLoading = false;
              if (ret.success) {
                vm.addvisible = false;
                vm.loadlist();
              }
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
          this.data = help.list2treetable(ret.result.items, null);
        }
      },
      async loaddetail(row) {
        this.loading = true;
        this.addvisible = true;
        var ret = await this.$http.Get('/api/services/app/B_Categroy/Get', {
          id: row.id
        });
        this.loading = false;
        if (ret.success) {
          this.info = ret.result;
          this.info.p_Id=[this.info.p_Id]
          this.selectid = this.info.id;
          this.form.setFieldsValue(this.info);
          var fileparse = Vue.filter("fileparse");
          this.fileList = fileparse(this.info.file);

        }
      },
      opendetail(row) {
        this.selectid = row.id
        this.detailvisible = true
      },
    }
  }

</script>
