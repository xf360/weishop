<template>
    <div>
        <van-tabs @change="change">
            <van-tab title="代理消息" >
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成"
                        @load="loadmessage(0)">
                        <van-panel v-for="(item ,index) in messagedata" :key="index" :title="item.title" :desc="item.creationTime | dateformat"
                            :status="item.statusTitle">
                            <p>{{item.content}}</p>

                        </van-panel>
                    </van-list>
                </van-pull-refresh>
            </van-tab>

            <van-tab title="系统消息">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
                    <van-list v-model="loading" :finished="finished" finished-text="加载完成"
                        @load="loadnotice(0)">
                        <van-panel v-for="(item ,index) in noticedata" :key="index" :title="item.title" 
                            :status="item.creationTime | dateformat">
                            <p>{{item.statusTitle}}</p>

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
                noticedata:[],
                messagedata:[],
                
            }
        },
        methods: {
            change(index){
                if(index===0){
                    this.loadmessage()
                }
                if(index===1){
                    this.loadnotice()
                }
            },
            onRefresh(index) {
                var vm=this;
                setTimeout(() => {
                    vm.refreshing = false;
                    window.scrollTo(0, 10);
                }, 1000);
            },
            async loadnotice(){
                this.loading=true;
                var ret= await this.$http.Get('/api/services/app/B_Notice/GetList',{
                    MaxResultCount:20,
                    SkipCount:0
                });
                 this.loading=false;
                  this.finished = true;
                if(ret.success){
                    this.noticedata=ret.result.items;
                }
            },
            async loadmessage(){
                this.loading=true;
                var ret= await this.$http.Get('/api/services/app/B_Message/GetList',{
                    MaxResultCount:20,
                    SkipCount:0
                });
                 this.loading=false;
                  this.finished = true;
                if(ret.success){
                    this.messagedata=ret.result.items;
                }
            },
            
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