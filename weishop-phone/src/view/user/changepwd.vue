<template>
    <div id="setindex">
        <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-field v-model="info.currentPassword" type="password" label="原密码" placeholder="请输入原密码" required />
            <van-field v-model="info.newPassword" type="password" label="新密码" placeholder="请输入新密码" required />
            <van-field v-model="info.newPassword2" type="password" label="再次输入密码" placeholder="请再次输入密码" required />
        </van-cell-group>
        <div class="loginbt">
            <van-button block @click="onSubmit">保存</van-button>
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
        Button,
        Toast ,
        Field 
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(NavBar).use(Actionsheet).use(Button).use(Toast ).use(Field );

    export default {
        data() {
            return {
                info:{
                    currentPassword:'',
                    newPassword:'',
                    newPassword2:''
                }
            }
        },
        methods: {
            async onSubmit() {
               if(!this.info.newPassword||this.info.newPassword.length<6){
                   Toast.fail('新密码不能小于6位');
                   return;
               }
               if(this.info.newPassword!=this.info.newPassword2){
                    Toast.fail('两次输入密码不一样');
                   return;
               }
               var ret=await this.$http.Post('/api/services/app/Profile/ChangePassword',this.info);
               if(ret.success){
                   Toast.success('密码修改成功，请重新登陆。');
                   this.$router.push('#/login')
               }
            },
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