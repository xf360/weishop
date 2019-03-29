<template>
    <div class="card-content" @click.stop="click">
        <div class="card-img"><img :src="thumb" /></div>
        <div class="card-info">
            <div class="card-title">{{title}}</div>
            <div class="card-desc">{{desc}}</div>
            <div class="card-price">￥{{formatPrice}}</div>
            <div class="card-count">
                <van-stepper :integer="true" :disable-input="true" :max="99" @change="change" :value="count" />
            </div>
        </div>

    </div>
</template>

<script>
    import {
        Stepper
    } from 'vant';
    export default {
        components: {
            [Stepper.name]: Stepper,
        },
        props: {
            title: {
                type: String
            },
            desc: {
                type: String
            },
            num: {
                type: Number
            },
            changeNum: {
                type: Boolean,
                default: false,
            },
            price: {
                type: Number
            },
            thumb: {
                type: String
            },
            count:{
                type:Number,
                default:1
            }

        },
        computed:{
            formatPrice(){
                 return ((this.price*this.tmpcount) / 100).toFixed(2);
            }
        },
        data(){
            return {
                tmpcount:this.count
            }
        },
        methods:{
            change(value){
                this.tmpcount=value;
                this.$emit("countchange",value,this.price)
            },
            click(){}
        }
    }
</script>
<style>
.van-stepper__input[disabled]{
    color: #ff0000;
    font-weight: bold;
}
.card-desc{
    color: #7d7e80;
    max-height: 20px;
    line-height: 20px;
}
.card-price{
    display: inline-block;
    color: #f44;
    font-weight: bold;
        font-size: 18px;
    line-height: 18px;
    margin: 5px;
}
.card-title{
    font-size: 14px;
        line-height: 16px;
    max-height: 32px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
    .card-content {
        display: grid;
        grid-template-columns: 100px auto;
        height: 90px;
        margin: 10px;
        font-size: 12px
    }

    .card-img {
        margin-right: 10px
    }

    .card-img img {
        height: 90px;
        width: 90px;
    }
    .card-count{
        display: inline-block;
    position: absolute;
    /* top: 20px; */
    right: 10px;
    /* bottom: 10px; */
    }
</style>