<template>
    <div>
        <van-nav-bar title="邀请链接" right-text="添加" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <img :src="qrcode" class="qrcodeimg"/>
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
    import {
        NavBar,
    } from 'vant';

    Vue.use(NavBar);
    export default {
        data(){
            return {
                qrcode:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553940890547&di=6088c0c6db77ebb80386693e6203298b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201701%2F28%2F20170128085020_jfRhX.jpeg',
                url:''
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