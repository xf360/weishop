<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item  :label-col="labelcol" :wrapper-col="wrappercol" label="标题" fieldDecoratorId="reason.type"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个原因'}]}">
        <a-input placeholder="请输入标题。" />
      </a-form-item>
      <a-form-item  :label-col="labelcol" :wrapper-col="wrappercol" label="内容" fieldDecoratorId="reason.des">
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
        submit(){
            debugger;
            this.form.validateFields(function(err,values){
                if(!err){
                    console.log('Received values of form: ', values)
                }
            });
        }
    }
  }

</script>
