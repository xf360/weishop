<template>
    <div id="agentinfo">
        <van-nav-bar title="代理详情" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell title="头像">
                <img slot="right-icon" :src="api+'api/AbpFile/Show?id='+info.file.id" width="40" height="40"/>
            </van-cell>
            <van-cell title="姓名" :value="info.userName" />
            <van-cell title="编号" :value="info.agenCyCode" />
            <van-cell title="手机" :value="info.phoneNumber" />
            <van-cell title="代理级别" :value="info.agencyLevelName" />
            <van-cell title="省份" :value="info.provinces" />
            <van-cell title="城市" :value="info.city" />
            <van-cell title="区县" :value="info.county" />
            <van-cell title="地址" :value="info.address" />
            <van-cell title="加入时间" :value="info.signData" />
        </van-cell-group>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        CellGroup,
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(NavBar);

    export default {
        data(){
            return {
                api:api,
                info:{
                   
                }
            }
        },
        mounted(){
            this.loadinfo()
        },
        methods:{
            async loadinfo(){
                var id=this.$route.query.id;
                if(!id){
                    return;
                }
                var ret= await this.$http.Get('/api/services/app/B_Agency/Get',{id:id})
                if(ret.success){
                    this.info=ret.result;
                }
            },
            onClickLeft(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style>

</style>