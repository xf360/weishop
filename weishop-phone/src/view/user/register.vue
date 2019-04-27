<template>
    <div>
        <van-nav-bar title="代理协议" />
        <div>
            协议内容
        </div>

        <center>
            <van-checkbox style="margin:20px" v-model="agree">同意签署此协议</van-checkbox>
            <van-button style="margin:20px"  type="info" size="normal" @click="click">同意提交</van-button>
        </center>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        Checkbox,
        Button

    } from 'vant';

    Vue.use(NavBar).use(Checkbox).use(Button);
    export default {
        data(){
            return {
                agree:false
            }

        },
        methods:{
            click(){
                this.$router.push("/register2")
            }
        }
    }
</script>