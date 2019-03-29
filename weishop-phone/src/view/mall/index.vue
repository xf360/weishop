<template>
    <div>
        <div class="imgcard">
            <router-link :to="{name:'trylist'}">
                试用装
            </router-link>
            
        </div>
        <div class="imgcard">
            母婴用品
        </div>
        <div class="imgcard">
            美妆面膜
        </div>
        <div class="imgcard">
             <router-link :to="{name:'zhigou'}">
                直购
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    
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


