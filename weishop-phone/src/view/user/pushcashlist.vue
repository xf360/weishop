<template>
    <div>
        <van-nav-bar title="充值记录" left-arrow @click-left="onClickLeft" />
        <van-tabs @change="change">
            <van-tab title="全部" id="getcashlist">
            </van-tab>
            <van-tab title="待审核">
            </van-tab>
            <van-tab title="已通过">
            </van-tab>
            <van-tab title="未通过">
            </van-tab>
        </van-tabs>
        <van-list v-model="loading" :finished="finished" finished-text="加载完成" style="margin-top: 40px;" @load="onLoad(0)">
            <van-cell-group v-for="(item,index) in datalist" :key="index">
                <van-cell title="编号" :value="item.code" :label="item.payDate|dateformat" />
                <van-cell title="打款方式" :value="item.payType===0?'支付宝':'银行转账'" />
                <van-cell title="支付账户" :value="item.payAcount" />
                <van-cell title="状态" :value="item.status===0?'待审核':(item.status===1?'已通过':'未通过')" />
                <van-cell title="打款金额">
                    <span slot="right-icon" style="color:#ff0000">￥{{item.payAmout}}</span>
                </van-cell>
            </van-cell-group>
        </van-list>
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
                params: {
                    status: null,
                    maxResultCount: 99,
                    skipCount: 0,
                },
                datalist: []
            }
        },
        mounted() {
            this.onLoad();
        },
        methods: {
            change(index) {
                switch (index) {
                    case 0:
                        this.params.status = null;
                        break;
                    case 1:
                        this.params.status = 0;
                        break;
                    case 2:
                        this.params.status = 1;
                        break;
                    case 3:
                        this.params.status = 2;
                        break;
                }
                this.onLoad()
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onRefresh(index) {
                // var vm = this;
                // setTimeout(() => {
                //     vm.refreshing = false;
                //     window.scrollTo(0, 10);
                // }, 1000);
            },
            async onLoad() {
                this.loading = true;
                var ret = await this.$http.Get('/api/services/app/B_PaymentPrepay/GetListForWx', this.params);
                if (ret.success) {
                    this.datalist = ret.result.items;
                }
                this.loading = false;
                this.finished = true;

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