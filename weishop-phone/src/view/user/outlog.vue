<template>
    <!-- 我的提货订单 -->
    <div>
        <van-nav-bar title="我的提货订单" left-arrow @click-left="$router.go(-1)" @click-right="onClickRight" />
        <van-tabs @change="change">
            <van-tab :title="item.name" v-for="(item,index) in catory" :key="index"></van-tab>
        </van-tabs>
        <div v-if="list&&list.length>0">
            <div v-for="(item,index) in list" :key="index" style="background-color:#fff;padding:10px;color:#323233;border-bottom: 1px solid #ccc;">
                <div>编号：{{item.orderNo}} <span>状态：
                    <span v-if="item.status===0">待发货</span>
                    <span v-if="item.status===1">已发货</span>
                    <span v-if="item.status===2">已完成</span>
                    </span></div>
                <div>时间：{{item.creationTime|dateformat}}</div>
                <div>收件人：{{item.addressUserName}}</div>
                <div>数量：{{item.goodsNumber}}</div>
                <div>金额：{{item.amout}}</div>
                <div v-for="(good,index2) in item.goodsList" :key="index2"
                    style="display: grid;grid-template-columns: 60px auto;grid-gap: 5px;">
                    <img height="50" width="50" :src="api+'api/AbpFile/Show?id='+good.file.id" />
                    <div>
                        <div>{{good.goodsTitle}}</div>
                        <div>×{{good.number}}</div>
                        <div>￥{{good.amout}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else style="text-align:center">暂无数据</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        Tab,
        Tabs,
        Panel,
        List,
        PullRefresh,
        NavBar
    } from 'vant';
    import gooditem from '../goods/gooditem.vue'
    Vue.use(Tab).use(Tabs).use(Panel).use(List).use(PullRefresh).use(NavBar);

    export default {
        components: {
            gooditem
        },
        data() {
            return {
                api: this.$http.api,
                list: [],
                status: null,
                catory: [{
                        name: '全部'
                    },
                    {
                        name: '待发货'
                    },
                    {
                        name: '已发货'
                    },
                    {
                        name: '已完成'
                    }
                ]
            }
        },
        mounted() {
            this.loadlist();
        },
        methods: {
            change(index) {
                switch (index) {
                    case 0:
                        this.status = null;
                        break;
                    case 1:
                        this.status = 0
                        break;
                    case 2:
                        this.status = 1
                        break;
                    case 3:
                        this.status = 2
                        break;
                }
                this.loadlist();
            },
            addcart(id, count, price) {
                var good = this.goods.filter((item) => item.id === id)[0]
                good.number = count;
                good.amout = price;
                this.$store.commit('addgood', good)
            },
            onClickRight() {},

            async loadlist() {
                var ret = await this.$http.Get('/api/services/app/B_OrderOut/GetMyList', {
                    status: this.status,
                    maxResultCount: 20,
                    skipCount: 0,
                });
                if (ret.success) {
                    debugger;
                    this.list = ret.result.items;
                }
            }
        }
    }
</script>

<style>

</style>