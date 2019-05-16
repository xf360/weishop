<template>
    <div>
        <van-nav-bar title="申请代理" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell title="邀请代理" :value="userinfo.createAgencyName" />
            <van-cell title="联系电话" :value="userinfo.createAgencyTel" />
            <van-cell title="联系地址" :value="userinfo.createAgencyAddress" />
        </van-cell-group>
        <h2 class="celltitle">填写内容</h2>
        <van-cell-group>
            <!-- <van-cell title="代理等级" :value="info.agencyLevelName" /> -->
            <van-field v-model="info.name" required clearable label="姓名：" placeholder="请输入姓名" />
            <van-field v-model="info.tel" required clearable label="联系电话：" placeholder="请输入联系电话" />
            <van-field v-model="info.vCode" required center clearable label="短信验证码" placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
            <van-field v-model="info.pwd" type="password" label="密码" placeholder="请输入密码" required />
            <van-field v-model="info.pwd2" type="password" label="确认密码" placeholder="请再次输入密码" required />
            <van-field v-model="info.wxId" required clearable label="微信号：" placeholder="请输入微信号" />

            <van-field v-model="info.pNumber" required clearable label="身份证号：" placeholder="请输入身份证号" />
            <van-cell title="国家：">
                <template slot="right-icon">
                    <select required v-model="info.country" style="width:250px">
                        <option value="001">中国</option>
                        <option value="002">中国香港</option>
                        <option value="003">中国澳门</option>
                        <option value="004">中国台湾</option>
                    </select>
                </template>
            </van-cell>
            <van-field @click="areaclick" v-model="info.areaname" required readonly="readonly" clearable label="地区："
                placeholder="省/市/区" />
            <van-field v-model="info.address" clearable label="详细地址：" required placeholder="请输入详细地址" />
            <van-cell title="打款方式：">
                <template slot="right-icon">
                    <select v-model="info.payType" required style="width:250px" @change="loadpay()">
                        <option :value="0">支付宝</option>
                        <option :value="1">银行转账</option>
                    </select>
                </template>
            </van-cell>
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
            <van-cell>
                <template slot="title">
                    <span class="custom-text">头像：</span>
                    <uploader :limit="1" v-model="info.touxiangFile"></uploader>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <span class="custom-text">打款凭证（1-2张）：</span>
                    <uploader :limit="2" v-model="info.credentFiles"></uploader>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <span class="custom-text">手持证件（1-2张）：</span>
                    <uploader :limit="2" v-model="info.handleCredentFiles"></uploader>
                </template>
            </van-cell>
        </van-cell-group>
        <h2 class="celltitle">请打款至</h2>
        <div v-for="(item,index) in payinfo" :key="index">
        <van-cell-group v-if="info.payType==0">
            <van-cell title="支付宝账号" :value="item.account" />
            <van-cell title="支付宝实名" :value="item.bankUserName" />
            <van-cell title="如有疑问联系微信客服" :value="item.wxName" />
        </van-cell-group>
        <van-cell-group v-if="info.payType==1">
            <van-cell title="开户银行" :value="item.bankName" />
            <van-cell title="银行户名" :value="item.bankUserName" />
            <van-cell title="银行账号" :value="item.account" />
            <van-cell title="如有疑问联系微信客服" :value="item.wxName" />
        </van-cell-group>
        </div>
        <center style="margin:10px;">
            <van-button type="primary" style="width:150px" @click="submit" :disabled="disabled">提交</van-button>
        </center>
        <van-popup v-model="show" position="bottom">
            <van-area :area-list="areaList" @confirm="areaok" @cancel="show=false;" />
        </van-popup>
        <van-popup v-model="timeshow" position="bottom">
            <van-datetime-picker 
            :min-date="minDate" :formatter="formatter" type="date" @confirm="timeok" @cancel="timeshow=false;" />
        </van-popup>
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

    Vue.use(NavBar).use(Cell).use(CellGroup).use(Field).use(Area).use(Popup).use(Picker)
        .use(DatetimePicker).use(Button).use(Toast).use(Dialog);
    export default {
        components: {
            uploader
        },
        data() {
            return {
                show: false,
                areaList: area,
                timeshow: false,
                disabled:false,
                userinfo:{},
                payinfo:[],
                minDate: new Date(),
                agentinfo:{},
                info: {
                    agencyLevelId:'8180b6f8-5339-47a7-9c51-9fa175d87a3a', 
                    inviteUrlId: this.$route.query.id,
                    name: '',
                    tel: '',
                    vCode: '',
                    pwd: '',
                    pwd2: '',
                    wxId: '',
                    pNumber: '',
                    country: '001',
                    provinces: '',
                    city: '',
                    county: '',
                    address: '',
                    payType: 0,
                    payAmout: 0,
                    payAcount: '',
                    bankUserName: '',
                    areaname: '',
                    bankName: '',
                    touxiangFile: {},
                    credentFiles: [],
                    handleCredentFiles: [],
                    payDate: (new Date()).toLocaleDateString(),
                    paytime: (new Date()).toLocaleDateString(),
                }
            }
        },
        methods: {
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            areaok(val) {
                if (!val) {
                    return;
                }
                var tem = [];
                for (var item in val) {
                    tem.push(val[item].name);
                }
                this.info.areaname = tem.join('/');
                this.info.provinces = val[0].code;
                this.info.city = val[1].code;
                this.info.county = val[2].code;
                this.show = false;
            },
            async loadinfo(){
                if (!this.info.inviteUrlId) {
                    Toast.fail('无效的邀请链接，请重新扫描二维码注册。');
                    return;
                }
                var ret= await this.$http.Get('/api/services/app/B_InviteUrl/Get',{id:this.info.inviteUrlId})
                if(ret.success){
                    debugger;
                    this.userinfo=ret.result;
                    if(ret.result.agencyLevelId){
                        var ret2=await this.$http.Get('/api/services/app/B_AgencyLevel/Get',{id:ret.result.agencyLevelId});
                        if(ret2.success){
                            debugger;
                            this.agentinfo=ret2.result;
                            this.info.payAmout=ret2.result.firstRechargeAmout+ret2.result.deposit;
                        }
                    }
                }
            },
            async loadpay(){
                
                var ret= await this.$http.Get('/api/services/app/B_ManagerPayAccount/GetList',{
                    type:this.info.payType,
                    maxResultCount:10,
                    skipCount:0
                })
                if(ret.success&&ret.result.items.length>0){
                    this.payinfo=ret.result.items;
                }
            },
            async submit() {
                if (!this.info.inviteUrlId) {
                    Toast.fail('无效的邀请链接，请重新扫描二维码注册。');
                    return;
                }
                if (!this.info.name) {
                    Toast.fail('姓名不能为空。');
                    return;
                }
                if (!this.info.tel) {
                    Toast.fail('手机号不能为空。');
                    return;
                }
                if (!this.info.vCode) {
                    Toast.fail('验证码不能为空。');
                    return;
                }
                if (!this.info.pwd) {
                    Toast.fail('密码不能为空。');
                    return;
                }
                if (this.info.pwd.length < 6) {
                    Toast.fail('密码不能小于6位。');
                    return;
                }
                if (this.info.pwd != this.info.pwd2) {
                    Toast.fail('两次密码输入不一致。');
                    return;
                }
                if (!this.info.wxId) {
                    Toast.fail('微信号不能为空。');
                    return;
                }
                if (!this.info.pNumber) {
                    Toast.fail('身份证号不能为空。');
                    return;
                }
                if (!this.info.provinces) {
                    Toast.fail('地区不能为空。');
                    return;
                }
                if (!this.info.payAmout) {
                    Toast.fail('打款金额不能为空。');
                    return;
                }
                if(this.info.payAmout<this.agentinfo.firstRechargeAmout+this.agentinfo.deposit){
                     Toast.fail(`打款金额不能小于首充金额+保证金【${this.agentinfo.firstRechargeAmout+this.agentinfo.deposit}】元。`);
                    return;
                }
                if (!this.info.payAcount) {
                    Toast.fail('打款账号不能为空。');
                    return;
                }
                if (!this.info.bankName && this.info.payType === 2) {
                    Toast.fail('开户银行不能为空。');
                    return;
                }
                if (!this.info.bankUserName && this.info.payType === 2) {
                    Toast.fail('银行户名不能为空。');
                    return;
                }
                if (!this.info.touxiangFile||!this.info.touxiangFile.id) {
                    Toast.fail('请上传头像');
                    return;
                }
                if (!this.info.credentFiles||this.info.credentFiles.length===0) {
                    Toast.fail('请上传打款凭证');
                    return;
                }
                if (!this.info.handleCredentFiles||this.info.handleCredentFiles.length===0) {
                    Toast.fail('请上传手持证件');
                    return;
                }
                this.disabled=true;
                var ret = await this.$http.Post('/api/services/app/B_AgencyApply/Create', this.info);
                if (ret.success) {
                    Dialog.alert({
                        message: '恭喜你注册成功，请等待管理员审核。'
                    }).then(() => {
                        this.$router.push('login')
                    });
                }else{
                    this.disabled=false;
                }
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
            }
        },
        mounted(){
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