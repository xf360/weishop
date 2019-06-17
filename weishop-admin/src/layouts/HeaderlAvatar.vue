<template>
  <div>
    <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial">
      <span style="cursor: pointer">
        <a-avatar class="avatar" size="small" shape="circle" :src="avatar" icon="user" />
        <span>{{currUser.name}}</span>
      </span>
      <a-menu style="width: 150px" slot="overlay" @click="click">
        <a-menu-item key="info">
          <a-icon type="user" />
          <span>个人中心</span>
        </a-menu-item>
        <!-- <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item> -->
        <a-menu-divider />
        <a-menu-item key="loginout">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-modal :maskClosable="false" destroyOnClose title="个人中心" @ok="saveheader" v-model="infovisible" cancelText="取消"
      okText="确认">
      <div v-if="infovisible">
      <a-row >
        <a-col :span="8" style="text-align:right">头像：</a-col>
        <a-col :span="16">
          <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false"
            :action="uploadapi" :headers="headers" @change="filechange">
            <img height="100" width="100" v-if="avatar" :src="avatar" alt="头像" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传头像</div>
            </div>
          </a-upload>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" style="text-align:right">账户名称：</a-col>
        <a-col :span="16">{{currUser.name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="8" style="text-align:right">账号：</a-col>
        <a-col :span="16">{{currUser.userName}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="8" style="text-align:right">密码：</a-col>
        <a-col :span="16"><a @click="pwdvisible=true">修改密码</a></a-col>
      </a-row>
      </div>
    </a-modal>
    <a-modal :maskClosable="false" destroyOnClose title="修改密码" @ok="savepwd" v-model="pwdvisible" cancelText="取消"
      okText="确认">
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="当前密码" fieldDecoratorId="currentPassword"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入当前密码。'}]}">
          <a-input v-model="newpwd.currentPassword" placeholder="请输入当前密码。" type="password" />
        </a-form-item>
      </a-form>
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="新密码" fieldDecoratorId="newPassword"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入新密码。'}]}">
          <a-input v-model="newpwd.newPassword" placeholder="请输入新密码。" type="password" />
        </a-form-item>
      </a-form>
      <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="确认新密码" fieldDecoratorId="newPassword2"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请确认新密码。'}]}">
          <a-input v-model="newpwd.newPassword2" placeholder="请确认新密码。" type="password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'HeaderAvatar',
    data() {
      var token = window.localStorage.getItem('token')
      return {
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        uploadapi: this.$http.api + 'api/Profile/ChangeProfilePicture',
        headers:{Authorization:'Bearer ' + token},
        infovisible: false,
        newpwd: {},
        pwdvisible: false,
        avatar: ''
      }
    },
    
    methods: {
      filechange(info) {
        if(info.file.status=='done'){
          this.$message.success('头像修改成功');
          this.getself();
        }
      },
      saveheader() {},
      async getself() {
        var ret = await this.$http.Get('/api/Profile/GetProfilePictureBase64');
        if (ret.success) {
          this.avatar = 'data:image/png;base64,'+ret.result;
        }
      },
      savepwd() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            if (!this.newpwd.newPassword || this.newpwd.newPassword.length < 6) {
              this.$message.error('密码不能小于6位');
              return;
            }
            if (this.newpwd.newPassword != this.newpwd.newPassword2) {
              this.$message.error('两次密码输入不一致');
              return;
            }
            var ret = await this.$http.Post('/api/services/app/Profile/ChangePassword', this.newpwd);
            if (ret.success) {
              this.$message.success('密码修改成功');
              this.pwdvisible = false;
            }
          }
        })
      },
      click(source) {
        switch (source.key) {
          case 'loginout':
            window.localStorage.removeItem("token")
            this.$router.push("/login")
            break;
          case 'info':
            this.infovisible = true;
            this.getself();
            break;
        }
      }
    },
    computed: {
      ...mapState({
        currUser: state => state.account.loginInfo.user
      })
    },
    mounted() {
      var vm=this;
      setTimeout(function(){
        vm.getself();
      },2000)
      
    }
  }

</script>

<style lang="less" scoped>
  .avatar {
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0, 0%, 100%, .85);
    vertical-align: middle;
  }

</style>
