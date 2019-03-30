<template>
    <div>
        <van-nav-bar title="充值记录" left-arrow @click-left="onClickLeft" />
        <van-tabs>
            <van-tab title="全部" id="getcashlist">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)" style="top:90px;">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad(0)">
                        <van-cell-group v-for="(item,index) in datalist" :key="index">
                            <van-cell title="编号" :value="item.no"  :label="item.createtime" />
                            <van-cell title="开户名" :value="item.name" />
                            <van-cell title="账户" :value="item.cardNo" />
                             <van-cell title="状态" :value="item.statusTitle" />
                              <van-cell title="金额" >
                                  <span slot="right-icon" style="color:#ff0000">￥{{item.money}}</span>
                              </van-cell>
                        </van-cell-group>
                    </van-list>
                </van-pull-refresh>
            </van-tab>

            <van-tab title="待审核">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad(0)">
                        
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="已完成">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    
                </van-pull-refresh>
            </van-tab>
            <van-tab title="未通过">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>
<style>
    .van-tabs {
        position: absolute;
        top: 45px;
        height: 45px;
        left: 0;
        right: 0;
    }
   #getcashlist .van-cell{
        padding: 5px 15px;
    }
    #getcashlist .van-cell-group{
        margin-bottom: 5px
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
                active: 0,
                loading: false,
                finished: true,
                refreshing: false,
                datalist: [{
                    paytype:1,
                    no: '123123123',
                    createtime: '2019-03-05 12:00:01',
                    statusTitle: '待审核',
                    status: 1,
                    bankName: '中国建设银行',
                    subName: '桃溪路支行',
                    name: '张三',
                    cardNo: '62220003234324324',
                    money: 1500
                }]
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onRefresh(index) {
                var vm = this;
                setTimeout(() => {
                    vm.refreshing = false;
                    window.scrollTo(0, 10);
                }, 1000);
            },
            onLoad() {
                var vm = this;
                setTimeout(function () {

                    for (var i = 0; i < 10; i++) {
                        vm.agentdata.push({
                            no: i,
                            status: 0,
                            statusName: '已完成',
                            content: '货物已发出',
                            date: '2019-3-25 18:25:00'
                        })
                    }
                    // 加载状态结束
                    vm.loading = false;
                    if (vm.agentdata.length > 40) {
                        vm.finished = true;
                    }
                }, 500)
            }
        }
    }
</script>

<style>
    .van-tabs .van-tab__pane {
        bottom: 50px;
        position: fixed;
        overflow: auto;
        top: 90px;
    }

    .van-panel__content {
        padding: 1px 10px;
        margin-bottom: 10px;
    }
</style>