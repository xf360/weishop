<template>
    <!-- 云仓提货 -->
    <div>
        <van-nav-bar title="我的云仓-提货" left-arrow @click-left="$router.go(-1)"
            @click-right="onClickRight" />
        <van-tabs>
            <van-tab :title="item.name" v-for="(item,index) in catory" :key="index"></van-tab>
        </van-tabs>
        <div style="background-color:#fff">
            <gooditem v-for="(item,index) in goods" :key="index" :title="item.title" :desc="item.desc"
                :price="item.price" :thumb="item.thumb" />
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
                goods: [{
                    id: '1',
                    title: '进口香蕉',
                    desc: '约250g，2根',
                    price: 200,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
                }],
                catory: [{
                    id: 'dd',
                    name: '类别1'
                }, {
                    id: 'ddd',
                    name: '类别2'
                }]
            }
        }
    }
</script>

<style>

</style>