<template>
  <!-- 账户管理 -->
  <div>
    <a-card>
      <div class="tools">
        <a-form layout="inline">
          <a-form-item label="关键字">
            <a-input v-model="params.searchKey" style="width:300px" placeholder="请输入代理姓名、电话、微信、身份证搜索" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="getlist">
              搜索
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="opennew">
              新建
            </a-button>
          </a-form-item>
        </a-form>
        <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns"
          :rowKey="record => record.id" :dataSource="list" :loading="loading" @change="pagechange"
          :pagination="pagination">
          <span slot="creationTime" slot-scope="text">
            <span>{{text|dateformat}}</span>
          </span>
          <span slot="action" slot-scope="text, record">
            <!-- <a href="javascript:;" @click=" selectid = record.id;detailvisible=true">查看</a> -->
            <a href="javascript:;" @click=" loaddetail(record.id)"> 编辑 </a>
            <a-popconfirm v-if="record.isActive" title="是否要停用该账号？" @confirm="enable(record.id)">
              <a> 停用 </a>
            </a-popconfirm>
            <a-popconfirm v-if="!record.isActive" title="是否要启用该账号？" @confirm="enable(record.id)">
              <a> 启用 </a>
            </a-popconfirm>
          </span>
        </a-table>
        <a-modal destroyOnClose :maskClosable="false" :title="!isnew?'编辑':'新建'" v-model="editshow" @ok="save"
          cancelText="取消" okText="确认">
          <a-form v-if="editshow" :autoFormCreate="(form) => this.form = form">
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="账号名称"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账号名称。',whitespace: true}]}">
              <a-input v-model="detailinfo.name" placeholder="请输入账号名称。" />
            </a-form-item>
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="账号"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账号。',whitespace: true}]}">
              <a-input v-model="detailinfo.userName" placeholder="请输入账号。" :disabled="!isnew" />
            </a-form-item>
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="新密码"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入新密码。'}]}">
              <a-input v-model="detailinfo.newPassword" placeholder="请输入新密码。" type="password" />
            </a-form-item>
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="确认新密码"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请确认新密码。'}]}">
              <a-input v-model="detailinfo.newPassword2" placeholder="请确认新密码。" type="password" />
            </a-form-item>
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="权限"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请确认权限。'}]}">
              <a-tree @expand="onExpand" @check="oncheck" checkable :expandedKeys="expandedKeys"
                :autoExpandParent="autoExpandParent" v-model="detailinfo.grantedPermissionNames"
                :selectedKeys="selectedKeys" :treeData="treeData" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>
<script>
  import help from '../../../utils/help.js'
  export default {
    data() {
      return {
        treeData: [],
        selectedKeys: [],
        expandedKeys: [],
        autoExpandParent: true,
        labelcol: {
          span: 5
        },
        loading: false,
        wrappercol: {
          span: 19
        },
        params: {
          id: 40145,
          searchKey: '',
          skipCount: 0,
          maxResultCount: 10,
        },
        selectid: '',
        editshow: false,
        detailinfo: {},
        isnew: false,
        pagination: {
          total: 0,
        },
        list: [],
        columns: [{
          title: '账号名称',
          dataIndex: 'name'
        }, {
          title: '账号',
          dataIndex: 'userName'
        }, {
          title: '创建时间',
          dataIndex: 'addedTime',
          scopedSlots: {
            customRender: 'creationTime'
          },
        }, {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: {
            customRender: 'action'
          },
        }]
      }
    },
    mounted() {
      this.getlist();
      this.getpermiss();
    },
    methods: {
      oncheck(checkedKeys, info) {
        debugger;
        this.detailinfo.grantedPermissionNames = checkedKeys;
        this.$forceUpdate();
      },
      async getpermiss() {
        var ret = await this.$http.Get('/api/services/app/AbpPermissionBase/GetByMoudleName', {
          moudleName: 'WebShop'
        });
        if (ret.success) {
          var permiss = ret.result;
          this.treeData = help.list2tree(permiss, null, {
            sourcePid: 'parentId',
            sourceKey: 'id',
            sourceTitle: 'displayName',
            targetKey: 'key',
            targetValue: 'code',
            targetTitle: 'title',
            targetChildren: 'children'
          });
        }
      },
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys
        this.autoExpandParent = false
      },
      async enable(id) {
        var ret = await this.$http.Post('/api/services/app/User/Enable', {
          id: id
        });
        if (ret.success) {
          this.$message.success('更新成功');
          this.getlist();
        }

      },
      pagechange(pagination) {
        this.params.maxResultCount = pagination.pageSize;
        this.params.skipCount = (pagination.current - 1) * pagination.pageSize;
        this.getlist();
      },
      opennew() {
        this.editshow = true;
        this.detailinfo = {};
        this.isnew = true;
      },
      async loaddetail(id) {
        this.editshow = true;
        this.isnew = false;
        var ret = await this.$http.Get('/api/services/app/User/Get', {
          id: id
        });
        if (ret.success) {
          this.detailinfo = ret.result;
          var ret2 = await this.$http.Get('/api/services/app/User/GetUserPermissionsForEdit', {
            id: id
          });
          if (ret2.success) {
            this.detailinfo.grantedPermissionNames = ret2.result.grantedPermissionNames;
            this.$forceUpdate();
          }
        }
      },
      async getlist() {
        var ret = await this.$http.Get('/api/services/app/WorkFlowOrganizationUnits/GetOrganizationUnitUsers', this
          .params);
        if (ret.success) {
          this.list = ret.result.items;
          this.pagination.total = ret.result.totalCount;
        }
      },
      async save() {
        if (!this.detailinfo.name) {
          this.$message.error('请填写账户名称');
          return;
        }
        if (!this.isnew) {
          if (this.detailinfo.newPassword) {
            if (this.detailinfo.newPassword.length < 6) {
              this.$message.error('密码必须大于6位');
              return;
            }
            if (this.detailinfo.newPassword != this.detailinfo.newPassword2) {
              this.$message.error('两次密码必须一致');
              return;
            }
          }
          this.detailinfo.password = this.detailinfo.newPassword;
          var ret = await this.$http.Put('/api/services/app/User/UpdateUserAsyn',{user:this.detailinfo} );
          if (ret.success) {
            var ret2 = await this.$http.Put('/api/services/app/User/UpdateUserPermissions', {
              id: this.detailinfo.id,
              grantedPermissionNames: this.detailinfo.grantedPermissionNames
            })
            if (ret2.success) {
              this.$message.success('更新成功');
              this.editshow = false;
              this.getlist();
            }
          }
        } else {
          if (this.detailinfo.newPassword.length < 6) {
            this.$message.error('密码必须大于6位');
            return;
          }
          if (this.detailinfo.newPassword != this.detailinfo.newPassword2) {
            this.$message.error('两次密码必须一致');
            return;
          }
          this.detailinfo.password = this.detailinfo.newPassword;
          this.detailinfo.surname = this.detailinfo.name;
          this.detailinfo.emailAddress=this.detailinfo.userName+'@qq.com';
          this.detailinfo.organizationUnitId=40145;
          this.detailinfo.roleNames=['ADMIN'];
          this.detailinfo.isActive=true;
          if(!this.detailinfo.grantedPermissionNames){
            this.detailinfo.grantedPermissionNames=[];
          }
          var ret = await this.$http.Post('/api/services/app/User/Create', this.detailinfo);
          if (ret.success) {
            var ret2 = await this.$http.Put('/api/services/app/User/UpdateUserPermissions', {
              id: ret.result.id,
              grantedPermissionNames: this.detailinfo.grantedPermissionNames
            })
            if (ret2.success) {
               this.$message.success('添加成功');
                this.editshow = false;
                this.getlist();
            }
          }
        }
      }
    }
  }
</script>