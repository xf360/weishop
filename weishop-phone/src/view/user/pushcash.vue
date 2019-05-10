<template>
    <div>
        <van-nav-bar title="货款充值" right-text="明细" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <van-cell-group>
            <van-cell title="打款方式：">
                <template slot="right-icon">
                    <select v-model="info.payType" required style="width:250px" @change="loadpay()">
                        <option :value="0">支付宝</option>
                        <option :value="1">银行转账</option>
                    </select>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group v-if="info.payType===0">
            <van-field v-model="info.payAcount" required clearable label="支付宝账户" placeholder="请输入支付宝账户" />
            <van-field v-model="info.payAmout" type="number" required clearable label="金额" placeholder="请输入金额" />
            <van-field @click="timeclick" v-model="info.payDate" required readonly="readonly" clearable label="请输入日期"
                placeholder="打款日期" />
            <van-field v-model="info.remark" required clearable label="备注" placeholder="请输入备注" />
        </van-cell-group>
        <van-cell-group v-if="info.payType===1">
            <van-field v-model="info.bankName" required label="银行名称" placeholder="请输入银行名称" disabled />
            <van-field v-model="info.bankUserName" required label="开户姓名" placeholder="请输入开户姓名" />
            <van-field v-model="info.payAcount" required clearable label="卡号" placeholder="请输入银行卡号" />
            <van-field v-model="info.payAmout" type="number" required clearable label="金额" placeholder="请输入金额" />
            <van-field @click="timeclick" v-model="info.payDate" required readonly="readonly" clearable label="请输入日期"
                placeholder="打款日期" />
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
        <van-popup v-model="timeshow" position="bottom">
            <van-datetime-picker ref="timepicker" 
            :formatter="formatter" type="date" @confirm="timeok" @cancel="timeshow=false;"
            v-model="info.payDate"
            :min-date="minDate"
             />
        </van-popup>
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
        Popup,
        RadioGroup,
        DatetimePicker,
        Radio,
        Toast,
        Dialog
    } from 'vant';

    Vue.use(Cell).use(Dialog).use(Popup).use(DatetimePicker).use(RadioGroup).use(Toast).use(Radio).use(CellGroup).use(Field).use(NavBar).use(Button);
    export default {
        data() {
            return {
                timeshow:false,
                payinfo:{},
                minDate: new Date(),
                info: {
                    payType: 0,
                    payAmout: 0,
                    bankName: "",
                    bankUserName: "",
                    payAcount: "",
                    payDate: (new Date()).toLocaleDateString(),
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
            timeclick() {
                this.timeshow = true;
            },
            timeok(val) {
                this.info.payDate = val.toLocaleDateString();
                this.timeshow = false;
            },
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