<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品编号" fieldDecoratorId="info.code"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品编号，不可重复。',whitespace: true}]}">
        <a-input placeholder="请输入商品编号，不可重复。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品名称" fieldDecoratorId="info.name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品名称。'}]}">
        <a-input placeholder="请输入商品名称。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="型号" fieldDecoratorId="info.modeType"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品型号。'}]}">
        <a-input placeholder="请输入商品型号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="规格" fieldDecoratorId="info.spe"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品规格。'}]}">
        <a-input placeholder="请输入商品规格。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="单位" fieldDecoratorId="info.unitName"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择单位'}]}">
        <a-select placeholder="请选择单位">
          <a-select-option :value="1">
            套
          </a-select-option>
          <a-select-option :value="2">
            件
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品大类" fieldDecoratorId="info.categroyIdP"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择商品大类'}]}">
        <a-select placeholder="请选择商品大类">
          <a-select-option :value="1">
            类别1
          </a-select-option>
          <a-select-option :value="2">
            类别2
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品小类" fieldDecoratorId="info.categroyId"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择商品小类'}]}">
        <a-select placeholder="请选择商品小类">
          <a-select-option :value="1">
            小类别1
          </a-select-option>
          <a-select-option :value="2">
            小类别2
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="原价" fieldDecoratorId="info.price"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品原价。'}]}">
        <a-input-number :min="0" :max="999999" placeholder="请输入商品原价。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="优惠价" fieldDecoratorId="info.pirce1"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品优惠价。'}]}">
        <a-input-number :min="0" :max="999999" placeholder="请输入商品优惠价。" />
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
        },
        info: {}
      }
    },
    mounted() {
      this.detail();
    },
    methods: {
      async detail() {
        if (this.id) {
          var ret = await this.$http.Get('/api/services/app/B_Goods/Get', {
            id: this.id
          });
          if (ret.success) {
            this.info = ret.result;
          }
        }
      },
      async submit() {
        return new Promise((resolve, reject) => {
          this.form.validateFields(async (err, values) => {
            if (!err) {
              if (this.id) {
                var ret = await this.$http.Put('/api/services/app/B_Goods/Update', values.info);
                this.$message.success("操作成功", 3)
                resolve(ret.success);
              } else {
                var ret = await this.$http.Post('/api/services/app/B_Goods/Create', values.info);
                this.$message.success("操作成功", 3)
                resolve(ret.success);
              }

            } else {
              resolve(false);
            }
          });
        });
      }
    }
  }

</script>
