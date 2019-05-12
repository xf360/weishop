<template>
    <div>
        <van-nav-bar title="地址列表" left-text="返回" right-text="添加" left-arrow @click-left="onClickLeft"
            @click-right="onClickRight" />
        <van-address-list style="position: fixed;top: 45px;left: 0px;right: 0px;" v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" @select="select"/>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        AddressList
    } from 'vant';

    Vue.use(AddressList).use(NavBar);
    export default {
        data() {
            return {
                chosenAddressId:'',
                list: []
            }
        },
        mounted(){
            this.loadlist();
        },
        methods: {
            select(item,index){
                 this.$store.commit('setaddress',item);
            },
            onAdd() {},
            async loadlist(){
                var userid=this.$store.state.loginInfo.user.id;
                var ret= await this.$http.Get('/api/services/app/B_MyAddress/GetList',{
                    userId:userid,
                    maxResultCount:99,
                    skipCount:0
                });
                if(ret.success){
                    this.list=[];
                    for(var i in ret.result.items){
                        var addressstr=ret.result.items[i].provinces+
                        ret.result.items[i].city+ret.result.items[i].county+
                        ret.result.items[i].addres
                        var tem={
                            id:ret.result.items[i].id,
                            //name:ret.result.items[i].name,
                            name:'',
                            tel:ret.result.items[i].tel,
                            address:addressstr,
                        }
                        this.list.push(tem);
                    }
                    
                }
            },
            onEdit(item,index) {
                this.$router.push('/index/addressedit?id='+item.id)
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push('/index/addressedit')
            }
        }
    }
</script>