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
            <van-cell title="订单总额" :value="info.all" />
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
        Dialog,
        Notify
    } from 'vant';
    import gooditem from '../goods/gooditem.vue'
    Vue.use(NavBar).use(Cell).use(CellGroup).use(Field).use(Button).use(Dialog).use(Notify);

    export default {
        components: {
            gooditem
        },
        data() {
            return {
                api:this.$http.api,
                goods: [],
                selfinfo:{
                    goodsPayment:0,//可用获取
                    balance:0,
                },
                info: {
                    categroyId: '',
                    number: 0,
                    goodsPayment: 0,//货款支付
                    balance: 0,//余额支付
                    all:0,
                }
            }
        },
        mounted() {
            this.getgoods();
            this.getinfo();
        },
        methods: {
            async getgoods() {
                var id=this.$route.query.id;
                if(!id){
                    return;
                }
                var ret=await this.$http.Get('/api/services/app/B_CloudWarehouse/GetCWInventoryListAsync',{
                    categroyPropertyId:1,
                    categroyId:id,
                    isActive:true,
                    searchKey:'',
                    maxResultCount:50,
                    skipCount:0
                })
                if(ret.success){
                    this.goods=ret.result.items;
                }
            },
            addcart(id, value, price) {
                debugger;
                
                this.info.categroyId = id;
                this.info.number = value;
                this.info.all=value * price;
                if(this.info.all>(this.selfinfo.goodsPayment+this.selfinfo.balance)){
                    Notify('货款和余额不足，请在我的钱包中进行充值。');
                    return;
                }
                if(this.info.all<=this.selfinfo.goodsPayment){
                    this.info.goodsPayment=this.info.all;
                }
                else{
                    this.info.goodshPayment=this.info.all;
                    this.info.balance=this.info.all-this.info.goodsPayment;
                }
            },
            async getinfo() {
                var ret = await this.$http.Get('/api/services/app/B_Agency/GetSelf');
                if (ret.success) {
                    this.selfinfo = ret.result;
                }
            },
            async submit() {
                if(!this.info.categroyId||!this.info.all||!this.info.number){
                    Notify('请先选择商品。');
                    return;
                }
                if(this.info.all>(this.selfinfo.goodsPayment+this.selfinfo.balance)){
                    Notify('货款和余额不足，请在我的钱包中进行充值。');
                    return;
                }
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