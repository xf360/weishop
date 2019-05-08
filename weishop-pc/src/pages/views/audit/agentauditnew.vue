<template>
  <div>
    <a-form :autoFormCreate="(form) => this.form = form">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="代理姓名" fieldDecoratorId="name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入代理姓名。',whitespace: true}]}">
        <a-input placeholder="请输入代理姓名。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="联系电话" fieldDecoratorId="tel"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入联系电话。',whitespace: true}]}">
        <a-input placeholder="请输入联系电话。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="验证码" fieldDecoratorId="vCode"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码。',whitespace: true}]}">
        <a-input placeholder="请输入验证码。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="微信号" fieldDecoratorId="wxId"
        :fieldDecoratorOptions="{rules: [{ whitespace: true}]}">
        <a-input placeholder="请输入微信号。" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="密码" fieldDecoratorId="pwd"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码。',whitespace: true}]}">
        <a-input placeholder="请输入密码。" type="password"/>
      </a-form-item>
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="确认密码" fieldDecoratorId="pwd2"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入密码。',whitespace: true}]}">
        <a-input placeholder="请再次输入密码。" type="password"/>
      </a-form-item>
       <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="身份证号" fieldDecoratorId="pNumber"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证号。',whitespace: true}]}">
        <a-input placeholder="请输入身份证号。" />
      </a-form-item>
       <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="地区" fieldDecoratorId="area">
        <a-cascader placeholder="请选择地区" :options="areaoptions" allowClear />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="详细地址" fieldDecoratorId="address"
        :fieldDecoratorOptions="{rules: [{ whitespace: true}]}">
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
         <a-input-number :min="0" :max="99999" placeholder="请输入打款金额"  />
      </a-form-item>
      
      <a-form-item v-if="payType===0" :label-col="labelcol" :wrapper-col="wrappercol" label="支付宝号" fieldDecoratorId="payAcount"
        >
        <a-input placeholder="请输入支付宝号" />
      </a-form-item>
       <a-form-item v-if="payType===1" :label-col="labelcol" :wrapper-col="wrappercol" label="开户银行" fieldDecoratorId="bankName"
        >
        <a-input placeholder="请输入开户银行" />
      </a-form-item>
      <a-form-item v-if="payType===1" :label-col="labelcol" :wrapper-col="wrappercol" label="银行户名" fieldDecoratorId="bankUserName"
        >
        <a-input placeholder="请输入银行户名" />
      </a-form-item>
      <a-form-item v-if="payType===1" :label-col="labelcol" :wrapper-col="wrappercol" label="银行账户" fieldDecoratorId="payAcount"
        >
        <a-input placeholder="请输入银行账户" />
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="打款日期" fieldDecoratorId="payDate"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入打款日期'}]}">
        <a-date-picker placeholder="请输入打款日期" />
      </a-form-item>
       <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="头像" extra="" fieldDecoratorId="touxiangFile">
        <a-upload accept=".jpg, .jpeg, .png" name="logo" :action="uploadurl" list-type="picture">
          <a-button>
            <a-icon type="upload" />选择文件
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="打款凭证" extra="" fieldDecoratorId="credentFiles">
        <a-upload accept=".jpg, .jpeg, .png" name="logo" :action="uploadurl" list-type="picture">
          <a-button>
            <a-icon type="upload" />选择文件
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="手持证件" extra="" fieldDecoratorId="handleCredentFiles">
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
    data() {
      return {
        labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        areaoptions: area,
        payType:0,
        uploadurl:api+'api/AbpFile/Post',
      }
    },
    methods: {
      async submit() {
        return new Promise((resolve, reject) => {

          this.form.validateFields(async (err, values) => {
            debugger
            if (!err) {
              if (!values.area) {
                this.$message.error('请选择地区');
                return;
              }
              if(!values.pwd||values.pwd.length<6){
                this.$message.error('密码不能小于6位');
                return;
              }
              if(values.pwd!=values.pwd2){
                this.$message.error('两次密码不一致');
                return;
              }
              if(values.touxiangFile&&values.touxiangFile.fileList){
                values.touxiangFile=values.touxiangFile.fileList[0].response.result.data[0]
              }
              if(values.credentFiles&&values.credentFiles.fileList){
                values.credentFiles=values.credentFiles.fileList[0].response.result.data;
              }
              if(values.handleCredentFiles&&values.handleCredentFiles.fileList){
                values.handleCredentFiles=values.handleCredentFiles.fileList[0].response.result.data;
              }
              values.country=1;
              values.provinces = values.area[0];
              values.city = values.area[1];
              values.county = values.area[2];
              values.agencyLevel=1;
              values.agencyLevelId="49c4e8f7-b5ba-424a-ad63-8c59913e5758";
              var ret = await this.$http.Post('/api/services/app/B_AgencyApply/Create', values);
              this.$message.success("操作成功", 3)
              if(ret.success){
                var ret2=await this.$http.Post('/api/services/app/B_AgencyApply/Audit',{
                  id:ret.result,
                  remark:'管理员添加',
                  isPass:true
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
