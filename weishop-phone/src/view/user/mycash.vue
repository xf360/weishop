<template>
    <div>
        <van-nav-bar title="我的钱包" right-text="提现" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <van-tabs @change="change">
            <van-tab title="余额">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
                <van-list>
                    <div class="box">
                        <div class="left">￥{{cashinfo.blance}}</div>
                        <div>保证金：<span class="right">￥{{cashinfo.deposit}}</span></div>
                    </div>

                    <van-panel v-for="(item,index) in banlcelist" :key="index" :title="`类型:${item.type===0?'支出':'充值'}`"
                        :desc="item.createTime" :status="item.status">
                        <div class="cont">
                            <p style="color:green" v-if="item.type==1">金额：+ {{item.money}}</p>
                            <p style="color:red" v-if="item.type==0">金额：- {{item.money}}</p>
                            <p>订单号:{{item.orderNo}}</p>
                        </div>
                    </van-panel>

                </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="货款">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
                <van-list>
                    <div class="box">
                        <div class="left">￥{{cashinfo.goodPayment}}</div>
                    </div>
                    <van-cell-group>
                        <van-cell title="货款充值" icon="location-o" is-link @click="chongzhi"/>
                    </van-cell-group>
                    <van-panel v-for="(item,index) in goodpaymentlist" :key="index" :title="`类型:${item.type===0?'支出':'充值'}`"
                        :status="item.createTime">
                        <div class="cont">
                            <p style="color:green" v-if="item.type==1">金额：+ {{item.money}}</p>
                            <p style="color:red" v-if="item.type==0">金额：- {{item.money}}</p>
                            <p>订单号:{{item.orderNo}}</p>
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
                cashinfo:{
                    blance:0,
                    deposit:0,
                    goodPayment:0
                },
                banlcelist:[],
                goodpaymentlist:[]
            }
        },
        mounted(){
            this.getcashinfo();
            this.getbancelist();
        },
        methods: {
            onRefresh(){

            },
            change(index){
                switch(index){
                    case 0:
                    this.getbancelist();
                    break;
                    case 1:
                    this.getGoodPaymentList();
                    break;
                }
            },
            async getcashinfo(){
                var ret= await this.$http.Get('/api/services/app/B_Order/Get');
                if(ret.success){
                    this.cashinfo=ret.result;
                }
            },
            async getbancelist(){
                var ret= await this.$http.Get('/api/services/app/B_Order/GetBlanceList',{
                    maxResultCount:99,
                    skipCount:0
                });
                if(ret.success){
                    this.banlcelist=ret.result.items;
                }
            },
            async getGoodPaymentList(){
                 var ret= await this.$http.Get('/api/services/app/B_Order/GetGoodPaymentList',{
                    maxResultCount:99,
                    skipCount:0
                });
                if(ret.success){
                    this.goodpaymentlist=ret.result.items;
                }
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