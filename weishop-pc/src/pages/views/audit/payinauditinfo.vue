<template>
  <div>
    <detail-list  layout="grid" :col="2">
      <detail-list-item term="充值单号">1000000000</detail-list-item>
      <detail-list-item term="打款时间">已取货</detail-list-item>
      <detail-list-item term="姓名">张三</detail-list-item>
       <detail-list-item term="打款方式">微信</detail-list-item>
        <detail-list-item term="联系电话">13800000000</detail-list-item>
         <detail-list-item term="打款金额">￥100</detail-list-item>
          <detail-list-item term="备注">张三</detail-list-item>
          <detail-list-item term="开户行">中国银行</detail-list-item>
          <detail-list-item term="银行名称">张三</detail-list-item>
          <detail-list-item term="银行账户">24234324324</detail-list-item>
           <detail-list-item term="打款凭证" :span="2">
             <img src="" width="50" height="50"/>
           </detail-list-item>
    </detail-list>
    
    <a-divider style="margin-bottom: 32px" />
    <detail-list layout="grid" :col="1">
      <detail-list-item term="审核结果">
        通过
      </detail-list-item>

    </detail-list>
    <detail-list layout="grid" :col="1">
      <detail-list-item term="审核结果">
        不通过
      </detail-list-item>
      <detail-list-item term="原因">
        原因1
      </detail-list-item>
      <detail-list-item term="备注">
        备注
      </detail-list-item>
    </detail-list>
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
    data(){
        return {
            info:{}
        }
    },
    props: {
      id: {
        type: [String,Number],
        required: true
      }
    },
    mounted(){
        this.loaddetail()
    },
    methods: {
      async loaddetail() {
        this.loading = true
        var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
        this.info=ret.result;
      },
    }
  }

</script>
