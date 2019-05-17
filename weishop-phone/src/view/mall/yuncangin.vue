<template>
    <!-- 云仓进货 -->
    <div>
        <van-nav-bar title="我的云仓-进货" left-arrow @click-left="$router.go(-1)" />
        <div style="background-color:#fff">
            <gooditem v-for="(item,index) in goods" :key="index" :title="item.name" :desc="item.remark" :id="item.id"
                :price="item.price" :thumb="api+'api/AbpFile/Show?id='+item.file.id" @addcart="addcart" />
        </div>
        <van-cell-group>
            <van-cell title="可用货款" :value="selfinfo.goodsPayment" />
            <van-cell title="可用余额" :value="selfinfo.balance" />
            <van-cell title="订单总额" value="0" />
            <van-cell title="支付方式" value="货款+余额" />
            <van-cell title="货款支付" :value="info.goodsPayment" />
            <van-cell title="余额支付" :value="info.balance" />
        </van-cell-group>
        <center style="margin:10px">
            <van-button type="primary" style="width:150px" @click="submit">支付</van-button>
        </center>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        CellGroup,
        Field,
        Button,
        Dialog
    } from 'vant';
    import gooditem from '../goods/gooditem.vue'
    Vue.use(NavBar).use(Cell).use(CellGroup).use(Field).use(Button).use(Dialog);

    export default {
        components: {
            gooditem
        },
        data() {
            return {
                api: api,
                goods: [],
                selfinfo:{
                    goodsPayment:0,
                    balance:0,
                },
                info: {
                    categroyId: '2572e5ee-1c05-43a4-3bd7-08d6cfccd5e7',
                    number: 0,
                    goodsPayment: 0,
                    balance: 0
                }
            }
        },
        mounted() {
            this.getgoods();
            this.getinfo();
        },
        methods: {
            async getgoods() {
                var ret = await this.$http.Get('/api/services/app/B_Categroy/GetCWCategroyList', {

                });
                if (ret.success) {
                    this.goods = ret.result.items;
                }
            },
            addcart(id, value, price) {
                debugger;
                this.info.categroyId = id;
                this.info.number = value;
                this.info.goodsPayment = value * price;
            },
            async getinfo() {
                var ret = await this.$http.Get('/api/services/app/B_Agency/GetSelf');
                if (ret.success) {
                    this.selfinfo = ret.result;
                }
            },
            async submit() {
                var ret = await this.$http.Post('/api/services/app/B_InOrder/OrderIn', this.info);
                if (ret.success) {
                    await Dialog.alert({
                        title: '下单成功'
                    })
                    this.$router.go(-1)
                }
            },
        }
    }
</script>

<style>

</style>