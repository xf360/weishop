<template>
    <div>
        <van-nav-bar title="云仓进出明细" left-arrow @click-left="$router.go(-1)" />
        <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad()">
            <div v-for="(item,index) in list" :key="index" class="logbox">
                <div>
                    <span v-if="item.inOrOut===1" style="font-size:18px;font-weight: bold;">出仓</span>
                    <span v-if="item.inOrOut===0" style="font-size:18px;font-weight: bold;">入仓</span>
                    <span style="float:right">{{item.makeTime}}</span></div>
                <div>收货方：-</div>
                <div><span>{{item.goodsName}}</span><span style="float:right">-箱</span></div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        List,
    } from 'vant';

    Vue.use(NavBar).use(List);
    export default {
        data() {
            return {
                loading: false,
                finished: true,
                list: []
            }
        },
        mounted(){
            this.onLoad()
        },
        methods: {
            async onLoad() {
                this.loading=true;
                var ret= await this.$http.Get('/api/services/app/B_CloudWarehouse/GetCWInOutDetailListAsync',
                {
                    maxResultCount:20,
                    skipCount:0
                });
                this.loading=false;
                if(ret.success){
                    this.list=ret.result.items;
                }
            },
        }
    }
</script>

<style>
    .logbox {
        background-color: #fff;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    .logbox div {
        margin: 3px;
    }
</style>