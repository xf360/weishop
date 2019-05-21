<template>
    <div>
        <!-- <div class="imgcard" >
            <router-link :to="{name:'trylist'}">
                试用装
            </router-link>
            
        </div> -->
        <div class="imgcard" v-for="(item,index) in list" :key="index">
            <router-link :to="`/index/yuncang?id=${item.id}`">
                {{item.name}}
            </router-link>
        </div>
        <!-- <div class="imgcard">
            美妆面膜
        </div>
        <div class="imgcard">
             <router-link :to="{name:'zhigou'}">
                直购
            </router-link>
        </div> -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
        }
    },
    mounted(){
        this.getList();
    },
    methods:{
        async getList(){
            var ret=await this.$http.Get('/api/services/app/B_Categroy/GetCWCategroyList',{
                MaxResultCount:99,
                SkipCount:0
            });
            if(ret.success){
                this.list=ret.result.items;
            }
        }
    }
}
</script>
<style>
.imgcard{
height: 150px;
text-align: center;
margin-bottom: 20px;
 line-height: 150px;
 background-color: aquamarine
}
</style>


