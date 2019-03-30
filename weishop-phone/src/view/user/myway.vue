<template>
    <div id="myway">
        <van-nav-bar title="我的渠道" left-arrow @click-left="onClickLeft" />
        <van-tabs>
            <van-tab title="直属代理(10)">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
                    <van-list>
                        <van-cell-group>
                            <van-cell title="代理级别" :value="searchantent.name" is-link @click="selectagent" />
                        </van-cell-group>
                        <van-cell-group>
                            <van-cell v-for="(item,index) in datalist" :key="index" is-link @click="agentinfo">
                                <div slot="title" class="userbox">
                                    <img :src="item.photo" width="60" height="60" />
                                    <div>
                                        姓名：{{item.name}}<br />
                                        代理级别：{{item.agentlevelname}}<br />
                                        代理编号：{{item.no}}
                                    </div>
                                </div>
                            </van-cell>
                        </van-cell-group>

                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="分销商(5)">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
                    <van-list>
                         <van-cell-group>
                            <van-cell title="代理级别" :value="searchantent.name" is-link @click="selectagent" />
                        </van-cell-group>
                        <van-cell-group>
                            <van-cell v-for="(item,index) in datalist" :key="index">
                                <div slot="title" class="userbox">
                                    <img :src="item.photo" width="60" height="60" />
                                    <div>
                                        姓名：{{item.name}}<br />
                                        代理级别：{{item.agentlevelname}}<br />
                                        代理编号：{{item.no}}
                                    </div>
                                </div>
                            </van-cell>
                        </van-cell-group>

                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="onCancel" />
    </div>
</template>
<style>
    .userbox {
        display: grid;
        grid-template-columns: 80px auto;
    }

    .userbox img {
        border-radius: 20px;
    }

    #myway .van-cell__left-icon,
    .van-cell__right-icon {
        line-height: 72px;
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
        CellGroup,
        Actionsheet
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(Tab).use(NavBar).use(Actionsheet).use(Tabs).use(Panel).use(List).use(PullRefresh);
    export default {
        data() {
            return {
                refreshing: false,
                show: false,
                searchantent:{
                    name: '全部',
                    value: ''
                },
                actions: [{
                    name: '全部',
                    value: ''
                }, {
                    name: '三级',
                    value: 3
                }, {
                    name: '二级',
                    value: 2
                }, {
                    name: '一级',
                    value: 1
                }],
                datalist: [{
                    name: '张三',
                    agentlevel: 0,
                    agentlevelname: '一级',
                    no: 'fdsaf',
                    photo: 'http://img0.imgtn.bdimg.com/it/u=3838364273,4038739803&fm=27&gp=0.jpg',
                    id: 1
                }, {
                    name: '张三',
                    agentlevel: 0,
                    agentlevelname: '一级',
                    no: 'fdsaf',
                    photo: 'http://img0.imgtn.bdimg.com/it/u=3838364273,4038739803&fm=27&gp=0.jpg',
                    id: 1
                }, {
                    name: '张三',
                    agentlevel: 0,
                    agentlevelname: '一级',
                    no: 'fdsaf',
                    photo: 'http://img0.imgtn.bdimg.com/it/u=3838364273,4038739803&fm=27&gp=0.jpg',
                    id: 1
                }]
            }
        },
        methods: {
            onRefresh() {

            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push("/getcash")
            },
            chongzhi() {
                this.$router.push('/pushcash')
            },
            selectagent() {
                this.show = true;
            },
            onSelect(val){
                this.searchantent=val;
                this.show=false;

            },
            onCancel(){
                this.show=false;
            },
            agentinfo(id){
                this.$router.push('/agentinfo?id='+id)
            }
        }
    }
</script>