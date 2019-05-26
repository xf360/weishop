<template>
  <!-- 等级管理 -->
  <div>
    <a-card>
      <div class="tools" style="text-align:right">
        <a-button type="primary" @click="opennew">
          新建
        </a-button>
      </div>
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a-popconfirm title="你确定要删除？" @confirm="del(record)">
            <a-icon slot="icon" type="question-circle-o" style="color: red" />
            <a href="#">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="新建等级" v-model="addvisible" :width="800" @ok="save" :confirmLoading="confirmLoading" cancelText="取消"
      okText="确认">
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="等级名称" fieldDecoratorId="name"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入等级名称，不可重复。',whitespace: true}]}">
          <a-input placeholder="请输入等级名称，不可重复。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="层级" fieldDecoratorId="level"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入层级。'}]}">
          <!-- <a-select placeholder="请选择层级">
            <a-select-option :value="1">
              一级
            </a-select-option>
            <a-select-option :value="2">
              二级
            </a-select-option>
            <a-select-option :value="3">
              三级
            </a-select-option>
          </a-select> -->
          <a-input-number :min="1" :max="99" placeholder="请输入层级。" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
          title: '等级名称',
          dataIndex: 'name'
        }, {
          title: '层级',
          dataIndex: 'level'
        }, {
          title: '人数',
          dataIndex: 'name4'
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
      opennew() {
        this.addvisible = true;
        this.form.resetFields();
      },
      async del(row){
        var ret=await this.$http.Delete('/api/services/app/B_AgencyLevel/Delete',{id:row.id});
        if(ret.success){
          this.loadlist()
        }
      },
      async save() {
        var vm = this;
        await this.form.validateFields(async function (err, values) {
          if (err) {
            return;
          } else {
            vm.confirmLoading = true;
            var ret = await vm.$http.Post('/api/services/app/B_AgencyLevel/Create', values);
            vm.confirmLoading = false;
            if (ret.success) {
              vm.addvisible = false;
              vm.loadlist();
            }

          }
        });

      },
      async loadlist() {
        this.loading = true
        var ret = await this.$http.Get('/api/services/app/B_AgencyLevel/GetList', {
          MaxResultCount: 10,
          SkipCount: 0
        })
        this.loading = false
        if (ret.success) {
          this.data = ret.result.items;
        }
      },
      async loaddetail() {
        this.loading = true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
      },
      opendetail(row) {
        this.selectid = row.id
        this.detailvisible = true
      },
    }
  }

</script>
