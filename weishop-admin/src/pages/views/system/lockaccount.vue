<template>
  <div>
    <!-- 封号页面 -->
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item label="封号原因" fieldDecoratorId="reason"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入封号原因'}]}">
        <!-- <a-select placeholder="请选择一个原因">
          <a-select-option :value="1">
            原因1
          </a-select-option>
          <a-select-option :value="2">
            原因2
          </a-select-option>
        </a-select> -->
        <a-input style="width:300px" placeholder="请输入封号原因" />
      </a-form-item>
      <a-form-item label="备注" fieldDecoratorId="remark"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入备注'}]}">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
      <!-- <a-form-item fieldDecoratorId="reason.des">
        <a-checkbox  >
          通知代理
        </a-checkbox>
      </a-form-item>
      <a-form-item fieldDecoratorId="reason.des">
        <a-checkbox  >
          通知上级代理
        </a-checkbox>
      </a-form-item> -->
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
      return {}
    },
    methods: {
      async submit() {
        return new Promise((resolve, reject) => {
          this.form.validateFields(async (err, values) => {
            if (!err) {
              var ret = await this.$http.Post('/api/services/app/B_AgencyDisableRecord/Create', values);
              if (ret.success) {
                this.$message.success("操作成功", 3)
              }
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
