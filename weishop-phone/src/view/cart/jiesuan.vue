<template>
    <div>
        <van-nav-bar title="结算" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell-group style="margin-top:50px">
            <van-cell icon="location-o" is-link @click="$router.push('/index/addresslist')">
                <template slot="title" v-if="address&&address!={}">
                    <span class="custom-text">{{address.name}}[{{address.tel}}]</span>
                    <div class="van-cell__label">{{address.address}}</div>
                </template>
                <template slot="title" v-else>
                    <span>请选择地址</span>
                </template>
            </van-cell>
        </van-cell-group>
        <carditem @countchange="countchange" v-for="item in goods" :key="item.id" :title="item.name" :desc="item.spe"
            :count="item.number" :id="item.id" :price="item.price" :thumb="api+'api/AbpFile/Show?id='+item.file.id" />

        <van-cell-group style="margin-bottom:5px">
            <van-field v-model="message" label="买家备注" type="textarea" placeholder="请备注尺码颜色等信息" rows="2" autosize />
        </van-cell-group>
        <van-cell-group style="margin-bottom:5px">
            <van-cell title="商品金额" :value="totalPrice" />
            <van-cell title="快递费用" value="￥0" />
            <van-cell title="合计付款" :value="totalPrice" />
        </van-cell-group>

        <van-cell-group style="margin-bottom:5px">
            <van-cell title="可用货款" value="￥0" />
            <van-cell title="可用余额" value="￥0" />
        </van-cell-group>
        <div style="padding:20px">
            <van-button block type="primary" :loading="result.loading" @click="onSubmit">确认下单</van-button>
        </div>

    </div>
</template>
<style>
    .van-nav-bar {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
    }

    .van-cell__left-icon {
        line-height: 45px;
        font-size: 20px;
    }

    .van-cell__right-icon {
        line-height: 45px;
        font-size: 20px;
    }

    .van-pull-refresh {
        bottom: 50px;
        position: fixed;
        overflow: auto;
        top: 50px;
        left: 0;
        right: 0;
    }
</style>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        CellGroup,
        List,
        Field,
        Button,
        Toast,
        Dialog
    } from 'vant';
    import carditem from './carditem.vue'
    Vue.use(NavBar).use(List).use(Button).use(Cell).use(Dialog).use(CellGroup).use(Field).use(Toast);
    import {
        truncate
    } from 'fs';
    export default {
        components: {
            carditem
        },
        data() {
            return {
                api: api,
                result: {
                    loading: false
                },
                totalPrice: 0,
                refreshing: false,
                loading: false,
                finished: false,
                // address: {
                //     id: '2',
                //     name: '李四',
                //     tel: '1310000000',
                //     address: '浙江省杭州市拱墅区莫干山路 50 号'
                // },

            }
        },
        mounted() {
            var userid = this.$store.state.loginInfo.user.id;
            if (userid) {
                this.$store.dispatch('getaddress', userid)
            }
            this.gettotalPrice();
        },
        computed: {
            goods() {
                return this.$store.getters.goods;
            },
            address() {
                return this.$store.getters.address;
            }
        },
        methods: {
            gettotalPrice() {
                var total = 0;
                for (var i in this.goods) {
                    total += (this.goods[i].number * this.goods[i].price)
                }
                this.totalPrice = total;
            },
            countchange(id, count, price) {
                this.$store.commit('changecount', {
                    id: id,
                    count: count
                });
                this.gettotalPrice();
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {

            },
            async onSubmit() {
                debugger;
                if (!this.goods || this.goods.length == 0) {
                    Toast.fail('购物车为空');
                    return;
                }
                if (!this.address) {
                    Toast.fail('请先选择地址');
                    return;
                }
                var userid = this.$store.state.loginInfo.user.id;
                var info = {
                    userId: userid,
                    amout: 0,
                    deliveryFee: 0,
                    payAmout: this.totalPrice,
                    goodsPayment: this.totalPrice,
                    balance: 0,
                    addressId: this.address.id,
                    remark:' '+ this.message,
                    goods: []
                }
                for (var i in this.goods) {
                    var tem = {
                        number: this.goods[i].number,
                        goodsId: this.goods[i].id,
                        categroyId: this.goods[i].categroyId,
                        amout: this.goods[i].amout
                    }
                    info.goods.push(tem);
                }
                var ret = await this.$http.Post('/api/services/app/B_OrderOut/Create', info)
                if (ret.success) {
                    Dialog.alert({
                        message: '恭喜你下单成功。'
                    }).then(() => {
                        this.$router.go(-1)
                    });
                }
            },
            onRefresh() {
                var vm = this;
                setTimeout(() => {
                    vm.refreshing = false;
                    window.scrollTo(0, 10);
                }, 1000);
            },
            onLoad() {
                var vm = this;
                setTimeout(() => {
                    vm.loading = false;
                    vm.finished = true;
                    window.scrollTo(0, 10);
                }, 1000);
            }
        },

    }
</script>