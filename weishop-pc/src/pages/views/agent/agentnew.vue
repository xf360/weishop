<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="代理姓名" fieldDecoratorId="name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入代理姓名。',whitespace: true}]}">
        <a-input placeholder="请输入代理姓名。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="代理编号" fieldDecoratorId="agenCyCode"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入代理编号。',whitespace: true}]}">
        <a-input placeholder="请输入代理编号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="类型" fieldDecoratorId="type"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择代理类型'}]}">
        <a-select placeholder="请选择代理类型" style="width:250px;">
          <a-select-option :value="1">
            直属代理
          </a-select-option>
          <a-select-option :value="2">
            分销商
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="地区" fieldDecoratorId="area">
        <a-cascader placeholder="请选择地区" :options="areaoptions" allowClear />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="详细地址" fieldDecoratorId="address"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入详细地址称。'}]}">
        <a-input placeholder="请输入详细地址。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="签约时间" fieldDecoratorId="signData"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入签约时间。'}]}">
        <a-date-picker placeholder="请选择时间。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="手机号" fieldDecoratorId="tel"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入手机号。',pattern:/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/g}]}">
        <a-input placeholder="请输入手机号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="微信号" fieldDecoratorId="wxId">
        <a-input placeholder="请输入微信号。" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  import area from '../../../utils/area.js'
  export default {
    props: {
      id: {
        type: [String, Number],

      }
    },
    data() {
      return {
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        areaoptions: area,

      }
    },
    methods: {
      async submit() {
        return new Promise((resolve, reject) => {

          this.form.validateFields(async (err, values) => {
            debugger
            if (!err) {
              if (!values.area) {
                this.$message.error('请选择地区');
                return;
              }
              values.provinces = values.area[0];
              values.city = values.area[1];
              values.county = values.area[2];
              var ret = await this.$http.Post('/api/services/app/B_Agency/Create', values);
              this.$message.success("操作成功", 3)
              resolve(ret.success);
            } else {
              resolve(false);
            }
          });
        });

      }
    }
  }

</script>
