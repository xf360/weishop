<template>
    <div>
        <van-nav-bar title="申请代理" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell title="邀请代理" value="辉哥" />
            <van-cell title="联系电话" value="18000000000" />
            <van-cell title="联系地址" value="地址" />
        </van-cell-group>
        <h2 class="celltitle">填写内容</h2>
        <van-cell-group>
            <van-cell title="代理等级" value="一级" />
            <van-field v-model="name" required clearable label="姓名：" placeholder="请输入姓名" />
            <van-field v-model="name" required clearable label="联系电话：" placeholder="请输入联系电话" />
            <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
            <van-field v-model="password" type="password" label="确认密码" placeholder="请再次输入密码" required />
            <van-field v-model="name" required clearable label="微信号：" placeholder="请输入微信号" />

            <van-field v-model="name" required clearable label="身份证号：" placeholder="请输入身份证号" />
            <van-field @click="areaclick" v-model="info.areaname" required readonly="readonly" clearable label="地区："
                placeholder="省/市/区" />
            <van-field v-model="name" required clearable label="详细地址：" placeholder="请输入详细地址" />
            <van-cell title="打款方式：">
                <template slot="right-icon">
                    <select v-model="info.paytype" style="width:250px">
                        <option value="1">支付宝</option>
                        <option value="2">银行转账</option>
                    </select>
                </template>
            </van-cell>
            <van-field v-model="info.money" required readonly="readonly" label="打款金额：" />
            <van-field v-model="name" required clearable label="支付宝：" placeholder="请输入支付宝号" />
            <van-field @click="timeclick" v-model="info.paytime" required readonly="readonly" clearable label="打款日期："
                placeholder="打款日期" />
            <van-cell>
                <template slot="title">
                    <span class="custom-text">头像：</span>
                    <uploader :limit="2" v-model="info.headimg"></uploader>
                </template>
            </van-cell>
        </van-cell-group>

        <van-popup v-model="show" position="bottom">
            <van-area :area-list="areaList" @confirm="areaok" @cancel="show=false;" />
        </van-popup>
        <van-popup v-model="timeshow" position="bottom">
            <van-datetime-picker :formatter="formatter" type="date" @confirm="timeok" @cancel="timeshow=false;" />
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
        Button 
    } from 'vant';

    Vue.use(NavBar).use(Cell).use(CellGroup).use(Field).use(Area).use(Popup).use(Picker)
        .use(DatetimePicker).use(Button );
    export default {
        components:{
            uploader
        },
        data() {
            return {
                show: false,
                areaList: area,
                timeshow: false,

                info: {
                    areaname: '',
                    areacode: '',
                    paytype: 1,
                    money: 36000,
                    headerimg:'',
                    paytime: (new Date()).toLocaleDateString()
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
                this.info.areacode = val[val.length - 1].code;
                this.show = false;
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