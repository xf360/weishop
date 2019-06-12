<template>
    <div>
        <van-nav-bar title="提现记录" left-arrow @click-left="onClickLeft" />
        <van-tabs @change="change">
            <van-tab title="全部" id="getcashlist">
            </van-tab>
            <van-tab title="待审核">
            </van-tab>
            <van-tab title="待打款">
            </van-tab>
            <van-tab title="已打款">
            </van-tab>
            <van-tab title="未通过">
            </van-tab>
            <van-tab title="打款异常">
            </van-tab>
        </van-tabs>
        <van-pull-refresh  v-model="refreshing" @refresh="onRefresh(0)" style="padding-top: 44px;">
            <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad(0)">
                <van-cell-group v-for="(item,index) in datalist" :key="index">
                    <van-cell title="编号" :value="item.code" :label="item.creationTime" />
                    <van-cell title="银行名称" :value="item.bankName" />
                    <van-cell title="支行名称" :value="item.bankBranchName" />
                    <van-cell title="开户名" :value="item.bankUserName" />
                    <van-cell title="账户" :value="item.bankNumber" />
                    <van-cell title="状态" :value="item.status" />
                    <van-cell title="金额">
                        <span slot="right-icon" style="color:#ff0000">￥{{item.amout}}</span>
                    </van-cell>
                </van-cell-group>
            </van-list>
        </van-pull-refresh>
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

    #getcashlist .van-cell {
        padding: 5px 15px;
    }

    #getcashlist .van-cell-group {
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
                parmars: {
                    status: null,
                    maxResultCount: 99,
                    skipCount: 0
                },
                datalist:[]
            }
        },
        mounted(){
            this.onLoad();
        },
        methods: {
            change(index) {
                if (index == 0) {
                    this.parmars.status = null;
                } else {
                    this.parmars.status = index-1;
                }
                this.onLoad();
            },
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
            async onLoad() {
                this.loading = true;
                var ret = await this.$http.Get('/api/services/app/B_Withdrawal/GetMyList', this.parmars);
                this.loading = false;
                if (ret.success) {
                    this.datalist = ret.result.items;
                }
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