<template>
  <!-- 代理审核 -->
  <a-card>
    <div class="tools">

      <a-form layout="inline" @submit="load">
        <a-form-item label="打款方式">
          <a-select style="width:100px" placeholder="选择打款方式" allowClear>
            <a-select-option :value="1">
              微信
            </a-select-option>
            <a-select-option :value="2">
              支付宝
            </a-select-option>
            <a-select-option :value="3">
              银行卡转账
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="等级">
          <a-select style="width:100px" placeholder="选择等级" allowClear>
            <a-select-option :value="1">
              一级代理
            </a-select-option>
            <a-select-option :value="2">
              二级代理
            </a-select-option>
            <a-select-option :value="3">
              三级代理
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select style="width:100px" placeholder="选择状态" allowClear>
            <a-select-option :value="1">
              正常
            </a-select-option>
            <a-select-option :value="2">
              异常
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="打款日期">
          <a-range-picker style="width:250px" @change="onChange" />
        </a-form-item>
        <a-form-item label="关键字">
          <a-input style="width:300px" placeholder="请输入代理姓名、电话、微信、身份证搜索" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            搜索
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-alert style="margin-top:20px" message="待审核人数：11，已通过人数：22，未通过人数:33。" type="info" :show-icon="true" />
    <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data" pagination="bottom" :loading="loading">
    </a-table>
  </a-card>
</template>
<script>
  export default {
    data() {
      return {
        data: [{name:'test'}],
        loading: false,
        columns: [{
          title: '邀请代理',
          dataIndex: 'name'
        }, {
          title: '邀请代理电话',
          dataIndex: 'name'
        }, {
          title: '代理姓名',
          dataIndex: 'name'
        }, {
          title: '等级',
          dataIndex: 'name'
        }, {
          title: '联系电话',
          dataIndex: 'name'
        }, {
          title: '微信号',
          dataIndex: 'name'
        }, {
          title: '身份证号',
          dataIndex: 'name'
        }, {
          title: '打款方式',
          dataIndex: 'name'
        }, {
          title: '打款金额',
          dataIndex: 'name'
        }, {
          title: '打款日期',
          dataIndex: 'name'
        }, {
          title: '状态',
          dataIndex: 'name'
        }, {
          title: '操作',
          dataIndex: 'name'
        }]
      }
    },
    methods: {
      load() {},
      onChange() {},
    }
  }

</script>
