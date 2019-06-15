<template>
  <div>
    <detail-list layout="grid" :col="2">
      <detail-list-item term="充值单号">{{info.code}}</detail-list-item>
      <detail-list-item term="打款时间">{{info.payDate|dateformat}}</detail-list-item>
      <detail-list-item term="姓名">{{info.userName}}</detail-list-item>
      <detail-list-item term="打款方式">{{info.payType|payType}}</detail-list-item>
      <detail-list-item term="联系电话">{{info.tel}}</detail-list-item>
      <detail-list-item term="打款金额">￥{{info.payAmout}}</detail-list-item>
      <detail-list-item term="备注">{{info.remark}}</detail-list-item>
      <detail-list-item term="开户行" v-if="info.payType===1">{{info.bankName}}</detail-list-item>
      <detail-list-item term="开户姓名" v-if="info.payType===1">{{info.bankUserName}}</detail-list-item>
      <detail-list-item term="银行账户" v-if="info.payType===1">{{info.payAcount}}</detail-list-item>
      <detail-list-item term="支付宝账户" v-if="info.payType===0">{{info.payAcount}}</detail-list-item>
      <detail-list-item term="打款凭证" :span="2">
        <span v-if="info.credentFiles">
          <div v-for="(item,index) in info.credentFiles" :key="index" style="display:inline-block">
            <img :src="$http.api+'api/AbpFile/Show?id='+item.id" @click="showbig(item.id)" width="50" height="50" />
          </div>
        </span>
      </detail-list-item>
    </detail-list>

    <a-divider style="margin-bottom: 32px" />
    <detail-list v-if="info.status===1" layout="grid" :col="1">
      <detail-list-item term="审核结果">
        通过
      </detail-list-item>

    </detail-list>
    <detail-list v-if="info.status===2" layout="grid" :col="1">
      <detail-list-item term="审核结果">
        不通过
      </detail-list-item>
      <detail-list-item term="原因">
        {{info.reason}}
      </detail-list-item>
      <detail-list-item term="备注">
        {{info.auditRemark}}
      </detail-list-item>
    </detail-list>
    <a-modal destroyOnClose width="800px" :maskClosable="false" :visible="showimg" @cancel="showimg=false">
      <template slot="footer">
        <a-button key="submit" type="primary" @click="rate">
          旋转
        </a-button>
        <a-button key="back" @click="showimg=false">关闭</a-button>
        
      </template>
      <img ref="img" width="700" v-if="showimg" alt="example" style="width: 100%" :src="showimgurl" />
    </a-modal>
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
    data() {
      return {
        showimg: false,
        showimgurl: '',
        api: this.$http.api,
        currentdeg:0,
        info: {}
      }
    },
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    mounted() {
      this.loaddetail()
    },
    methods: {
      rate(){
        this.currentdeg=this.currentdeg+90
        this.$refs.img.style.transform='rotate('+this.currentdeg+'deg)';
      },
      showbig(id){
        this.showimgurl= this.$http.api+'api/AbpFile/Show?id='+id;
        this.showimg=true;
      },
      async loaddetail() {
        if (!this.id) {
          return;
        }
        this.loading = true
        var ret = await this.$http.Get('/api/services/app/B_PaymentPrepay/Get', {
          id: this.id
        })
        this.loading = false
        if (ret.success) {
          this.info = ret.result;
        }
      },
    }
  }

</script>
