<template>
    <div>
        <van-nav-bar title="我的钱包" right-text="提现" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <van-tabs>
            <van-tab title="余额">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
                <van-list>
                    <div class="box">
                        <div class="left">￥5000</div>
                        <div>保证金：<span class="right">￥1000</span></div>
                    </div>

                    <van-panel v-for="(item,index) in datalist" :key="index" :title="`类型:${item.typename}`"
                        :desc="item.createtime" :status="item.statueTitle">
                        <div class="cont">
                            <p style="color:green" v-if="item.way==1">金额：+ {{item.money}}</p>
                            <p style="color:red" v-if="item.way==0">金额：- {{item.money}}</p>
                            <p>订单号:{{item.no}}</p>
                        </div>
                    </van-panel>

                </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="货款">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
                <van-list>
                    <div class="box">
                        <div class="left">￥5000</div>
                    </div>
                    <van-cell-group>
                        <van-cell title="货款充值" icon="location-o" is-link @click="chongzhi"/>
                    </van-cell-group>
                    <van-panel v-for="(item,index) in datalist" :key="index" :title="`类型:${item.typename}`"
                        :status="item.createtime">
                        <div class="cont">
                            <p style="color:green" v-if="item.way==1">金额：+ {{item.money}}</p>
                            <p style="color:red" v-if="item.way==0">金额：- {{item.money}}</p>
                            <p>订单号:{{item.no}}</p>
                        </div>
                    </van-panel>

                </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>
<style>
    .box {
        display: grid;
        grid-template-columns: 50% 50%;
        text-align: center;
        padding: 20px;
        background-color: #ffffff;
    }

    .box .left {
        color: #ff0000;
        font-size: 20px;
        font-weight: bold;

    }

    .box .right {
        color: #ff0000;
        font-size: 20px;
        font-weight: bold;

    }

    .cont {
        padding: 5px;
        font-size: 12px;
    }
</style>

<script>
    import Vue from 'vue';
    import {
        Tab,
        Tabs,
        Panel,
        List,
        NavBar,
        PullRefresh,
        Cell,
        CellGroup
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(Tab).use(NavBar).use(Tabs).use(Panel).use(List).use(PullRefresh);
    export default {
        data() {
            return {
                refreshing:false,
                datalist: [{
                    type: 0,
                    typename: '下单支出',
                    createtime: '2019-03-09 12:23:34',
                    money: 150,
                    way: 0,
                    no: '3243423432432',
                    statueTitle: '已完成'
                }, {
                    type: 0,
                    typename: '订单货款',
                    createtime: '2019-03-09 12:23:34',
                    money: 120,
                    way: 1,
                    no: '3243423432432',
                    statueTitle: '已完成'
                }, {
                    type: 0,
                    typename: '订单货款',
                    createtime: '2019-03-09 12:23:34',
                    money: 120,
                    way: 1,
                    no: '3243423432432',
                    statueTitle: '已完成'
                }]
            }
        },
        methods: {
            onRefresh(){

            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push("/getcash")
            },
            chongzhi(){
                this.$router.push('/pushcash')
            }
        }
    }
</script>