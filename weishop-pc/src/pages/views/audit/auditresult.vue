<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item label="不通过原因" fieldDecoratorId="reason"
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
      <a-form-item label="备注" fieldDecoratorId="remark">
        <a-textarea placeholder="请输入原因" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
    </a-form>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        info: {}
      }
    },
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    methods: {

    }
  }

</script>
