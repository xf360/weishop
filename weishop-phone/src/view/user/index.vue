<template>
  <div style="overflow-x: hidden;">
    <img class="user-poster" width="100%" height="150px" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <div class="userinfo">
      <div class="userheader">
        <!-- <div class="userborder"></div> -->
        <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557236083&di=0ec8c16425acc4ba7c38a74ce1243fe6&src=http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@1280w_1l_2o_100sh.png"/>
      </div>
      <div class="username" v-if="user">
        <div>{{user.user.name}}</div>
        <div>销售额：0</div>
      </div>
      <div class="username" v-else>
         <div @click="$router.push('/login')">请先登陆</div>
      </div>
    </div>
    <van-row class="user-links" :gutter="1" type="flex" justify="center" align="center">
      <van-col span="8" @click.native="push('/mycash')">
        <van-icon name="pending-payment" />
        我的钱包
      </van-col>
      <van-col span="8" @click.native="push('/mysale')">
        <van-icon name="medel-o" />
        我的销售
      </van-col>
      <van-col span="8" @click.native="push('/myway')">
        <van-icon name="shop-collect-o" />
        渠道
      </van-col>
    </van-row>
    <van-row style="margin-top:2px" class="user-links" :gutter="1" type="flex" justify="center" align="center">
      <van-col span="8">
        <van-icon name="logistics" @click.native="push('/index/yuncangin')"/>
        我要进货
      </van-col>
      <van-col span="8">
        <van-icon name="cash-back-record" @click.native="push('/index/inlog')"/>
        云仓订单
      </van-col>
      <van-col span="8">
        <van-icon name="balance-list-o" @click.native="push('/index/outlog')"/>
        提货订单
      </van-col>
    </van-row>
       <van-row style="margin-top:2px" class="user-links" :gutter="1" type="flex" justify="center" align="center">
      <van-col span="8"  @click.native="push('/mylicence')">
        <van-icon name="passed"/>
        我的授权
      </van-col>
      <van-col span="8" @click.native="push('/myad')">
        <van-icon name="fire-o" />
        我要推广
      </van-col>
      <van-col span="8" @click.native="push('/setting')">
        <van-icon name="apps-o" />
        综合业务
      </van-col>
    </van-row>

    <!-- <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group> -->
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Icon,
    Cell,
    CellGroup
  } from 'vant';

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    computed:{
      user(){
        return this.$store.getters.user;
      }
    },
    methods:{
      push(url){
        this.$router.push(url);
      }
    }
  };
</script>

<style lang="less">

.userinfo{
padding: 10px;
background-color: #fff;
margin-bottom: 2px;
display: grid;
grid-template-columns: 70px auto;
}
.userheader img{
  height: 50px;
  width: 50px;
  border-radius: 20px;
}
.contant .user-links{
    padding: 15px 0;
    font-size: 14px;
}
.contant .user-links .van-icon{
  font-size: 38px;
}
// .userborder{
//   height: 50px;
//   width: 50px;

// }
  .user {
    &-poster {
      width: 100%;
      display: block;
    }

    &-group {
      margin-bottom: 15px;
    }

    &-links {
      padding: 15px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;

      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
</style>