<template>
    <div>
        <van-nav-bar title="直购" right-text="结算" left-arrow @click-left="onClickLeft" />
        <van-tabs>
            <van-tab title="全部">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)" style="top:90px;">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad(0)">
                        <van-panel v-for="(item ,index) in datalist" :key="index" title="订单信息" :desc="`编号：${item.no}`"
                            :status="item.statusTitle">
                            <div class="card-content" @click.stop="click">
                                <div class="card-img"><img :src="item.thumb" /></div>
                                <div class="card-info">
                                    <div class="card-title">{{item.title}}</div>
                                    <div class="card-desc">{{item.desc}}</div>
                                    <div class="card-price">￥{{item.price/100}}</div>
                                    <div class="card-count">×{{item.count}}</div>
                                </div>

                            </div>
                            <van-cell-group>
                                <van-cell title="收件人" :value="item.buyusername" />
                                <van-cell title="时间" :value="item.ordertime" />
                                <van-cell title="总计" :value="`共${item.count}件商品，实付￥${(item.price*item.count)/100}`" />
                            </van-cell-group>
                        </van-panel>
                    </van-list>
                </van-pull-refresh>
            </van-tab>

            <van-tab title="待发货">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad(0)">
                        <van-panel v-for="(item ,index) in datalist" :key="index" title="订单信息" :desc="`编号：${item.no}`"
                            :status="item.statusTitle">
                            <div class="card-content" @click.stop="click">
                                <div class="card-img"><img :src="item.thumb" /></div>
                                <div class="card-info">
                                    <div class="card-title">{{item.title}}</div>
                                    <div class="card-desc">{{item.desc}}</div>
                                    <div class="card-price">￥{{item.price/100}}</div>
                                    <div class="card-count">×{{item.count}}</div>
                                </div>

                            </div>
                            <van-cell-group>
                                <van-cell title="收件人" :value="item.buyusername" />
                                <van-cell title="时间" :value="item.ordertime" />
                                <van-cell title="总计" :value="`共${item.count}件商品，实付￥${(item.price*item.count)/100}`" />
                            </van-cell-group>
                        </van-panel>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="已发货">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad(0)">
                        <van-panel v-for="(item ,index) in datalist" :key="index" title="订单信息" :desc="`编号：${item.no}`"
                            :status="item.statusTitle">
                            <div class="card-content" @click.stop="click">
                                <div class="card-img"><img :src="item.thumb" /></div>
                                <div class="card-info">
                                    <div class="card-title">{{item.title}}</div>
                                    <div class="card-desc">{{item.desc}}</div>
                                    <div class="card-price">￥{{item.price/100}}</div>
                                    <div class="card-count">×{{item.count}}</div>
                                </div>

                            </div>
                            <van-cell-group>
                                <van-cell title="收件人" :value="item.buyusername" />
                                <van-cell title="时间" :value="item.ordertime" />
                                <van-cell title="总计" :value="`共${item.count}件商品，实付￥${(item.price*item.count)/100}`" />
                            </van-cell-group>
                        </van-panel>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="已完成">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad(0)">
                        <van-panel v-for="(item ,index) in datalist" :key="index" title="订单信息" :desc="`编号：${item.no}`"
                            :status="item.statusTitle">
                            <div class="card-content" @click.stop="click">
                                <div class="card-img"><img :src="item.thumb" /></div>
                                <div class="card-info">
                                    <div class="card-title">{{item.title}}</div>
                                    <div class="card-desc">{{item.desc}}</div>
                                    <div class="card-price">￥{{item.price/100}}</div>
                                    <div class="card-count">×{{item.count}}</div>
                                </div>

                            </div>
                            <van-cell-group>
                                <van-cell title="收件人" :value="item.buyusername" />
                                <van-cell title="时间" :value="item.ordertime" />
                                <van-cell title="总计" :value="`共${item.count}件商品，实付￥${(item.price*item.count)/100}`" />
                            </van-cell-group>
                        </van-panel>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>
<style>
.van-tabs {
    position: absolute;
    top: 45px;
    height: 45px;
    left: 0;
    right: 0;
}
 /* .van-pull-refresh{
     top:90px !important;
 } */
    .card-desc {
        color: #7d7e80;
        max-height: 20px;
        line-height: 20px;
    }

    .card-price {
        display: inline-block;
        color: #f44;
        font-weight: bold;
        font-size: 18px;
        line-height: 18px;
        margin: 5px;
    }

    .card-title {
        font-size: 14px;
        line-height: 16px;
        max-height: 32px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .card-content {
        display: grid;
        grid-template-columns: 60px auto;
        margin: 10px;
        font-size: 12px
    }

    .card-img {
        margin-right: 10px
    }

    .card-img img {
        height: 50px;
        width: 50px;
    }

    .card-count {
        display: inline-block;
        position: absolute;
        /* top: 20px; */
        right: 10px;
        /* bottom: 10px; */
    }
</style>

<script>
    import Vue from 'vue';
    import {
        Tab,
        Tabs,
        Panel,
        List,
        NavBar,
        PullRefresh,
        Cell,
        CellGroup
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(Tab).use(NavBar).use(Tabs).use(Panel).use(List).use(PullRefresh);

    export default {
        data() {
            return {
                active: 0,
                loading: false,
                finished: true,
                refreshing: false,
                datalist: [{
                    no: '123123123',
                    ordertime: '2019-03-05 12:00:01',
                    buyusername: '刘欢欢',
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
                    title: 'dfsafds纸尿裤dfad',
                    price: 330,
                    count: 3,
                    statusTitle: '已完成',
                    status: 0
                },{
                    no: '123123123',
                    ordertime: '2019-03-05 12:00:01',
                    buyusername: '刘欢欢',
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
                    title: 'dfsafds纸尿裤dfad',
                    price: 330,
                    count: 3,
                    statusTitle: '已完成',
                    status: 0
                }]
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onRefresh(index) {
                var vm = this;
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
        /* position: fixed; */
        overflow: auto;
        top: 90px;
    }

    .van-panel__content {
        padding: 1px 10px;
        margin-bottom: 10px;
    }
</style>