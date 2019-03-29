<template>
    <div>
        <van-nav-bar title="地址列表" left-text="返回" right-text="添加" left-arrow @click-left="onClickLeft"
            @click-right="onClickRight" />
        <van-address-list style="margin-top:50px" v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" />
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        AddressList
    } from 'vant';

    Vue.use(AddressList).use(NavBar);
    export default {
        data() {
            return {
                list: [{
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号'
                    }
                ],
            }
        },
        methods: {
            onAdd() {},
            onEdit() {
                this.$router.push('/index/addressedit')
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push('/index/addressedit')
            }
        }
    }
</script>