<template>
    <div id="setindex">
        <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell icon="location-o" title="个人信息" is-link/>
            <van-cell icon="location-o" title="我的消息" is-link url="/index/message"/>
            <van-cell icon="location-o" title="实体店报名" is-link/>
            <van-cell icon="location-o" title="代理协议" is-link/>
            <van-cell icon="location-o" title="绑定微信" is-link/>
            <van-cell icon="location-o" title="问题反馈" is-link/>
        </van-cell-group>
           <div class="loginbt">
            <van-button block  @click="onSubmit">退出登陆</van-button>
        </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        CellGroup,
        Actionsheet,
         Button
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(NavBar).use(Actionsheet).use(Button);

    export default {
        data() {
            return {
            }
        },
        methods: {
            onSubmit(){},
            onClickLeft() {
                this.$router.go(-1)
            },
            
        }
    }
</script>
<style>
    .loginbt {
        margin: auto;
        padding: 20px;
        text-align: center;
    }
</style>