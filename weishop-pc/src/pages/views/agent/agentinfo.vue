<template>
  <div>
    <div style="text-align:right"><a-button @click="lockshow=true">封号</a-button></div>
    <detail-list layout="grid" :col="1">
      <detail-list-item term="上级代理">1000000000</detail-list-item>
      <detail-list-item term="联系电话">已取货</detail-list-item>
      <detail-list-item term="联系地址">已取货已取货已取货已取货已取货已取货已取货已取货</detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list title="代理详情" layout="grid" :col="2">
      <detail-list-item term="代理编号">1000000000</detail-list-item>
      <detail-list-item term="国家地区">中国</detail-list-item>
      <detail-list-item term="代理等级">一级</detail-list-item>
      <detail-list-item term="省份">四川省</detail-list-item>
      <detail-list-item term="姓名">辉哥</detail-list-item>
      <detail-list-item term="城市">成都市</detail-list-item>
      <detail-list-item term="联系电话">028-88888888</detail-list-item>
      <detail-list-item term="区县">高新区</detail-list-item>
      <detail-list-item term="微信号">fdsafds</detail-list-item>
      <detail-list-item term="详细地址">天府三街</detail-list-item>
      <detail-list-item term="身份证" :span="2">510432432423</detail-list-item>
      <detail-list-item term="头像">
        <img height="50" width="50" src="" />
      </detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list title="转账信息" layout="grid" :col="2">
      <detail-list-item term="打款方式">1000000000</detail-list-item>
      <detail-list-item term="银行账户名">已取货</detail-list-item>
      <detail-list-item term="打款金额">￥100.00</detail-list-item>
      <detail-list-item term="银行账户">3243243243242</detail-list-item>
      <detail-list-item term="开户银行">中国银行</detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <detail-list layout="grid" :col="2">
      <detail-list-item term="打款凭证">
        <img height="50" width="50" src="" />
      </detail-list-item>
    </detail-list>
    <a-modal title="封号" v-model="lockshow" @ok="handleLockOk" cancelText="取消" okText="确认">
      <lockaccount ref="reasoncom" :id='2'></lockaccount>
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
      async loaddetail() {
        this.loading = true
        var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
        this.info=ret.result;
      },
      handleLockOk(){//封号

      },
    }
  }

</script>
