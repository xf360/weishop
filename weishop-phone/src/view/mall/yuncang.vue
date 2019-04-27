<template>
    <!-- 云仓进货提货 -->
    <div>
        <van-nav-bar title="我的云仓" right-text="明细" left-arrow @click-left="$router.go(-1)" @click-right="onClickRight" />
        <van-row style="text-align:center;padding:10px; background-color: #fff;">
            <van-col span="12">
                <van-button type="primary" style="width:150px" @click="$router.push('yuncangin')">进货</van-button>
            </van-col>
            <van-col span="12">
                <van-button type="primary" style="width:150px" @click="$router.push('yuncangout')">提货</van-button>
            </van-col>
        </van-row>
        <h2 class="celltitle">云仓库存</h2>
        <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad()">
            <div class="yuncangbox" v-for="(item,index) in list" :key="index">
                <div><img :src="item.img" width="56" height="56" /></div>
                <div>
                    <div class="yuncangtitle">{{item.name}}</div>
                    <div class="yuncangnum">可提取数量：{{item.num}}箱</div>
                    <div class="yuncangerror">缺货{{item.que}}箱</div>
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
        data(){
            return {
                list:[{
                    name:'商品名字',
                    num:5,
                    que:3,
                    img:''
                }]
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