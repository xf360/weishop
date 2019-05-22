<template>
    <!-- 我的提货订单 -->
    <div>
        <van-nav-bar title="我的进货订单" left-arrow @click-left="$router.go(-1)" @click-right="onClickRight" />
        <van-tabs @change="change">
            <van-tab :title="item.name" v-for="(item,index) in catory" :key="index"></van-tab>
        </van-tabs>
        <div v-if="list&&list.length>0">
            <div v-for="(item,index) in list" :key="index" class="yuncangbox">
                <div>
<img :src="api+'api/AbpFile/Show?id='+item.file.id" width="56" height="56" />
                </div>
                <div>
                    <div>编号：{{item.orderNo}} <span class="status">状态：<span v-if="item.status===1">上级缺货</span><span v-if="item.status===2">已完成</span> </span></div>
                    <div>时间：{{item.creationTime|dateformat}}</div>
                    <div>收件人：{{item.addressUserName}}</div>
                    <div>数量：{{item.goodsNumber}}</div>
                    <div>金额：{{item.amout}}</div>
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
                        name: '上级缺货'
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
                        this.status = 1
                        break;
                    case 2:
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
                var ret = await this.$http.Get('/api/services/app/B_InOrder/GetB_InOrderListAsync', {
                    status: this.status,
                    maxResultCount: 20,
                    skipCount: 0,
                });
                if (ret.success) {
                    debugger;
                    this.list = ret.result;
                }
            }
        }
    }
</script>

<style>
.yuncangbox{
        display: grid;
        padding: 10px;
        background-color: #fff;
        grid-template-columns: 60px auto;
        grid-gap: 5px;
        font-size: 14px;
    }
    .status{
        float: right;
        color: #ff0000;
    }
</style>