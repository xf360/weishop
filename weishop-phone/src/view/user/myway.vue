<template>
    <div id="myway">
        <van-nav-bar title="我的渠道" left-arrow @click-left="onClickLeft" />
        <van-tabs @change="change">
            <van-tab title="直属代理">

            </van-tab>
            <!-- <van-tab title="分销商">
            </van-tab> -->
        </van-tabs>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" style="top:50px">
            <van-list>
                <van-cell-group>
                    <van-cell title="代理级别" :value="searchantent.name" is-link @click="selectagent" />
                </van-cell-group>
                <van-cell-group>
                    <van-cell v-for="(item,index) in datalist" :key="index" is-link @click="agentinfo(item.id)">
                        <div slot="title" class="userbox">
                            <img :src="api+'api/AbpFile/Show?id='+item.file.id" width="60" height="60" />
                            <div>
                                姓名：{{item.userName}}<br />
                                代理级别：{{item.agencyLevelName}}<br />
                                代理编号：{{item.agenCyCode}}
                            </div>
                        </div>
                    </van-cell>
                </van-cell-group>

            </van-list>
        </van-pull-refresh>
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
                api:api,
                refreshing: false,
                show: false,
                searchantent: {
                    name: '全部',
                    value: ''
                },
                params: {
                    userId: '',
                    type: 1,
                    agencyLevelId: null,
                    maxResultCount: 50,
                    skipCount: 0,
                },
                actions: [],
                datalist: []
            }
        },
        mounted() {
            this.loadlist();
            this.loadlevel();
        },
        methods: {
            change(index){
                switch(index){
                    case 0:
                    this.params.type=1;
                    break;
                    case 1:
                    this.params.type=2;
                    break;
                }
                this.loadlist()
            },
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
            onSelect(val) {
                this.searchantent = val;
                this.params.agencyLevelId = val.value;
                this.show = false;
                this.loadlist();
            },
            async loadlist() {
                this.params.userId=this.$store.getters.user.id;
                var ret = await this.$http.Get('/api/services/app/B_Agency/GetList', this.params);
                if (ret.success) {
                    this.datalist = ret.result.items;
                }
            },
            async loadlevel() {
                var ret = await this.$http.Get('/api/services/app/B_AgencyLevel/GetList', this.params);
                if (ret.success) {
                    this.actions = [];
                    this.actions.push({
                        name: '全部',
                        value: null
                    });
                    for (var i in ret.result.items) {
                        var tem = {
                            name: ret.result.items[i].name,
                            value: ret.result.items[i].id,
                        }
                        this.actions.push(tem);
                    }

                }
            },
            onCancel() {
                this.show = false;
            },
            agentinfo(id) {
                this.$router.push('/agentinfo?id=' + id)
            }
        }
    }
</script>