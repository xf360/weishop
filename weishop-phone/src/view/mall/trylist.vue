<template>
    <div>
        <van-nav-bar title="试用装" left-text="返回" left-arrow @click-left="onClickLeft" />
        
            <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad()">
                <gooditem v-for="(item,index) in goods" :key="index" :title="item.title" 
                     :thumb="api+'/api/AbpFile/Show?id='+item.file.id" />
            </van-list>
            <h2 class="celltitle" style="margin-top:50px">填写收货信息</h2>
               <van-address-edit  :area-list="areaList" show-set-default show-search-result
           :address-info="addressinfo"  @save="onSave" />
    </div>
</template>
<style>
.van-nav-bar{
    position: absolute;
    right: 0;
    left: 0;
    top:0;
}
    .van-pull-refresh{
    bottom: 50px;
        position: fixed;
        overflow: auto;
        top: 50px;
        left: 0;
        right: 0;
}
    .celltitle {
        font-size: 14px;
        padding: 10px;
        margin: 0px;
        color: #999;
    }
</style>

<script>
    import Vue from 'vue';
    import area from '../../utils/area.js'
    import {
        NavBar,
        List,
        AddressEdit
    } from 'vant';

    Vue.use(NavBar).use(List).use(AddressEdit);
    import gooditem from '../goods/gooditem.vue'
import { truncate } from 'fs';
    export default {
        components: {
            gooditem
        },
        data() {
            return {
                loading:false,
                finished:false,
                page:1,
                addressinfo:{},
                areaList:area,
                goods: []
            }
        },
        mounted(){
            this.onLoad()
        },
        methods: {
            onSave(){},
            onClickLeft() {
                this.$router.go(-1)
            },
            onRefresh() {
                var vm=this;
                this.page=1;
                this.onLoad()
            },
            async onLoad() {
                this.loading=true;
                var ret= await this.$http.Get('/api/services/app/B_TrialProduct/GetList',
                {
                    isActive:true,
                    searchKey:'',
                    maxResultCount:20,
                    skipCount:(this.page-1)*20
                });
                this.loading=false;
                this.finished=true;
                if(ret.success){
                    this.goods=ret.result.items;
                }
                 window.scrollTo(0, 10);
            }
        },

    }
</script>