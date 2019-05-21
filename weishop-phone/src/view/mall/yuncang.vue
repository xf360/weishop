<template>
    <!-- 云仓进货提货 -->
    <div>
        <van-nav-bar title="我的云仓" right-text="明细" left-arrow @click-left="$router.go(-1)" @click-right="$router.push('yuncanglog')" />
        <van-row style="text-align:center;padding:10px; background-color: #fff;">
            <van-col span="12">
                <van-button type="primary" style="width:150px" @click="$router.push('/index/yuncangin?id='+$route.query.id)">进货</van-button>
            </van-col>
            <van-col span="12">
                <van-button type="primary" style="width:150px" @click="$router.push('/index/yuncangout?id='+$route.query.id)">提货</van-button>
            </van-col>
        </van-row>
        <h2 class="celltitle">云仓库存</h2>
        <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad()">
            <div class="yuncangbox" v-for="(item,index) in list" :key="index">
                <div><img :src="api+'api/AbpFile/Show?id='+item.file.id" width="56" height="56" /></div>
                <div>
                    <div class="yuncangtitle">{{item.title}}</div>
                    <div class="yuncangnum">可提取数量：{{item.canExtractCount}}箱</div>
                    <div class="yuncangerror">缺货{{item.takeLessCount}}箱</div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        List,
        Row,
        Col,
        Button
    } from 'vant';

    Vue.use(NavBar).use(List).use(Row).use(Col).use(Button);
    export default {
        mounted(){
            this.onLoad();
        },
        data(){
            return {
                api:this.$http.api,
                loading:false,
                finished:false,
                list:[]
            }
        },
        methods:{
            async onLoad(){
                var id=this.$route.query.id;
                if(!id){
                    return;
                }
                this.loading=true;
                var ret=await this.$http.Get('/api/services/app/B_CloudWarehouse/GetCWInventoryListAsync',{
                    categroyPropertyId:1,
                    categroyId:id,
                    isActive:true,
                    searchKey:'',
                    maxResultCount:50,
                    skipCount:0
                })
                this.loading=false;
                this.finished=true;
                if(ret.success){
                    this.list=ret.result.items;
                    
                }
            }
        }
    }
</script>

<style>
.celltitle {
        font-size: 14px;
        padding: 10px;
        margin: 0px;
        color: #999;
    }
    .yuncangbox{
        display: grid;
        padding: 10px;
        background-color: #fff;
        grid-template-columns: 60px auto;
        grid-gap: 5px;
    }
    .yuncangnum{
        font-size: 12px;
        color: #999;
        text-align: right;
    }
    .yuncangerror{
        font-size: 14px;
        color: #ff6666;
        text-align: right;
    }
</style>