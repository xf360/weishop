<template>
  <!-- 等级管理 -->
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
          <a href="javascript:;" @click="del(record)">删除</a>
        </span>
      </a-table>
    </a-card>
    <a-modal title="新建等级" v-model="addvisible" :width="800" @ok="save" cancelText="取消" okText="确认">
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="等级名称" fieldDecoratorId="info.levelName"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入等级名称，不可重复。',whitespace: true}]}">
          <a-input placeholder="请输入等级名称，不可重复。" />
        </a-form-item>
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="层级" fieldDecoratorId="info.level"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择层级'}]}">
          <a-select placeholder="请选择层级">
            <a-select-option :value="1">
              一级
            </a-select-option>
            <a-select-option :value="2">
              二级
            </a-select-option>
            <a-select-option :value="3">
              三级
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        addvisible: false,
        selectid: null,
        info: {
          levelName: '',
          level: 1
        },
        data: [{
          id: 1,
          name1: '金牌',
          name3:'一级',
          name4:20,
          sub: 10
        }],
        loading: false,
        columns: [{
          title: '等级名称',
          dataIndex: 'name1'
        }, {
          title: '层级',
          dataIndex: 'name3'
        }, {
          title: '人数',
          dataIndex: 'name4'
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
      opennew() {
        this.addvisible = true;
      },
      save() {
          this.addvisible=false;
      },
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
      opendetail(row) {
        this.selectid = row.id
        this.detailvisible = true
      },
    }
  }

</script>
