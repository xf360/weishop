<template>
    <div>
        <van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-address-edit ref="addressref" style="margin-top:50px" :area-list="areaList" show-postal show-delete
            show-set-default show-search-result :address-info="addressinfo" @save="onSave" @delete="onDelete"
            @change-detail="onChangeDetail" />
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        AddressEdit,
        Dialog
    } from 'vant';

    Vue.use(NavBar).use(AddressEdit).use(Dialog);
    import area from '../../utils/area.js'
    export default {
        data() {
            return {
                addressinfo: {

                },
                areaList: area,
            }
        },
        mounted() {
            this.load()
        },
        methods: {
            async load() {
                var id = this.$route.query.id;
                if (id) {
                    var ret = await this.$http.Get('/api/services/app/B_MyAddress/Get', {
                        id: id
                    });
                    if (ret.success) {
                        this.addressinfo = {
                            name: ret.result.name,
                            tel: ret.result.tel,
                            province: ret.result.provinces,
                            city: ret.result.city,
                            county: ret.result.county,
                            addressDetail: ret.result.addres,
                            //areaCode:ret.result.name,
                            postalCode: ret.result.consignee,
                            isDefault: ret.result.isDefault
                        }
                    }
                }
            },
            async onSave() {
                var id = this.$route.query.id;
                var info = this.$refs.addressref.data;
                var userid = this.$store.state.loginInfo.user.id;
                var address = {
                    userId: userid,
                    provinces: info.province,
                    county: info.county,
                    city: info.city,
                    addres: info.addressDetail,
                    consignee: info.postalCode,
                    tel: info.tel,
                    isDefault: info.isDefault,
                    name: info.name
                }
                if (!id) {
                    var ret = await this.$http.Post('/api/services/app/B_MyAddress/Create', address);
                    if (ret.success) {
                        Dialog.alert({
                            title: '成功',
                            message: '地址已添加'
                        }).then(() => {
                            this.$router.go(-1)
                        });
                    }
                } else {
                    address.id=id;
                    var ret = await this.$http.Put('/api/services/app/B_MyAddress/Update', address);
                    if (ret.success) {
                        Dialog.alert({
                            title: '成功',
                            message: '地址已保存'
                        }).then(() => {
                            this.$router.go(-1)
                        });
                    }
                }
            },
            onDelete() {
                Toast('delete');
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                        name: '张三',
                        address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            },
            onClickLeft() {
                this.$router.go(-1);
            }
        }
    }
</script>