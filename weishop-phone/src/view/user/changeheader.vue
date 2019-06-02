<template>
    <div>
        <van-nav-bar title="修改头像" left-arrow @click-left="onClickLeft" />

        <van-cell-group>

            <van-cell>
                <template slot="title">
                    <span class="custom-text">头像：</span>
                    <uploader  @uploading="cansave=false" @uploaded="cansave=true" :limit="1" v-model="info.file"></uploader>
                </template>
            </van-cell>
        </van-cell-group>
        <div class="loginbt">
            <van-button :disabled="!cansave" block @click="onSubmit">保存</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
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
    import uploader from '../../components/uploader.vue'
    Vue.use(NavBar).use(Cell).use(CellGroup).use(Field).use(Area).use(Popup).use(Picker)
        .use(DatetimePicker).use(Button).use(Toast).use(Dialog);
    export default {
        components: {
            uploader
        },
        data() {
            return {
                cansave:true,
                info: {
                    file: null
                }
            }
        },
        methods: {
            async onSubmit() {
                var file = this.info;
                if (!this.info.file) {
                    Toast.fail('请上传头像。');
                    return;
                }
                var ret = await this.$http.Post('/api/services/app/B_Agency/UpadteAgencyTouxiang', this.info);
                if (ret.success) {
                    Toast.fail('头像更新成功');
                    this.$router.go(-1);
                    return;
                }
            },

            onClickLeft() {
                this.$router.go(-1)
            }
        },
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