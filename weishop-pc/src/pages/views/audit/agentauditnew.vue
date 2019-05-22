<template>
  <div>

    <a-form :autoFormCreate="(form) => this.form = form">
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="代理姓名" fieldDecoratorId="name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入代理姓名。',whitespace: true}]}">
        <a-input placeholder="请输入代理姓名。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="联系电话" fieldDecoratorId="tel"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入联系电话。',whitespace: true}]}">
        <a-input-search placeholder="请输入联系电话。" @search="send()">
          <a-button slot="enterButton" >发送短信</a-button>
        </a-input-search>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="验证码" fieldDecoratorId="vCode"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码。',whitespace: true}]}">
        <a-input placeholder="请输入验证码。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="微信号" fieldDecoratorId="wxId"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入微信号。',whitespace: true}]}">
        <a-input placeholder="请输入微信号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="密码" fieldDecoratorId="pwd"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码。',whitespace: true}]}">
        <a-input placeholder="请输入密码。" type="password" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="确认密码" fieldDecoratorId="pwd2"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入密码。',whitespace: true}]}">
        <a-input placeholder="请再次输入密码。" type="password" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="身份证号" fieldDecoratorId="pNumber"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证号。',whitespace: true}]}">
        <a-input placeholder="请输入身份证号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="地区" fieldDecoratorId="area"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择地区。'}]}">
        <a-cascader placeholder="请选择地区" :options="areaoptions" allowClear />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="详细地址" fieldDecoratorId="address"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入详细地址。',whitespace: true}]}">
        <a-input placeholder="请输入详细地址。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="打款方式" fieldDecoratorId="payType"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择打款方式'}]}">
        <a-select v-model="payType" placeholder="请选择打款方式" style="width:250px;">
          <a-select-option :value="0">
            支付宝
          </a-select-option>
          <a-select-option :value="1">
            银行转账
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="打款金额" fieldDecoratorId="payAmout"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入打款金额'}]}">
        <a-input-number :min="allmoney" :max="99999" placeholder="请输入打款金额" />
      </a-form-item>

      <a-form-item v-show="payType===0" :label-col="labelcol" :wrapper-col="wrappercol" label="支付宝号"
        fieldDecoratorId="payAcount" :fieldDecoratorOptions="{rules: [{ required: payType===0, message: '请输入账户'}]}">
        <a-input placeholder="请输入账户" />
      </a-form-item>
      <a-form-item v-show="payType===1" :label-col="labelcol" :wrapper-col="wrappercol" label="开户银行"
        fieldDecoratorId="bankName" :fieldDecoratorOptions="{rules: [{ required: payType===1, message: '请输入账户'}]}">
        <a-input placeholder="请输入开户银行" />
      </a-form-item>
      <a-form-item v-show="payType===1"  :label-col="labelcol" :wrapper-col="wrappercol" label="银行户名"
        fieldDecoratorId="bankUserName" :fieldDecoratorOptions="{rules: [{ required: payType===1, message: '请输入账户'}]}">
        <a-input placeholder="请输入银行户名" />
      </a-form-item>
      <a-form-item v-show="payType===1" :label-col="labelcol" :wrapper-col="wrappercol" label="银行账户"
        fieldDecoratorId="payAcount" :fieldDecoratorOptions="{rules: [{ required: payType===1, message: '请输入账户'}]}">
        <a-input placeholder="请输入账户" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="打款日期" fieldDecoratorId="payDate"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入打款日期'}]}">
        <a-date-picker placeholder="请输入打款日期" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="头像" extra="" fieldDecoratorId="touxiangFile"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请上传头像'}]}">
        <a-upload accept=".jpg, .jpeg, .png" name="logo" :action="uploadurl" list-type="picture">
          <a-button>
            <a-icon type="upload" />选择文件
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="打款凭证(1-2张)" extra=""
        fieldDecoratorId="credentFiles" :fieldDecoratorOptions="{rules: [{ required: true, message: '请上传打款凭证(1-2张)'}]}">
        <a-upload accept=".jpg, .jpeg, .png" name="logo" :action="uploadurl" list-type="picture">
          <a-button>
            <a-icon type="upload" />选择文件
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item  :label-col="labelcol" :wrapper-col="wrappercol" label="手持证件(1-2张)" extra=""
        fieldDecoratorId="handleCredentFiles" :fieldDecoratorOptions="{rules: [{ required: true, message: '请上传手持证件(1-2张)'}]}">
        <a-upload accept=".jpg, .jpeg, .png" name="logo" :action="uploadurl" list-type="picture">
          <a-button>
            <a-icon type="upload" />选择文件
          </a-button>
        </a-upload>
      </a-form-item>

    </a-form>
  </div>
</template>
<script>
  import area from '../../../utils/area.js'
  export default {
    props: {
      id: {
        type: [String, Number],

      }
    },
    mounted(){
      this.getonemoney();
    },
    data() {
      return {
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        allmoney:0,
        areaoptions: area,
        payType: 0,
        uploadurl: this.$http.api + 'api/AbpFile/Post',
      }
    },
    methods: {
      send() {
        this.$message.error('暂时未开通...');
        return;
      },
      async getonemoney(){
        var ret= await this.$http.Get('/api/services/app/B_AgencyLevel/GetOneLeavel');
        if(ret.success){
          this.allmoney=ret.result.firstRechargeAmout+ret.result.deposit;
          this.form.setFieldsValue({payAmout:this.allmoney});
        }
      },
      async submit() {
        return new Promise((resolve, reject) => {

          this.form.validateFields(async (err, values) => {
            debugger
            if (!err) {
              if (!values.area) {
                this.$message.error('请选择地区');
                return;
              }
              if (!values.pwd || values.pwd.length < 6) {
                this.$message.error('密码不能小于6位');
                return;
              }
              if (values.pwd != values.pwd2) {
                this.$message.error('两次密码不一致');
                return;
              }
              if(values.payAmout<this.allmoney){
                this.$message.error('打款金额不能小于'+this.allmoney);
                return;
              }
              if (values.touxiangFile && values.touxiangFile.fileList) {
                values.touxiangFile = values.touxiangFile.fileList[0].response.result.data[0]
              }
              if(!values.credentFiles.fileList||values.credentFiles.fileList.length==0||values.credentFiles.fileList.length>2){
                this.$message.error('必须上传打款凭证且最多只能上传2张附件');
                return;
              }
              var temp=[];
              for(var i in values.credentFiles.fileList){
                temp.push(values.credentFiles.fileList[i].response.result.data[0])
              }
              values.credentFiles=temp;
              if(!values.handleCredentFiles.fileList||values.handleCredentFiles.fileList.length==0||values.handleCredentFiles.fileList.length>2){
                this.$message.error('必须上传手持证件且最多只能上传2张附件');
                return;
              }
              var temp2=[];
              for(var i in values.handleCredentFiles.fileList){
                temp2.push(values.handleCredentFiles.fileList[i].response.result.data[0])
              }
              values.handleCredentFiles=temp2;

              values.country = 1;
              values.provinces = values.area[0];
              values.city = values.area[1];
              values.county = values.area[2];
              values.agencyLevel = 1;
              values.agencyLevelId = "49c4e8f7-b5ba-424a-ad63-8c59913e5758";
              var ret = await this.$http.Post('/api/services/app/B_AgencyApply/Create', values);
              if (ret.success) {
                this.$message.success("操作成功", 3)
                var ret2 = await this.$http.Post('/api/services/app/B_AgencyApply/Audit', {
                  id: ret.result,
                  remark: '管理员添加',
                  isPass: true
                })

              }
              resolve(ret.success);
            } else {
              resolve(false);
            }
          });
        });

      }
    }
  }

</script>
