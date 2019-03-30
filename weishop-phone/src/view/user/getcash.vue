<template>
    <div>
        <van-nav-bar title="余额提现" right-text="明细" left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>
        <van-cell-group>
            <van-field v-model="info.bankName" required label="银行名称" placeholder="请输入银行名称" disabled/>
            <van-field v-model="info.subName" required clearable label="支行名称" placeholder="请输入支行名称"/>
            <van-field v-model="info.name" required label="开户姓名" placeholder="请输入开户姓名"/>
            <van-field v-model="info.cardNo" required clearable label="卡号" placeholder="请输入银行卡号"/>
            <van-field v-model="info.money" type="number" required clearable label="提现金额" placeholder="请输入提现"/>
        </van-cell-group>
        <div class="loginbt">
            <van-button block type="primary"  @click="onSubmit">确认提现</van-button>
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
        Button 
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(Field).use(NavBar).use(Button );
    export default {
        data() {
            return {
                info:{
                    bankName:'中国建设银行',
                    subName:'桃溪路支行',
                    name:'张三',
                    cardNo:'6222530000293999999939999',
                    money:0
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
            onSubmit(){}
        }
    }
</script>