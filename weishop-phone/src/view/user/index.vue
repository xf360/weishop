<template>
  <div style="overflow-x: hidden;">
    <img class="user-poster" width="100%" height="150px" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <div class="userinfo">
      <div class="userheader">
        <!-- <div class="userborder"></div> -->
        <img src="http://img0.imgtn.bdimg.com/it/u=3838364273,4038739803&fm=27&gp=0.jpg"/>
      </div>
      <div class="username">
        <div>王飞飞</div>
        <div>销售额：￥500</div>
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
        <van-icon name="cash-back-record"/>
        云仓订单
      </van-col>
      <van-col span="8">
        <van-icon name="balance-list-o"/>
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