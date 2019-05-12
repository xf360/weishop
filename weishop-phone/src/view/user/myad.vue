<template>
    <div id="myad">
        <van-nav-bar title="我要邀请" right-text="添加" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <van-swipe-cell :right-width="65" @click="del">
            <van-cell-group>
                <van-cell v-for="(item,index) in datalist" :key="index" @click="agentinfo(item)">
                    <div slot="title" class="userbox">
                        <!-- <img :id="item.id" :src="qrcode(item.id)" width="70" height="70" /> -->
                        <qrcode value="Hello, World!" :options="{ size: 70 }"></qrcode>
                        <div>
                            代理级别：{{item.agencyLevelName}}<br />
                            <!-- 有效期：{{item.validityDataType}}<br />
                            可用次数：{{item.availableCount}} -->
                        </div>
                        <div class="right" @click="getsub(item.categroyId)">
                                <van-icon name="arrow" />
                            </div>
                    </div>
                </van-cell>
            </van-cell-group>
            <span slot="right">删除</span>
        </van-swipe-cell>
    </div>
</template>
<style>
    .userbox {
        display: grid;
        grid-template-columns: 80px auto 20px;
    }
    .userbox .right{
        line-height: 70px;
    }
    #myad .van-swipe-cell__right {
        line-height: 62px;
        background-color: #ff0000;
        color: #ffffff;
        padding: 15px;
        ;
    }

</style>
<script>
    import Vue from 'vue';
    import VueQrcode from '@xkeshi/vue-qrcode';
    import {
        NavBar,
        Cell,
        SwipeCell,
        Dialog,
        CellGroup,
        Icon
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(NavBar).use(SwipeCell).use(Dialog).use(Icon);
Vue.component(VueQrcode.name, VueQrcode);
    export default {
        data() {
            return {
                datalist: []
            }
        },
        mounted(){
            this.getlist();
        },
        methods: {
            agentinfo(item){
                this.$router.push('/myaddinfo?id='+item.id)
            },
            async getlist() {
                var ret = await this.$http.Get('/api/services/app/B_InviteUrl/GetList', {
                    MaxResultCount: 999,
                    SkipCount: 0
                });
                if (ret.success) {
                    this.datalist = ret.result.items;
                }
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push("/myadadd")
            },
            del(val) {
                switch (val) {
                    case 'cell':
                    debugger;
                        
                        break;
                    case 'right':
                        Dialog.confirm({
                            title: '警告',
                            message: '你确认要删除此记录吗'
                        }).then(() => {
                            // on confirm
                        }).catch(() => {
                            // on cancel
                        });
                        break;
                }

            }
        }
    }
</script>
<style>

</style>