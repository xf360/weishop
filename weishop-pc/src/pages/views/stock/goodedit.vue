<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品编号" fieldDecoratorId="info.no"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品编号，不可重复。',whitespace: true}]}">
        <a-input placeholder="请输入商品编号，不可重复。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品名称" fieldDecoratorId="info.no"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品名称。'}]}">
        <a-input placeholder="请输入商品名称。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="型号" fieldDecoratorId="info.no"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品型号。'}]}">
        <a-input placeholder="请输入商品型号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="规格" fieldDecoratorId="info.no"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品规格。'}]}">
        <a-input placeholder="请输入商品规格。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="单位" fieldDecoratorId="info.unit"
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
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品大类" fieldDecoratorId="info.unit"
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
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="商品小类" fieldDecoratorId="info.unit2"
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
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="原价" fieldDecoratorId="info.oldprice"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品原价。'}]}">
        <a-input-number :min="0" :max="999999" placeholder="请输入商品原价。" />
      </a-form-item>
    <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="优惠价" fieldDecoratorId="info.newprice"
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
        }
      }
    },
    methods: {
      submit() {
        this.form.validateFields(function (err, values) {
          if (!err) {
            console.log('Received values of form: ', values)
          }
        });
      }
    }
  }

</script>
