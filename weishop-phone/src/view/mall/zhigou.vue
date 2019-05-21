<template>
    <div>
        <van-nav-bar title="直购" right-text="结算" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="todo-list-o" slot="left" />
        </van-nav-bar>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
            <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad()">
                <gooditem v-for="(item,index) in goods" :key="index" :title="item.name" :desc="item.spe" :num="item.num"
                    :price="item.price" :oldpreice="item.price1" :thumb="api+'api/AbpFile/Show?id='+item.file.id" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<style>
    .van-nav-bar {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
    }

    .van-pull-refresh {
        bottom: 50px;
        position: fixed;
        overflow: auto;

        left: 0;
        right: 0;
    }

    .van-nav-bar .van-icon {
        font-size: 20px
    }
</style>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        List,
        Icon,
        PullRefresh
    } from 'vant';

    Vue.use(NavBar).use(List).use(PullRefresh).use(Icon);
    import gooditem from '../goods/gooditem.vue'
    import {
        truncate,
        truncateSync
    } from 'fs';
    export default {
        components: {
            gooditem
        },
        data() {
            return {
                api:this.$http.api,
                refreshing: false,
                loading: false,
                finished: true,
                goods: []
            }
        },
        mounted() {
            this.onLoad();
        },
        methods: {
            onClickLeft() {
                this.$router.push("/index/mygoodlist")
            },
            onClickRight() {
                this.$router.push("/index/jiesuan")
            },
            onRefresh() {

                this.onLoad();
            },
            async onLoad() {
                this.loading = true;
                this.finished = false;
                this.refreshing = true;
                var ret = await this.$http.Get('/api/services/app/B_Goods/GetListByCategroyId', {
                    categroyId: '',
                    maxResultCount: 20,
                    skipCount: 0
                });
                this.loading = false;
                this.finished = true;
                this.refreshing = false;
                if (ret.success) {
                    this.goods = ret.result.items;
                }
            }
        },

    }
</script>