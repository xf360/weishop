<template>
    <div class="imglist">
        <div class="imglist">
            <div class="imgitem" v-for="(file,index) in filelist" :key="index">
            <span class="imgclose" @click="del(index)"></span>
            <img :src="file.content" />
            </div>
        </div>
        <van-uploader name="headerimg" :after-read="onRead" :before-read="onBefore" accept="image/gif, image/jpeg">
            <van-icon  name="plus" />
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
    Vue.use(Uploader).use(Icon).use(Toast )
    export default {
        props:{
            limit:{
                type:Number,
                default:1
            },
            // src:{
            //     type:String,
            // },
        },
        data(){
            return {
                filelist:[],
            }
        },
        methods:{
            onBefore(){
                if(this.filelist.length>=this.limit){
                    Toast.fail(`只允许上传${this.limit}个文件。`);
                    return false
                }
                return true
            },
            del(index){
                debugger;
                this.filelist=this.filelist.slice(index)
            },
            onRead(file) {
                debugger;
                //this.info.headerimg=file.content;
                this.filelist.push(file);
                console.log(file)
            },
        }
    }
</script>

<style>
.imglist{
    display: inline-block;
}
.imgitem{
    display:inline-block;
    margin: 5px;
}
.imglist img{
    width: 50px;
}
.imgclose{
    background: url(icon_del.png) no-repeat;
    background-size: 23px auto;
    width: 24px;
    height: 24px;
    margin-left: 30px;
    position: absolute;
}
.van-icon{
font-size:40px !important;
}
</style>