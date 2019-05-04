<template>
<div>
    <div class="contant">
        <router-view />
    </div>
    <van-tabbar v-model="active" @change="change">
        <van-tabbar-item icon="bullhorn-o" url="#/index/message">信息</van-tabbar-item>
        <van-tabbar-item icon="hot-o" url="#/index/mall">商城</van-tabbar-item>
        <van-tabbar-item icon="cart-o" url="#/index/cart" :info="goodcount">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" url="#/index/user">我的</van-tabbar-item>
        <van-tabbar-item icon="service-o">客服</van-tabbar-item>
    </van-tabbar>
</div>
</template>
<script>
    import Vue from 'vue';
    import {
        Tabbar,
        TabbarItem
    } from 'vant';
    Vue.use(Tabbar).use(TabbarItem);
    export default {
        data(){
            return {
                active:0
            }
        },
        methods:{
            change(active){
                this.active=active;
            }
        },
        computed:{
            goodcount(){
                return this.$store.getters.count;
            }
        },
        mounted(){
            this.$store.dispatch("getCurrentLoginInformations")
        }
    }
</script>
<style>
.contant{
    position: fixed;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow:auto;
    -webkit-overflow-scrolling : touch;
}
</style>
