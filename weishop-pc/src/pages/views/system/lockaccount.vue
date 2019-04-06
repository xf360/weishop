<template>
  <div>
    <!-- 封号页面 -->
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item label="封号原因" fieldDecoratorId="reason.type"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个原因'}]}">
        <a-select placeholder="请选择一个原因">
          <a-select-option :value="1">
            原因1
          </a-select-option>
          <a-select-option :value="2">
            原因2
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="备注" fieldDecoratorId="reason.des">
        <a-textarea placeholder="请输入原因" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
      <a-form-item fieldDecoratorId="reason.des">
        <a-checkbox  >
          通知代理
        </a-checkbox>
      </a-form-item>
      <a-form-item fieldDecoratorId="reason.des">
        <a-checkbox  >
          通知上级代理
        </a-checkbox>
      </a-form-item>
    </a-form>

  </div>
</template>
<script>
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {

      }
    },
    methods: {
      submit() {
        debugger;
        this.form.validateFields(function (err, values) {
          if (!err) {
            console.log('Received values of form: ', values)
          }
        });
      }
    }
  }

</script>
