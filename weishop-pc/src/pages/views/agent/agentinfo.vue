<template>
  <div>
    <div style="text-align:right"><a-button @click="lockshow=true">封号</a-button></div>
    <detail-list layout="grid" :col="1">
      <detail-list-item term="上级代理">-</detail-list-item>
      <detail-list-item term="联系电话">-</detail-list-item>
      <detail-list-item term="联系地址">-</detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list title="代理详情" layout="grid" :col="2">
      <detail-list-item term="代理编号">{{info.agenCyCode}}</detail-list-item>
      <detail-list-item term="国家">中国</detail-list-item>
      <detail-list-item term="代理等级">{{info.agencyLevelName}}</detail-list-item>
      <detail-list-item term="省份">{{info.provinces|areaname(1)}}</detail-list-item>
      <detail-list-item term="姓名">{{info.userName}}</detail-list-item>
      <detail-list-item term="城市">{{info.city | areaname(2)}}</detail-list-item>
      <detail-list-item term="联系电话">{{info.phoneNumber}}</detail-list-item>
      <detail-list-item term="区县">{{info.county|areaname(3)}}</detail-list-item>
      <detail-list-item term="微信号">{{info.wxId}}</detail-list-item>
      <detail-list-item term="详细地址">{{info.address}}</detail-list-item>
      <detail-list-item term="身份证" :span="2">{{info.pNumber}}</detail-list-item>
      <detail-list-item term="头像">
        <img height="50" width="50" :src="api+'api/AbpFile/Show?id='+info.file.id" @click="showbig(info.file.id)"/>
      </detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list title="转账信息" layout="grid" :col="2">
      <detail-list-item term="打款方式">-</detail-list-item>
      <detail-list-item term="银行账户名">-</detail-list-item>
      <detail-list-item term="打款金额">-</detail-list-item>
      <detail-list-item term="银行账户">-</detail-list-item>
      <detail-list-item term="开户银行">-</detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list layout="grid" :col="2">
      <detail-list-item term="打款凭证">
        <span v-if="info.credentFiles">
          <img v-for="(item,index) in info.credentFiles" :key="index" :src="api+'api/AbpFile/Show?id='+item.id"
            width="50" height="50" @click="showbig(item.id)"/>
        </span>
      </detail-list-item>

    </detail-list>
    <detail-list layout="grid" :col="2">
      <detail-list-item term="手持证件">
        <span v-if="info.handleCredentFiles">
          <img v-for="(item,index) in info.handleCredentFiles" :key="index" :src="api+'api/AbpFile/Show?id='+item.id"
            width="50" height="50" @click="showbig(item.id)"/>
        </span>
      </detail-list-item>
      </detail-list>
    <a-modal title="封号" v-model="lockshow" @ok="handleLockOk" cancelText="取消" okText="确认">
      <lockaccount v-if="lockshow" ref="lockaccount" :id='id'></lockaccount>
    </a-modal>
    <a-modal :visible="showimg" :footer="null" @cancel="showimg=false">
      <img v-if="showimg" alt="example" style="width: 100%" :src="showimgurl" />
    </a-modal>
  </div>
</template>
<script>
  import DetailList from '@/components/tool/DetailList'
  import lockaccount from '../system/lockaccount.vue'
  const DetailListItem = DetailList.Item
  export default {
    components: {
      DetailList,
      DetailListItem,
      lockaccount
    },
    data(){
        return {
          showimg: false,
        showimgurl: '',
          api: api,
            lockshow:false,
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
      showbig(id){
        this.showimgurl= api+'api/AbpFile/Show?id='+id;
        this.showimg=true;
      },
      async loaddetail() {
        debugger;
        this.loading = true
        var ret=await this.$http.Get('/api/services/app/B_Agency/Get',{id:this.id})
        this.loading = false
        this.info=ret.result;
      },
      async handleLockOk(){//封号
        var ret=await this.$refs.lockaccount.submit();
        if(ret){
          this.lockshow=false;
        }
      },
    }
  }

</script>
