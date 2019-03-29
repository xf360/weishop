<template>
    <div>
        <van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-address-edit style="margin-top:50px" :area-list="areaList" show-postal show-delete show-set-default show-search-result
           :address-info="addressinfo"  @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        AddressEdit
    } from 'vant';

    Vue.use(NavBar).use(AddressEdit);
    import area from '../../utils/area.js'
    export default {
        data() {
            return {
                addressinfo:{},
                areaList:area,
            }
        },

        methods: {
            onSave() {
                Toast('save');
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
            onClickLeft(){
                this.$router.go(-1);
            }
        }
    }
</script>