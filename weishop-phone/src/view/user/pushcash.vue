<template>
    <div>
        <van-nav-bar title="货款充值" right-text="明细" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <van-cell-group>
            <van-radio-group v-model="info.payType">
                <van-cell title="支付宝" clickable @click="info.payType = 0;loadpay()">
                    <van-radio :name="0" />
                </van-cell>
                <!-- <van-cell title="微信" clickable @click="info.paytype = 2">
                    <van-radio :name="2" />
                </van-cell> -->
                <van-cell title="银行转账" clickable @click="info.payType = 1;loadpay()">
                    <van-radio :name="1" />
                </van-cell>

            </van-radio-group>
        </van-cell-group>
        <van-cell-group v-if="info.payType===0">
            <van-field v-model="info.payAcount" required clearable label="支付宝账户" placeholder="请输入支付宝账户" />
            <van-field v-model="info.payAmout" type="number" required clearable label="金额" placeholder="请输入金额" />
            <van-field v-model="info.payDate" required clearable label="日期" placeholder="请输入日期" />
            <van-field v-model="info.remark" required clearable label="备注" placeholder="请输入备注" />
        </van-cell-group>
        <van-cell-group v-if="info.payType===1">
            <van-field v-model="info.bankName" required label="银行名称" placeholder="请输入银行名称" disabled />
            <van-field v-model="info.bankUserName" required label="开户姓名" placeholder="请输入开户姓名" />
            <van-field v-model="info.payAcount" required clearable label="卡号" placeholder="请输入银行卡号" />
            <van-field v-model="info.payAmout" type="number" required clearable label="金额" placeholder="请输入金额" />
            <van-field v-model="info.payDate" required clearable label="日期" placeholder="请输入日期" />
            <van-field v-model="info.remark" required clearable label="备注" placeholder="请输入备注" />
        </van-cell-group>
        <h2 class="celltitle">请打款至</h2>
        <van-cell-group v-if="info.payType==0">
            <van-cell title="支付宝账号" :value="payinfo.account" />
            <van-cell title="支付宝实名" :value="payinfo.bankUserName" />
            <van-cell title="如有疑问联系微信客服" :value="payinfo.wxName" />
        </van-cell-group>
        <van-cell-group v-if="info.payType==1">
            <van-cell title="开户银行" :value="payinfo.bankName" />
            <van-cell title="银行户名" :value="payinfo.bankUserName" />
            <van-cell title="银行账号" :value="payinfo.account" />
            <van-cell title="如有疑问联系微信客服" :value="payinfo.wxName" />
        </van-cell-group>
        <div class="loginbt">
            <van-button block type="primary" @click="onSubmit">确认充值</van-button>
        </div>
    </div>
</template>
<style>
    .loginbt {
        margin: auto;
        padding: 20px;
        text-align: center;
    }
    .celltitle {
        font-size: 14px;
        padding: 10px;
        margin: 0px;
        color: #999;
    }
</style>

<script>
    import Vue from 'vue';
    import {
        NavBar,
        PullRefresh,
        Cell,
        Field,
        CellGroup,
        Button,
        RadioGroup,
        Radio,
        Toast,
        Dialog
    } from 'vant';

    Vue.use(Cell).use(Dialog).use(RadioGroup).use(Toast).use(Radio).use(CellGroup).use(Field).use(NavBar).use(Button);
    export default {
        data() {
            return {
                payinfo:{},
                info: {
                    payType: 0,
                    payAmout: 0,
                    bankName: "",
                    bankUserName: "",
                    payAcount: "",
                    payDate: "",
                    status: 0,
                    remark: "",
                    credentFiles: []
                }
            }
        },
        mounted(){
            this.loadpay();
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push('/pushcashlist')
            },
             async loadpay(){
                
                var ret= await this.$http.Get('/api/services/app/B_ManagerPayAccount/GetList',{
                    type:this.info.payType,
                    maxResultCount:10,
                    skipCount:0
                })
                if(ret.success&&ret.result.items.length>0){
                    this.payinfo=ret.result.items[0];
                }
            },
            async onSubmit() {
                if(!this.info.payAmout&&this.info.payAmout<=0)
                {
                    Toast.fail('金额不能为空');
                    return;
                }
                if(!this.info.payAcount)
                {
                    Toast.fail('支付账户不能为空');
                    return;
                }
                if(!this.info.payDate)
                {
                    Toast.fail('支付日期不能为空');
                    return;
                }
                var ret=await this.$http.Post('/api/services/app/B_PaymentPrepay/Create',this.info);
                if(ret.success){
                    Dialog.alert({
                        message: '恭喜你充值成功，请等待管理员审核。'
                    }).then(() => {
                        this.$router.go(-1)
                    });
                }
            }
        }
    }
</script>