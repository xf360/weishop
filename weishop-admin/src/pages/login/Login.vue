<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <!-- <img alt="logo" class="logo" src="static/img/vue-antd-logo.png" /> -->
          <span class="title">成都润百恩科技有限公司分销管理系统</span>
        </div>
        <div class="desc"></div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon
                style="margin-bottom: 24px;" />
              <a-form-item fieldDecoratorId="userNameOrEmailAddress"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名', whitespace: true}]}">
                <a-input v-model="parm.userNameOrEmailAddress" size="large" placeholder="用户名/邮箱">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item fieldDecoratorId="password"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}">
                <a-input v-model="parm.password" size="large" placeholder="密码" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
            <!-- <a-tab-pane tab="手机号登录" key="2">
              <a-form-item>
                <a-input size="large" placeholder="mobile number" >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-tab-pane> -->
          </a-tabs>
          <div>
            <a-checkbox :checked="true">自动登录</a-checkbox>
            <!-- <a style="float: right">忘记密码</a> -->
          </div>
          <a-form-item>
            <a-button :loading="loading" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
              type="primary">登录</a-button>
          </a-form-item>
          <!-- <div>
            其他登录方式
            <a-icon class="icon" type="alipay-circle" />
            <a-icon class="icon" type="taobao-circle" />
            <a-icon class="icon" type="weibo-circle" />
            <router-link style="float: right" to="/dashboard/workplace" >注册账户</router-link>
          </div> -->
        </a-form>
      </div>
    </div>
    <global-footer :copyright="copyright" />
  </div>
</template>

<script>
  import GlobalFooter from '../../layouts/GlobalFooter'

  export default {
    name: 'Login',
    components: {
      GlobalFooter
    },
    data() {
      return {
        parm: {
          userNameOrEmailAddress: '',
          password: ''
        },
        loading: false,
        data: {

        },
        error: ''
      }
    },
    computed: {
      
      linkList() {
        return this.$store.state.setting.footerLinks
      },
      copyright() {
        return this.$store.state.setting.copyright
      }
    },
    methods: {
     async onSubmit(e) {
        e.preventDefault()
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.loading = true;
            var res = await this.$http.Post('/api/TokenAuth/Authenticate', this.parm);
             this.loading = false;
            debugger;
            if (res.success) {
              const token = res.result.accessToken
              window.localStorage.setItem("token", token);
              this.$router.push('/dashboard/analysis')
              this.$message.success("欢迎你回来", 3)
            }
          }
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;

    .content {
      padding: 32px 0;
      flex: 1;

      @media (min-width: 768px) {
        padding: 112px 0 24px;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          a {
            text-decoration: none;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }

          .title {
            font-size: 20px;
            color: rgba(0, 0, 0, .85);

            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, .45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .login {
        width: 368px;
        margin: 0 auto;

        @media screen and (max-width: 576px) {
          width: 95%;
        }

        @media screen and (max-width: 320px) {
          .captcha-button {
            font-size: 14px;
          }
        }

        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }

</style>
