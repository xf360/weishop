<template>
    <div>
        <van-nav-bar title="余额提现" right-text="明细" left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>
        <van-cell-group>
            <van-field v-model="info.bankName" required label="银行名称" placeholder="请输入银行名称"/>
            <van-field v-model="info.bankBranchName" required clearable label="支行名称" placeholder="请输入支行名称"/>
            <van-field v-model="info.bankUserName" required label="开户姓名" placeholder="请输入开户姓名"/>
            <van-field v-model="info.bankNumber" required clearable label="卡号" placeholder="请输入银行卡号"/>
            <van-field v-model="info.amout" type="number" required clearable label="提现金额" placeholder="请输入提现"/>
        </van-cell-group>
        <div class="loginbt">
            <van-button block type="primary" :disabled="disabled"  @click="onSubmit">确认提现</van-button>
        </div>
    </div>
</template>
<style>

    .loginbt {
        margin: auto;
        padding: 20px;
        text-align: center;
    }
</style>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        PullRefresh,
        Cell,
        Field,
        CellGroup,
        Button ,
        Toast
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(Field).use(NavBar).use(Button ).use(Toast);
    export default {
        data() {
            return {
                disabled:false,
                info:{
                    bankName:'',
                    bankBranchName:'',
                    bankUserName:'',
                    bankNumber:'',
                    amout:0
                }
            }
        },
        methods: {

            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight(){
                this.$router.push('/getcashlist')
            },
            async onSubmit(){
                if (!this.info.bankName) {
                    Toast.fail('银行名称不能为空。');
                    return;
                }
                if (!this.info.bankBranchName) {
                    Toast.fail('支行名称不能为空。');
                    return;
                }
                if (!this.info.bankUserName) {
                    Toast.fail('开户姓名不能为空。');
                    return;
                }
                if (!this.info.bankNumber) {
                    Toast.fail('卡号不能为空。');
                    return;
                }
                if (!this.info.amout) {
                    Toast.fail('金额不能为空。');
                    return;
                }
                var ret= await this.$http.Post('/api/services/app/B_Withdrawal/Create',this.info);
                if(ret.success){
                    this.disabled=true;
                    Toast.success('申请提交成功，等待管理员审核。');
                    this.$router.go(-1)
                    return;
                }
            }
        }
    }
</script>