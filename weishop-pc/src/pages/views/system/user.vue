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
        </a-form>
        <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns"
          :rowKey="record => record.id" :dataSource="list" :loading="loading" @change="pagechange"
          :pagination="pagination">
          <span slot="creationTime" slot-scope="text">
            <span>{{text|dateformat}}</span>
          </span>
          <span slot="action" slot-scope="text, record">
            <!-- <a href="javascript:;" @click=" selectid = record.id;detailvisible=true">查看</a> -->
            <a href="javascript:;" @click=" loaddetail(record.id)">编辑</a>
            <a-popconfirm title="是否要停用该账号？" @confirm="enable(record.id)">
              <a>停用</a>
            </a-popconfirm>
            <a-popconfirm title="是否要启用该账号？" @confirm="enable(record.id)">
              <a>启用</a>
            </a-popconfirm>
          </span>
        </a-table>
        <a-modal destroyOnClose :maskClosable="false" title="编辑" v-model="editshow" @ok="save" cancelText="取消"
          okText="确认">
          <a-form v-if="editshow" :autoFormCreate="(form) => this.form = form">
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="账号名称"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账号名称。',whitespace: true}]}">
              <a-input v-model="detailinfo.name" placeholder="请输入账号名称。" />
            </a-form-item>
            <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="手机号"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入手机号。',whitespace: true}]}">
              {{detailinfo.userName}}
            </a-form-item>
            <!-- <a-form :autoFormCreate="(form) => this.form = form">
                <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="新密码" 
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入新密码。'}]}">
                  <a-input v-model="newpwd.newPassword" placeholder="请输入新密码。" type="password" />
                </a-form-item>
              </a-form>
              <a-form :autoFormCreate="(form) => this.form = form">
                <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="确认新密码"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '请确认新密码。'}]}">
                  <a-input v-model="newpwd.newPassword2" placeholder="请确认新密码。" type="password" />
                </a-form-item>
              </a-form> -->
          </a-form>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        params: {
          skipCount: 0,
          maxResultCount: 10,
        },
        selectid: '',
        editshow: false,
        detailinfo: {},
        pagination: {
          total: 0,
        },
        list: [],
        columns: [{
          title: '账号名称',
          dataIndex: 'name'
        }, {
          title: '手机号',
          dataIndex: 'userName'
        }, {
          title: '创建时间',
          dataIndex: 'creationTime',
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
    },
    methods: {
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
      async loaddetail(id) {
        this.editshow = true;
        var ret = await this.$http.Get('/api/services/app/User/Get', {
          id: id
        });
        if (ret.success) {
          this.detailinfo = ret.result;
        }
      },
      async getlist() {
        var ret = await this.$http.Get('/api/services/app/User/GetAll', this.params);
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
        var ret = await this.$http.Put('/api/services/app/User/Update', this.detailinfo);
        if (ret.success) {
          this.$message.success('更新成功');
          this.editshow = false;
          this.getlist();
        }
      }
    }
  }

</script>
