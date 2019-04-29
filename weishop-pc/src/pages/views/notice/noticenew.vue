<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item  :label-col="labelcol" :wrapper-col="wrappercol" label="标题" fieldDecoratorId="title"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个原因'}]}">
        <a-input placeholder="请输入标题。" />
      </a-form-item>
      <a-form-item  :label-col="labelcol" :wrapper-col="wrappercol" label="内容" fieldDecoratorId="content">
        <a-textarea placeholder="请输入内容" :autosize="{ minRows: 6, maxRows:10 }" />
      </a-form-item>
    </a-form>
  
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
        }
      }
    },
    methods: {
        async submit() {
        return new Promise((resolve, reject) => {
          this.form.validateFields(async (err, values) => {
            if (!err) {
              var ret = await this.$http.Post('/api/services/app/B_Notice/Create', values);
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
