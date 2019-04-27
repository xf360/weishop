<template>
    <!-- 云仓进货 -->
    <div>
        <van-nav-bar title="我的云仓-进货" right-text="明细" left-arrow @click-left="$router.go(-1)"
            @click-right="onClickRight" />
        <div style="background-color:#fff">
            <gooditem v-for="(item,index) in goods" :key="index" :title="item.title" :desc="item.desc"
                :price="item.price" :thumb="item.thumb" />
        </div>
        <van-cell-group>
            <van-cell title="可用货款" value="0" />
            <van-cell title="可用余额" value="0" />
            <van-cell title="订单总额" value="0" />
            <van-cell title="支付方式" value="货款+余额" />
            <van-cell title="货款支付" value="0" />
            <van-cell title="余额支付" value="0" />
        </van-cell-group>
        <center style="margin:10px">
            <van-button type="primary" style="width:150px">支付</van-button>
        </center>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        CellGroup,
        Field,
        Button
    } from 'vant';
    import gooditem from '../goods/gooditem.vue'
    Vue.use(NavBar).use(Cell).use(CellGroup).use(Field).use(Button);

    export default {
        components: {
            gooditem
        },
        data() {
            return {
                goods: [{
                    id: '1',
                    title: '进口香蕉',
                    desc: '约250g，2根',
                    price: 200,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
                }]
            }
        }
    }
</script>

<style>

</style>