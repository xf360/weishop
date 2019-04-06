<template>
  <div>
    <detail-list layout="grid" :col="2">
      <detail-list-item term="提现单号">1000000000</detail-list-item>
      <detail-list-item term="支行名称">小天支行</detail-list-item>
      <detail-list-item term="姓名">张三</detail-list-item>
      <detail-list-item term="银行名称">中国银行</detail-list-item>
      <detail-list-item term="联系电话">13800000000</detail-list-item>
      <detail-list-item term="卡号">3443243242</detail-list-item>
      <detail-list-item term="申请时间">2019-3-25</detail-list-item>
      <detail-list-item term="提现金额">￥100</detail-list-item>
    </detail-list>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item label="提现打款状态" fieldDecoratorId="reason.type"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '提现打款状态'}]}">
        <a-select placeholder="提现打款状态">
          <a-select-option :value="1">
            已打款
          </a-select-option>
          <a-select-option :value="2">
            原因2
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="备注" fieldDecoratorId="reason.des">
        <a-textarea placeholder="请输入原因" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
       <a-form-item label="打款人" fieldDecoratorId="reason.type"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '打款人'}]}">
        <a-select placeholder="选择打款人">
          <a-select-option :value="1">
              王菲
          </a-select-option>
          <a-select-option :value="2">
            李亚鹏
          </a-select-option>
        </a-select>
      </a-form-item>
       <a-form-item label="公司账户" fieldDecoratorId="reason.type"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '选择公司账户'}]}">
        <a-select placeholder="请选择公司账户">
          <a-select-option :value="1">
            工商银行（2132423）
          </a-select-option>
          <a-select-option :value="2">
            农业银行（343543543）
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

  </div>
</template>
<script>
  import DetailList from '@/components/tool/DetailList'
  const DetailListItem = DetailList.Item
  export default {
    components: {
      DetailList,
      DetailListItem
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
