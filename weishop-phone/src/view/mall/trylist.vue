<template>
    <div>
        <van-nav-bar title="试用装" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft"
            @click-right="onClickRight" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh()">
            <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad()">
                <gooditem v-for="(item,index) in goods" :key="index" :title="item.title" :desc="item.desc"
                     :price="item.price" :thumb="item.thumb" />
            </van-list>
        </van-pull-refresh>
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
</style>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        List,
        PullRefresh
    } from 'vant';

    Vue.use(NavBar).use(List).use(PullRefresh);
    import gooditem from '../goods/gooditem.vue'
import { truncate } from 'fs';
    export default {
        components: {
            gooditem
        },
        data() {
            return {
                refreshing: false,
                loading:false,
                finished:false,
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
                var vm=this;
                setTimeout(() => {
                    vm.refreshing = false;
                    window.scrollTo(0, 10);
                }, 1000);
            },
            onLoad() {
                var vm=this;
                setTimeout(() => {
                    vm.loading = false;
                    vm.finished=true;
                    window.scrollTo(0, 10);
                }, 1000);
            }
        },

    }
</script>