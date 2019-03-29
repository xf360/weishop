<template>
    <div>
        <van-tabs>
            <van-tab title="代理消息">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成"
                        @load="onLoad(0)">
                        <van-panel v-for="(item ,index) in agentdata" :key="index" title="订单信息" :desc="item.date"
                            :status="item.statusName">

                            <p>订单编码：{{item.no}}</p>
                            <p>{{item.content}}</p>

                        </van-panel>
                    </van-list>
                </van-pull-refresh>
            </van-tab>

            <van-tab title="系统消息">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成"
                        @load="onLoad(0)">
                        <van-panel v-for="(item ,index) in agentdata" :key="index" title="公告" 
                            :status="item.date">
                            <p>{{item.content}}</p>

                        </van-panel>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
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

    Vue.use(Tab).use(Tabs).use(Panel).use(List).use(PullRefresh);

    export default {
        data() {
            return {
                active: 0,
                loading: false,
                finished: false,
                refreshing: false,
                agentdata: [{
                    no: '2019112313',
                    status: 0,
                    statusName: '已完成',
                    content: '货物已发出',
                    date: '2019-3-25 18:25:00'
                }, {
                    no: '2019112313',
                    status: 0,
                    statusName: '已完成',
                    content: '货物已发出',
                    date: '2019-3-25 18:25:00'
                }, {
                    no: '2019112313',
                    status: 0,
                    statusName: '已完成',
                    content: '货物已发出',
                    date: '2019-3-25 18:25:00'
                }, {
                    no: '2019112313',
                    status: 0,
                    statusName: '已完成',
                    content: '货物已发出',
                    date: '2019-3-25 18:25:00'
                }, {
                    no: '2019112313',
                    status: 0,
                    statusName: '已完成',
                    content: '货物已发出',
                    date: '2019-3-25 18:25:00'
                }, {
                    no: '2019112313',
                    status: 0,
                    statusName: '已完成',
                    content: '货物已发出',
                    date: '2019-3-25 18:25:00'
                }]
            }
        },
        methods: {
            onRefresh(index) {
                var vm=this;
                setTimeout(() => {
                    vm.refreshing = false;
                    window.scrollTo(0, 10);
                }, 1000);
            },
            onLoad() {
                var vm = this;
                setTimeout(function () {

                    for (var i = 0; i < 10; i++) {
                        vm.agentdata.push({
                            no: i,
                            status: 0,
                            statusName: '已完成',
                            content: '货物已发出',
                            date: '2019-3-25 18:25:00'
                        })
                    }
                    // 加载状态结束
                    vm.loading = false;
                    if (vm.agentdata.length > 40) {
                        vm.finished = true;
                    }
                }, 500)
            }
        }
    }
</script>

<style>
    .van-tabs .van-tab__pane {
        bottom: 50px;
        position: fixed;
        overflow: auto;
        top: 50px;
    }
    .van-panel__content {
        padding: 1px 10px;
        margin-bottom: 10px;
    } 
</style>