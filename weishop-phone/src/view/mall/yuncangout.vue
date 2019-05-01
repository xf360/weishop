<template>
    <!-- 云仓提货 -->
    <div>
        <van-nav-bar title="我的云仓-提货" left-arrow @click-left="$router.go(-1)"
            @click-right="onClickRight" />
        <van-tabs>
            <van-tab :title="item.name" v-for="(item,index) in catory" :key="index"></van-tab>
        </van-tabs>
        <div style="background-color:#fff">
            <gooditem v-for="(item,index) in goods" :key="index" :title="item.name" :desc="item.spe"
                :price="item.price" :oldprice="item.price1" :thumb="api+'/api/AbpFile/Show?id='+item.file.id" />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        Tab,
        Tabs,
        Panel,
        List,
        PullRefresh
    } from 'vant';
    import gooditem from '../goods/gooditem.vue'
    Vue.use(Tab).use(Tabs).use(Panel).use(List).use(PullRefresh);

    export default {
        components: {
            gooditem
        },
        data() {
            return {
                goods: [],
                catory: []
            }
        },
        mounted(){
            this.loadcate();
        },
        methods:{
            async loadcate(){
                var ret=await this.$http.Get('/api/services/app/B_Categroy/GetListByCategroyId',{
                    categroyId:'',
                    maxResultCount:20,
                    skipCount:0
                });
                if(ret.success){
                    this.catory=ret.result.items;
                    if(this.catory.length>0){
                        this.loadlist(this.catory[0].id);
                    }
                }
            },
            async loadlist(id){
                if(!id){
                    return;
                }
                var ret=await this.$http.Get('',{
                    categroyId:id,
                    maxResultCount:20,
                    skipCount:0,
                });
                if(ret.success){
                    this.goods=ret.result.items;
                }
            }
        }
    }
</script>

<style>

</style>