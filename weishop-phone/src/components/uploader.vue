<template>
    <div class="imglist">
        <div class="imglist">
            <div class="imgitem" v-for="(file,index) in filelist" :key="index">
                <span class="imgclose" @click="del(index)"></span>
                <img :src="file.content" />
            </div>
        </div>
        <van-uploader class="uploader" name="headerimg" :after-read="onRead" :before-read="onBefore"
            accept="image/gif, image/jpeg">
            <van-icon name="plus" v-if="filelist.length<limit" />
            <!-- <img src="" width="50" height="50"/> -->
        </van-uploader>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        Uploader,
        Icon,
        Toast
    } from 'vant';
    Vue.use(Uploader).use(Icon).use(Toast)
    export default {
        props: {
            limit: {
                type: Number,
                default: 1
            },
            // src:{
            //     type:String,
            // },
        },
        data() {
            return {
                filelist: [],
                files: [],
            }
        },
        methods: {
            onBefore() {
                if (this.filelist.length >= this.limit) {
                    Toast.fail(`只允许上传${this.limit}个文件。`);
                    return false
                }
                return true
            },
            del(index) {
                if (this.filelist.length == 1) {
                    this.filelist = [];
                    this.files = [];
                } else {
                    this.filelist = this.filelist.slice(index)
                    this.files = this.files.slice(index)
                }
            },
            async onRead(file) {
                
                let formData = new FormData();
                formData.append(this.name, file.file);
                this.$emit("uploading", file);
                var ret = await this.$http.Post('/api/AbpFile/Post', formData);
                debugger;
                this.$emit("uploaded", this.files)
                if (ret.result.isSuccess === false) {
                    Toast.fail(ret.result.msg);
                   
                } else {
                    this.filelist.push(file);
                    this.files.push(ret.result.data[0])
                    if (this.limit == 1) {
                        this.$emit("input", this.files[0])
                    } else {
                        this.$emit("input", this.files)
                    }
                }
                this.$forceUpdate();
            },
        }
    }
</script>

<style>
    .imglist {
        display: inline-block;
    }

    .imgitem {
        display: inline-block;
        margin: 5px;
    }

    .imglist img {
        width: 50px;
    }

    .imgclose {
        background: url(icon_del.png) no-repeat;
        background-size: 23px auto;
        width: 24px;
        height: 24px;
        margin-left: 30px;
        position: absolute;
    }

    .uploader .van-icon {
        font-size: 40px !important;
    }
</style>