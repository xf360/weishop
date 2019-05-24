<template>
    <!-- 云仓提货 -->
    <div>
        <van-nav-bar title="我的云仓-提货" left-arrow @click-left="$router.go(-1)"
            @click-right="onClickRight" />
        <van-tabs @change="change">
            <van-tab :title="item.name" v-for="(item,index) in catory" :key="index"></van-tab>
        </van-tabs>
        <div v-if="goods&&goods.length>0" style="background-color:#fff">
            <gooditem  v-for="(item,index) in goods" :key="index" :title="item.name" :desc="item.spe"
              @addcart="addcart"  :id="item.id" :price="item.price" :oldprice="item.pirce1" :thumb="api+'api/AbpFile/Show?id='+item.file.id" />
        </div>
        <div v-if="!goods||goods.length==0"><center>暂无数据</center></div>
        <pre>{{goods}}</pre>
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
                api:this.$http.api,
                goods: [],
                catory: []
            }
        },
        mounted(){
            this.loadcate();
        },
        methods:{
            change(index){
                var cid=this.catory[index].id;
                this.loadlist(cid);
                this.$forceUpdate()
            },
            addcart(id,count,price){
                var good=this.goods.filter((item)=>item.id===id)[0]
                good.number=count;
                good.amout=price;
                this.$store.commit('addgood',good)
            },
            onClickRight(){},
            async loadcate(){
                var id=this.$route.query.id;
                if(!id){
                    return;
                }
                var ret=await this.$http.Get('/api/services/app/B_Categroy/GetListByCategroyId',{
                    categroyId:id,
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
                var ret=await this.$http.Get('/api/services/app/B_Goods/GetListByCategroyId',{
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