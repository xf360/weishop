<template>
    <div>
        <van-nav-bar title="我的销售明细" left-arrow @click-left="$router.go(-1)" />
        <div class="selectmonth">
            <div class="nav" @click="pre">
                <van-icon name="arrow-left" />
            </div>
            <div class="month">{{parmars.year}}年{{parmars.month}}月</div>
            <div class="nav" @click="next">
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="monthsale">
            {{saleinfo.profit+saleinfo.bonus}}
        </div>
        <div class="salestatic">
            <div>
                <div>利润</div>
                <div>{{saleinfo.profit}}</div>
            </div>
            <div>
                <div>奖金</div>
                <div>{{saleinfo.bonus}}</div>
            </div>
            <div>
                <div>销售折扣</div>
                <div>{{saleinfo.discount}}</div>
            </div>
        </div>
         <div class="allsale">
            业绩品类：{{saleinfo.categroyName}}
        </div>
        <div class="allsale">
            总销售额
            <div class="all">{{saleinfo.totalSales}}</div>
        </div>
        <div class="salelist">
            <van-cell-group title="销售额明细" >
                <div v-if="salelist&&salelist.length>0">
                <van-cell v-for="(item,index) in salelist" :key="index">
                    <template slot="title">
                        <div class="listbox">
                            <img :src="api+'api/AbpFile/Show?id='+item.file.id" height="70" width="70"/>
                            <div class="info">
                                <div>名称：{{item.agencyName}}</div>
                                <div>级别：{{item.agencyLeavelName}}</div>
                                <div>业绩：{{item.sales}}</div>
                            </div>
                        </div>
                    </template>
                </van-cell>
                 </div>
                <div v-else>
                    <center>暂无数据</center>
                </div>
            </van-cell-group>
        </div>
    </div>
</template>
<style>
    .allsale {
        margin-top: 1px;
        height: 40px;
        line-height: 40px;
        color: #666666;
        background-color: #fff;
        padding-left: 10px;
        padding-right: 10px
    }

    .allsale .all {
        display: inline;
        float: right;
    }

    .salestatic {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        background-color: #fff;
        text-align: center;
        margin-top: 1px;
        color: #666666;
        font-size: 12px;
    }

    .monthsale {
        padding: 20px;
        text-align: center;
        font-size: 20px;
        margin-top: 40px;
        background-color: #fff;
        color: #666666;
    }

    .selectmonth {
        height: 40px;
        display: grid;
        grid-template-columns: 40px auto 40px;
        border-bottom: 1px solid #F1F1F1;
        position: fixed;
        top: 45px;
        left: 0px;
        right: 0px;
        background-color: #fff;
        color: #666666;
    }

    .selectmonth .month {
        text-align: center;
        line-height: 40px;
    }

    .selectmonth .nav {
        line-height: 40px;
        text-align: center;
    }
    .listbox{
        display: grid;
        grid-template-columns: 70px auto 20px;
        grid-gap: 10px;
        font-size: 12px;
    }
    .listbox .right{
        line-height: 70px;
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
        CellGroup,
        Icon
    } from 'vant';

    Vue.use(Cell).use(Icon).use(CellGroup).use(Tab).use(NavBar).use(Tabs).use(Panel).use(List).use(PullRefresh);
    export default {
        data() {
            return {
                api:this.$http.api,
                parmars: {
                    year: (new Date).getFullYear(),
                    month: (new Date).getUTCMonth() + 1,
                    categroyId: null
                },
                listparmar:{
                    salesDateYear:0,
                    salesDateMonth:0,
                    maxResultCount:99,
                    skipCount:0,
                },
                saleinfo: {
                    totalSales: 0,
                    profit: 0,
                    bonus: 0,
                    discount: 0,
                    categroyName: '',
                },
                salelist:[]
            }
        },
        mounted() {
            this.getsaleinfo();
            this.getsalelist();
        },
        methods: {
            async getsaleinfo() {
                debugger;
                if(!this.$route.query.id){
                    return;
                }
                this.parmars.categroyId=this.$route.query.id
                var ret = await this.$http.Get('/api/services/app/B_AgencySales/Get', this.parmars);
                if (ret.success) {
                    ret.saleinfo = ret.result;
                }
            },
            async getsalelist(){
                 if(!this.$route.query.id){
                    return;
                }
                this.listparmar.categroyId=this.$route.query.id
                this.listparmar.salesDateYear=this.parmars.year;
                this.listparmar.salesDateMonth=this.parmars.month;
                var ret = await this.$http.Get('/api/services/app/B_AgencySales/GetListByCategroyId', this.listparmar);
                if (ret.success) {
                    ret.salelist = ret.result.items;
                }
            },
            pre() {
                if (this.parmars.month == 1) {
                    this.parmars.year--;
                    this.parmars.month = 12;
                } else {
                    this.parmars.month--;
                }
                this.getsaleinfo()
            },
            next() {
                if (this.parmars.month >= 12) {
                    this.parmars.year++;
                    this.parmars.month = 1;
                } else {
                    this.parmars.month++;
                }
                this.getsaleinfo()
            }
        }
    }
</script>