<template>
    <div id="agentinfo">
        <van-nav-bar title="代理详情" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell title="头像">
                <img slot="right-icon" :src="info.photo" width="40" height="40"/>
            </van-cell>
            <van-cell title="姓名" :value="info.name" />
            <van-cell title="编号" :value="info.no" />
            <van-cell title="手机" :value="info.phone" />
            <van-cell title="代理级别" :value="info.agentlevelname" />
            <van-cell title="省份" :value="info.province" />
            <van-cell title="城市" :value="info.city" />
            <van-cell title="区县" :value="info.town" />
            <van-cell title="地址" :value="info.address" />
            <van-cell title="加入时间" :value="info.jointime" />
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
                info:{
                    id:4,
                    photo:'http://img0.imgtn.bdimg.com/it/u=3838364273,4038739803&fm=27&gp=0.jpg',
                    name:'王五',
                    no:'324322',
                    phone:'13300000000',
                    agentlevelname:'一级',
                    province:'四川省',
                    city:'成都市',
                    town:'成华区',
                    address:'幅度萨芬',
                    jointime:'2019-01-12 13:33:33'
                }
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style>

</style>