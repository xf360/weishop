<template>
  <div>
    <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="类型" fieldDecoratorId="info.type"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择账户类型'}]}">
      <a-select placeholder="请选择账户类型" style="width:250px;">
        <a-select-option :value="0">
          支付宝
        </a-select-option>
        <a-select-option :value="1">
          银行卡
        </a-select-option>
        <!-- <a-select-option :value="2">
          微信
        </a-select-option> -->
        
      </a-select>
    </a-form-item>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="账号" fieldDecoratorId="info.account"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账号。',whitespace: true}]}">
        <a-input placeholder="请输入账号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="银行名称" fieldDecoratorId="info.bankName"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入银行名称。'}]}">
        <a-input placeholder="请输入银行名称。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="户名" fieldDecoratorId="info.bankUserName"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入户名。'}]}">
        <a-input placeholder="请输入户名。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="微信客服" fieldDecoratorId="info.wxName"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入微信客服。'}]}">
        <a-input placeholder="请输入微信客服。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="备注" fieldDecoratorId="info.remark">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
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
        }
      }
    },
    methods: {
      async submit() {
        return new Promise((resolve, reject) => {
          this.form.validateFields(async (err, values) => {
            if (!err) {
              var ret = await this.$http.Post('/api/services/app/B_ManagerPayAccount/Create', values.info);
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
