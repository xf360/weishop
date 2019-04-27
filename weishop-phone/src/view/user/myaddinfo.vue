<template>
    <div>
        <van-nav-bar title="邀请链接" right-text="添加" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <!-- <img :src="qrcode" class="qrcodeimg"/> -->
        <qrcode  class="qrcodeimg" :value="qrcode" :options="{ size: 300 }"></qrcode>
        <a :href="qrcode">{{qrcode}}</a>
        <p>说明：长按二维码图片识别二维码</p>
    </div>
</template>
<style>
.qrcodeimg{
width: 80%;
    padding: 10%;
}
</style>

<script>
    import Vue from 'vue';
    import VueQrcode from '@xkeshi/vue-qrcode';
    import {
        NavBar,
    } from 'vant';

    Vue.use(NavBar);
    Vue.component(VueQrcode.name, VueQrcode);
    export default {
        data(){
            return {
                
            }
        },
        computed:{
            qrcode(){
                return window.location.origin+'/#/register?id='+this.$route.query.id;
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push("/myadadd")
            },
        }
    }
</script>