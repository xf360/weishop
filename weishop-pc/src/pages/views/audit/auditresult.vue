<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="不通过原因" fieldDecoratorId="reason"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入不通过原因。',whitespace: true}]}">
        <a-input placeholder="请输入不通过原因。" />
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
