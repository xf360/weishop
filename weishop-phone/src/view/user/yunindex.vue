<template>
    <!-- 云仓订单 -->
    <div>
        <van-nav-bar title="云仓订单" left-arrow @click-left="$router.go(-1)" />
        <div style="text-align:center">
        <van-button style="margin:20px;width:150px" type="primary"  @click="$router.push('/index/inlog')">云仓进货订单</van-button>
        <br/>
        <van-button style="margin:20px;width:150px" type="primary"  @click="$router.push('/index/sublog')">下级订单</van-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
    import {
        NavBar,
        Button
    } from 'vant';
    Vue.use(NavBar).use(Button);
export default {
    data(){
        return {}
    }
}
</script>
