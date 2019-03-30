<template>
    <div id="myad">
        <van-nav-bar title="我要邀请" right-text="添加" left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>
        <van-swipe-cell :right-width="65" @click="del">
            <van-cell-group>
                <van-cell v-for="(item,index) in datalist" :key="index" is-link @click="agentinfo">
                    <div slot="title" class="userbox">
                        <img :src="item.qrcode" width="70" height="70" />
                        <div>
                            代理级别：{{item.agentlevelname}}<br />
                            有效期：{{item.endtime}}<br />
                            可用次数：{{item.count}}
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
        grid-template-columns: 80px auto;
    }

    #myad .van-swipe-cell__right {
        line-height: 62px;
        background-color: #ff0000;
        color: #ffffff;
        padding: 15px;
        ;
    }

    #myad .van-cell__left-icon,
    .van-cell__right-icon {
        line-height: 72px;
    }
</style>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        SwipeCell,
        Dialog,
        CellGroup,
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(NavBar).use(SwipeCell).use(Dialog);

    export default {
        data() {
            return {
                datalist: [{
                    qrcode: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553940890547&di=6088c0c6db77ebb80386693e6203298b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201701%2F28%2F20170128085020_jfRhX.jpeg',
                    id: '',
                    agentlevelname: '一级',
                    endtime: '2020-10-10 23:59:59',
                    count: 10
                },{
                    qrcode: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553940890547&di=6088c0c6db77ebb80386693e6203298b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201701%2F28%2F20170128085020_jfRhX.jpeg',
                    id: '',
                    agentlevelname: '一级',
                    endtime: '2020-10-10 23:59:59',
                    count: 10
                },{
                    qrcode: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553940890547&di=6088c0c6db77ebb80386693e6203298b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201701%2F28%2F20170128085020_jfRhX.jpeg',
                    id: '',
                    agentlevelname: '一级',
                    endtime: '2020-10-10 23:59:59',
                    count: 10
                }]
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight(){
                this.$router.push("/myadadd")
            },
            del(val) {
                switch (val) {
                    case 'cell':
                        this.$router.push('/myaddinfo')
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