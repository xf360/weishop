<template>
    <div>
        <div class="title">会员登陆</div>
        <van-cell-group>
            <van-field v-model="parm.userNameOrEmailAddress" required clearable label="手机号" placeholder="请输入手机号" />

            <van-field v-model="parm.password" type="password" label="密码" placeholder="请输入密码" required />
            <!-- <a class="findpw">忘记密码</a> -->
        </van-cell-group>
        <div class="loginbt">
            <van-button block type="primary" :loading="result.loading" @click="onSubmit">登陆</van-button>
        </div>
        
    </div>
</template>
<style>
    .title {
        font-size: 18px;
        padding: 20px;
        text-align: center;
        margin-top: 50px;
    }

    .loginbt {
        margin: auto;
        padding: 20px;
        text-align: center;
    }

    .findpw {
        float: right;
        padding: 10px;
    }
</style>

<script>
    import Vue from 'vue';
    import {
        Field,
        CellGroup,
        Button
    } from 'vant';

    Vue.use(CellGroup).use(Field).use(Button);
    export default {
        data() {
            return {
                parm: {
                    userNameOrEmailAddress: '',
                    password: '',
                    code:''
                },
                redirect:'',
                result: {
                    loading: false
                }
            }
        },
        methods: {
            async onSubmit(e) {
                e.preventDefault()
                var vm = this;
                if(!this.parm.userNameOrEmailAddress||!this.parm.password){
                    this.$notify('请输入用户名密码');
                    return;
                }
                var res = await this.$http.Post('/api/TokenAuth/Authenticate', this.parm);
                if (res.success) {
                    var token = res.result.accessToken
                    window.localStorage.setItem("token", token);
                    this.$router.push('/index/message')
                    this.$notify('欢迎你回来');
                }
            },
            
        },
        mounted(){
            this.redirect=window.location.href;
            debugger;
            var codeindex= window.location.href.indexOf('code=')
            if(codeindex>=0){
                var code=window.location.href.substr(codeindex+5,32);
                this.parm.code=code;
            }
        }
    }
</script>