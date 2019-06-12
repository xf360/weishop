<template>
    <div>
        <van-nav-bar title="升级代理" left-arrow @click-left="onClickLeft" />、
        <van-cell-group>
            <van-cell title="当前等级" :value="myinfo.agencyLevelName" />
            <van-field @click="levelshow=true" required :value="info.toAgencyLevelName" readonly="readonly" clearable label="升级等级："
                placeholder="升级等级" />
            <van-field @click="payshow=true" :value="info.payType===0?'支付宝':'银行转账'" required readonly="readonly"
                clearable label="打款方式：" placeholder="打款方式" />
            <van-field v-model="info.payAmout" required label="打款金额：" />
            <van-field v-if="info.payType===0" v-model="info.payAcount" required clearable label="支付宝："
                placeholder="请输入支付宝号" />
            <van-field v-if="info.payType===1" v-model="info.bankName" required clearable label="开户银行："
                placeholder="请输入开户银行" />
            <van-field v-if="info.payType===1" v-model="info.bankUserName" required clearable label="银行户名："
                placeholder="请输入银行户名" />
            <van-field v-if="info.payType===1" v-model="info.payAcount" required clearable label="银行账户："
                placeholder="请输入银行账户" />
            <van-field @click="timeclick" v-model="info.paytime" required readonly="readonly" clearable label="打款日期："
                placeholder="打款日期" />
            <van-cell class="van-cell--required">
                <template slot="title">
                    <span class="custom-text">打款凭证（1-2张）：</span>
                    <uploader @uploading="cansave=false" @uploaded="cansave=true" :limit="2"
                        v-model="info.credentFiles"></uploader>
                </template>
            </van-cell>
            <van-cell class="van-cell--required">
                <template slot="title">
                    <span class="custom-text">手持证件（1-2张）：</span>
                    <uploader @uploading="cansave=false" @uploaded="cansave=true" :limit="2"
                        v-model="info.handleCredentFiles"></uploader>
                </template>
            </van-cell>
        </van-cell-group>
        <h2 class="celltitle">请打款至</h2>
        <div v-for="(item,index) in payinfo" :key="index">
            <van-cell-group v-if="item.type==0&&item.status==0" title="支付宝">
                <van-cell title="支付宝账号" :value="item.account" />
                <van-cell title="支付宝实名" :value="item.bankUserName" />
                <van-cell title="如有疑问联系微信客服" :value="item.wxName" />
            </van-cell-group>
            <van-cell-group v-if="item.type==1&&item.status==0" title="银行卡">
                <van-cell title="开户银行" :value="item.bankName" />
                <van-cell title="银行户名" :value="item.bankUserName" />
                <van-cell title="银行账号" :value="item.account" />
                <van-cell title="如有疑问联系微信客服" :value="item.wxName" />
            </van-cell-group>
        </div>
        <center style="margin:10px;">
            <van-button type="primary" style="width:150px" @click="submit" :disabled="!cansave" :loading="loading">提交
            </van-button>
        </center>
        <van-popup v-model="timeshow" position="bottom">
            <van-datetime-picker :min-date="minDate" :formatter="formatter" type="date" @confirm="timeok"
                @cancel="timeshow=false;" />
        </van-popup>
        <van-popup v-model="payshow" position="bottom">
            <van-picker :columns="paytypes" @change="onpayChange" />
        </van-popup>
        <van-popup v-model="levelshow" position="bottom">
            <van-picker :columns="levellistname" @change="onlevelChange" />
        </van-popup>
        <pre>info{{info}}</pre>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueQrcode from '@xkeshi/vue-qrcode';
    import area from '../../utils/area.js';
    import uploader from '../../components/uploader.vue'
    import {
        NavBar,
        Cell,
        CellGroup,
        Field,
        Area,
        Popup,
        Picker,
        DatetimePicker,
        Toast,
        Button,
        Dialog
    } from 'vant';
import { async } from 'q';

    Vue.use(NavBar).use(Cell).use(CellGroup).use(Field).use(Area).use(Popup).use(Picker)
        .use(DatetimePicker).use(Button).use(Toast).use(Dialog);
    export default {
        components: {
            uploader
        },
        data() {
            return {
                cansave: true,
                show: false,
                areaList: area,
                loading: false,
                timeshow: false,
                userinfo: {},
                payinfo: [],
                paytypes: ['支付宝', '银行转账'],
                payshow: false,
                levelshow: false,
                levellist: [],
                levellistname:[],
                minDate: new Date(2019, 4, 1),
                agentinfo: {},
                sendwaiting: '',
                currentmoney:{},
                tomoney:{},
                myinfo: {},
                minpayAmout:0,
                info: {
                    payType: 0,
                    payAmout: 0,
                    payAcount: '',
                    bankUserName: '',
                    bankName: '',
                    credentFiles: [],
                    handleCredentFiles: [],
                    payDate: (new Date()).toLocaleDateString(),
                }
            }
        },
        methods: {
            onpayChange(picker, value, index) {
                this.info.payType = index;
            },
            onlevelChange(picker, value, index){
                var levelid=this.levellist.filter(ite=>ite.name===value)[0];
                this.info.toAgencyLevelId=levelid.id;
                this.info.toAgencyLevelName=value;
                this.getlevelinfo(this.info.toAgencyLevelId)
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            async loadinfo() {
                var ret = await this.$http.Get('/api/services/app/B_Agency/GetSelf');
                if (ret.success) {
                    this.myinfo = ret.result;
                    var level = await this.$http.Get('/api/services/app/B_AgencyLevel/GetList', {
                        MaxResultCount: 999,
                        SkipCount: 0
                    });
                    if(level.success){
                        this.levellist=[];
                        this.levellistname=[];
                        for(var i in level.result.items)
                        {
                            if(level.result.items[i].level<this.myinfo.agencyLeavel)
                            {
                                this.levellist.push({
                                    id:level.result.items[i].id,
                                    name:level.result.items[i].name
                                });
                                this.levellistname.push(level.result.items[i].name);
                            }
                        }
                        if( this.levellist[0]){
                            this.info.toAgencyLevelId=this.levellist[0].id;
                            this.info.toAgencyLevelName=this.levellist[0].name;
                        }
                    }
                    //当前等级金额
                    var currentmoneyret=await this.$http.Get('/api/services/app/B_AgencyLevel/Get', {
                            id: ret.result.agencyLevelId
                    });
                    if(currentmoneyret.success){
                        this.currentmoney=currentmoneyret.result;
                    }
                    this.getlevelinfo(this.info.toAgencyLevelId);
                }
            },

            async loadpay() {

                var ret = await this.$http.Get('/api/services/app/B_ManagerPayAccount/GetList', {
                    //type: this.info.payType,
                    maxResultCount: 10,
                    skipCount: 0
                })
                if (ret.success && ret.result.items.length > 0) {
                    this.payinfo = ret.result.items;
                }
            },
            async submit() {
                if (!this.info.toAgencyLevelId) {
                    Toast.fail('升级等级不能为空。');
                    return;
                }
                if (!this.info.payAmout) {
                    Toast.fail('打款金额不能为空。');
                    return;
                }
                if (this.info.payAmout < this.minpayAmout) {
                    Toast.fail(`打款金额不能小于【${this.minpayAmout}】元。`);
                    return;
                }
                if (!this.info.payAcount) {
                    Toast.fail('打款账号不能为空。');
                    return;
                }
                if (!this.info.bankName && this.info.payType === 1) {
                    Toast.fail('开户银行不能为空。');
                    return;
                }
                if (!this.info.bankUserName && this.info.payType === 1) {
                    Toast.fail('银行户名不能为空。');
                    return;
                }
                if (!this.info.credentFiles || this.info.credentFiles.length === 0) {
                    Toast.fail('请上传打款凭证');
                    return;
                }
                if (!this.info.handleCredentFiles || this.info.handleCredentFiles.length === 0) {
                    Toast.fail('请上传手持证件');
                    return;
                }
                this.loading = true;
                var ret = await this.$http.Post('/api/services/app/B_AgencyUpgrade/Create', this.info);
                this.loading = false;
                if (ret.success) {
                    Dialog.alert({
                        message: '恭喜你提交成功，请等待管理员审核。'
                    }).then(() => {
                        this.$router.push('login')
                    });
                } else {}
            },
            timeok(val) {
                this.info.paytime = val.toLocaleDateString();
                this.timeshow = false;
            },
            timeclick() {
                this.timeshow = true;
            },
            areaclick() {
                this.show = true;
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            async getlevelinfo(id){
                var tomoneyret=await this.$http.Get('/api/services/app/B_AgencyLevel/Get', {
                            id:id
                        });
                    if(tomoneyret.success){
                        this.tomoney=tomoneyret.result;
                        this.minpayAmout=(this.tomoney.firstRechargeAmout+this.tomoney.deposit)-(this.currentmoney.firstRechargeAmout+this.currentmoney.deposit)
                        this.info.payAmout=this.minpayAmout;
                    }
            }
        },
        mounted() {
            this.loadinfo();
            this.loadpay();
        }
    }
</script>

<style>
    .celltitle {
        font-size: 14px;
        padding: 10px;
        margin: 0px;
        color: #999;
    }
</style>