<template>
    <div>
        <van-nav-bar title="我的授权" left-arrow @click-left="onClickLeft" />
        授权证书
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
    } from 'vant';

    Vue.use(NavBar);
export default {
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>
