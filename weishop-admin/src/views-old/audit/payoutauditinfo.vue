<template>
  <div>
    <detail-list  layout="grid" :col="2">
      
      <detail-list-item term="支行名称">{{info.bankBranchName}}</detail-list-item>
      <detail-list-item term="姓名">{{info.userName}}</detail-list-item>
       <detail-list-item term="银行名称">{{info.bankName}}</detail-list-item>
        <detail-list-item term="银行户名">{{info.bankUserName}}</detail-list-item>
         <detail-list-item term="卡号">{{info.bankNumber}}</detail-list-item>
          <detail-list-item term="申请时间">{{info.creationTime|dateformat}}</detail-list-item>
          <detail-list-item term="提现金额">{{info.amout}}</detail-list-item>
          
    </detail-list>
    
    <a-divider style="margin-bottom: 32px" />
    <detail-list layout="grid" :col="1">
      <!-- <detail-list-item term="审核结果">
        通过
      </detail-list-item>

    </detail-list>
    <detail-list layout="grid" :col="1">
      <detail-list-item term="审核结果">
        不通过
      </detail-list-item> -->
      <detail-list-item term="原因">
        {{info.reason}}
      </detail-list-item>
      <detail-list-item term="备注">
        {{info.remark}}
      </detail-list-item>
    </detail-list>
  </div>
</template>
<script>
  import DetailList from '@/components/tools/DetailList'
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
        var ret=await this.$http.Get('/api/services/app/B_Withdrawal/Get',{id:this.id})
        this.loading = false
        this.info=ret.result;
      },
    }
  }

</script>
