<template>
    <div>
        <van-nav-bar title="货款充值" right-text="明细" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <van-cell-group>
            <van-radio-group v-model="info.paytype">
                <van-cell title="支付宝" clickable @click="info.paytype = 1">
                    <van-radio :name="1" />
                </van-cell>
                <van-cell title="微信" clickable @click="info.paytype = 2">
                    <van-radio :name="2" />
                </van-cell>
                <van-cell title="银行转账" clickable @click="info.paytype = 3">
                    <van-radio :name="3" />
                </van-cell>

            </van-radio-group>
        </van-cell-group>
        <van-cell-group v-if="info.paytype===1">
            <van-field v-model="info.cardNo" required clearable label="支付宝账户" placeholder="请输入支付宝账户" />
            <van-field v-model="info.money" type="number" required clearable label="金额" placeholder="请输入金额" />
            <van-field v-model="info.time" required clearable label="日期" placeholder="请输入日期" />
            <van-field v-model="info.desc" required clearable label="备注" placeholder="请输入备注" />
            <van-cell>
                <template slot="title">
                    <div>请打款至：
                        支付宝账户：XXXX<br />
                        户名：XXXX<br />
                        如有问题请联系客户：qqXXXXXX
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group v-if="info.paytype===2">
            <van-field v-model="info.cardNo" required clearable label="微信账户" placeholder="请输入微信账户" />
            <van-field v-model="info.money" type="number" required clearable label="金额" placeholder="请输入金额" />
            <van-field v-model="info.time" required clearable label="日期" placeholder="请输入日期" />
            <van-field v-model="info.desc" required clearable label="备注" placeholder="请输入备注" />
            <van-cell>
                <template slot="title">
                    <div>请打款至：
                        微信号：XXXX<br />
                        户名：XXXX<br />
                        如有问题请联系客户：qqXXXXXX
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group v-if="info.paytype===3">
            <van-field v-model="info.bankName" required label="银行名称" placeholder="请输入银行名称" disabled />
            <van-field v-model="info.subName" required clearable label="支行名称" placeholder="请输入支行名称" />
            <van-field v-model="info.name" required label="开户姓名" placeholder="请输入开户姓名" />
            <van-field v-model="info.cardNo" required clearable label="卡号" placeholder="请输入银行卡号" />
            <van-field v-model="info.money" type="number" required clearable label="金额" placeholder="请输入金额" />
            <van-field v-model="info.time" required clearable label="日期" placeholder="请输入日期" />
            <van-field v-model="info.desc" required clearable label="备注" placeholder="请输入备注" />
            <van-cell>
                <template slot="title">
                    <div>请打款至：
                        开户行：XXXX银行<br />
                        户名：XXXX<br />
                        账户:XXXXXXXXXXXX<br />
                        如有问题请联系客户：qqXXXXXX
                    </div>
                </template>
            </van-cell>
        </van-cell-group>

        <div class="loginbt">
            <van-button block type="primary" @click="onSubmit">确认充值</van-button>
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
        Button,
        RadioGroup,
        Radio
    } from 'vant';

    Vue.use(Cell).use(RadioGroup).use(Radio).use(CellGroup).use(Field).use(NavBar).use(Button);
    export default {
        data() {
            return {
               
                info: {
                    paytype: 1,
                    bankName: '中国建设银行',
                    subName: '桃溪路支行',
                    name: '张三',
                    cardNo: '6222530000293999999939999',
                    money: 0,
                    time: '',
                    desc: ''
                }
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push('/pushcashlist')
            },
            onSubmit() {}
        }
    }
</script>