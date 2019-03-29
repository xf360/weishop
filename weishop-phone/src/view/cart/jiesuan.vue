<template>
    <div>
        <van-nav-bar title="结算" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell-group style="margin-top:50px">
            <van-cell icon="location-o" is-link @click="$router.push('/index/addresslist')">
                <template slot="title">
                    <span class="custom-text">{{address.name}}[{{address.tel}}]</span>
                    <div class="van-cell__label">{{address.address}}</div>
                </template>
            </van-cell>
        </van-cell-group>

        <carditem v-for="(item,index) in goods" :key="index" :title="item.title" :desc="item.desc" :num="item.num"
            :price="item.price" :thumb="item.thumb" />

        <van-cell-group style="margin-bottom:5px">
            <van-field v-model="message" label="买家备注" type="textarea" placeholder="请备注尺码颜色等信息" rows="2" autosize />
        </van-cell-group>
        <van-cell-group style="margin-bottom:5px">
            <van-cell title="商品金额" value="￥333" />
            <van-cell title="快递费用" value="￥0" />
            <van-cell title="合计付款" value="￥333" />
        </van-cell-group>

        <van-cell-group style="margin-bottom:5px">
            <van-cell title="可用货款" value="￥0" />
            <van-cell title="可用余额" value="￥1000" />
        </van-cell-group>
        <div style="padding:20px">
            <van-button block type="primary" :loading="result.loading" @click="onSubmit">确认下单</van-button>
        </div>
        
    </div>
</template>
<style>
    .van-nav-bar {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
    }

    .van-cell__left-icon {
        line-height: 45px;
        font-size: 20px;
    }

    .van-cell__right-icon {
        line-height: 45px;
        font-size: 20px;
    }

    .van-pull-refresh {
        bottom: 50px;
        position: fixed;
        overflow: auto;
        top: 50px;
        left: 0;
        right: 0;
    }
</style>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        CellGroup,
        List,
        Field,
        Button
    } from 'vant';
    import carditem from './carditem.vue'
    Vue.use(NavBar).use(List).use(Button).use(Cell).use(CellGroup).use(Field);
    import {
        truncate
    } from 'fs';
    export default {
        components: {
            carditem
        },
        data() {
            return {
                result:{
                    loading:false
                },
                refreshing: false,
                loading: false,
                finished: false,
                address: {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号'
                },
                goods: [{
                    id: '1',
                    title: '进口香蕉',
                    desc: '约250g，2根',
                    price: 200,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
                }, {
                    id: '2',
                    title: '陕西蜜梨',
                    desc: '约600g',
                    price: 690,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
                }, {
                    id: '3',
                    title: '美国伽力果',
                    desc: '约680g/3个',
                    price: 2680,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
                }, {
                    id: '3',
                    title: '美国伽力果',
                    desc: '约680g/3个',
                    price: 2680,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
                }]
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {

            },
            onRefresh() {
                var vm = this;
                setTimeout(() => {
                    vm.refreshing = false;
                    window.scrollTo(0, 10);
                }, 1000);
            },
            onLoad() {
                var vm = this;
                setTimeout(() => {
                    vm.loading = false;
                    vm.finished = true;
                    window.scrollTo(0, 10);
                }, 1000);
            }
        },

    }
</script>