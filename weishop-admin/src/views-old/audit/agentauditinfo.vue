<template>
  <div>
    <detail-list title="邀请人" layout="grid" :col="1">
      <detail-list-item term="邀请代理">{{info.invitUserName}}</detail-list-item>
      <detail-list-item term="联系电话">{{info.invitUserTel}}</detail-list-item>
      <detail-list-item term="联系地址">{{info.invitUserAddress}}</detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list title="代理详情" layout="grid" :col="2">
      <!-- <detail-list-item term="代理编号">{{info.agencyLevelCode}}</detail-list-item> -->
      <detail-list-item term="国家地区">中国</detail-list-item>
      <detail-list-item term="代理等级">{{info.agencyLevelName}}</detail-list-item>
      <detail-list-item term="省份">{{info.provinces|areaname(1)}}</detail-list-item>
      <detail-list-item term="姓名">{{info.name}}</detail-list-item>
      <detail-list-item term="城市">{{info.city|areaname(2)}}</detail-list-item>
      <detail-list-item term="联系电话">{{info.tel}}</detail-list-item>
      <detail-list-item term="区县">{{info.county|areaname(3)}}</detail-list-item>
      <detail-list-item term="微信号">{{info.wxId}}</detail-list-item>
      <detail-list-item term="详细地址">{{info.address}}</detail-list-item>
      <detail-list-item term="身份证" :span="2">{{info.pNumber}}</detail-list-item>
      <detail-list-item term="头像">
        <img height="50" width="50" :src="$http.api+'api/AbpFile/Show?id='+info.touxiangFile.id" @click="showbig(info.touxiangFile.id)"/>
      </detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list title="转账信息" layout="grid" :col="2">
      <detail-list-item term="打款方式">{{info.payType|payType}}
      </detail-list-item>
       <detail-list-item term="打款金额">￥{{info.payAmout}}</detail-list-item>
      <detail-list-item v-if="info.payType===0" term="支付宝号">{{info.payAcount}}</detail-list-item>
      <detail-list-item v-if="info.payType===1" term="银行账户名">{{info.bankUserName}}</detail-list-item>
      <detail-list-item v-if="info.payType===1" term="银行账户">{{info.payAcount}}</detail-list-item>
      <detail-list-item v-if="info.payType===1" term="开户银行">{{info.bankName}}</detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list layout="grid" :col="2">
      <detail-list-item term="打款凭证">
        <span v-if="info.credentFiles">
          <img v-for="(item,index) in info.credentFiles" :key="index" :src="$http.api+'api/AbpFile/Show?id='+item.id"
            width="50" height="50" @click="showbig(item.id)"/>
        </span>
      </detail-list-item>

    </detail-list>
    <detail-list layout="grid" :col="2">
      <detail-list-item term="手持证件">
        <span v-if="info.handleCredentFiles">
          <img v-for="(item,index) in info.handleCredentFiles" :key="index" :src="$http.api+'api/AbpFile/Show?id='+item.id"
            width="50" height="50" @click="showbig(item.id)"/>
        </span>
      </detail-list-item>

    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list v-if="info.status==1" layout="grid" :col="1">
      <detail-list-item term="审核结果">
        通过
      </detail-list-item>

    </detail-list>
    <detail-list v-if="info.status==2" layout="grid" :col="1">
      <detail-list-item term="审核结果">
        不通过
      </detail-list-item>
      <detail-list-item term="原因">
        -
      </detail-list-item>
      <detail-list-item term="备注">
        -
      </detail-list-item>
    </detail-list>
    <a-modal destroyOnClose :maskClosable="false" :visible="showimg" @cancel="showimg=false">
      <template slot="footer">
        <a-button key="submit" type="primary" @click="rate">
          旋转
        </a-button>
        <a-button key="back" @click="showimg=false">关闭</a-button>
        
      </template>
      <img v-if="showimg" alt="example" style="width: 100%" :src="showimgurl" />
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
        debugger;
        if (!this.id) {
          return;
        }
        this.loading = true
        var ret = await this.$http.Get('/api/services/app/B_AgencyApply/Get', {
          id: this.id
        });
        this.loading = false
        this.info = ret.result;
      },
    }
  }

</script>
