<template>
  <div>
    <a-card>
      <a-tabs defaultActiveKey="1" @change="change" v-model="ctab">
        <a-tab-pane tab="团队奖金系数" key="team">
          <div class="tools">
            <a-button type="primary" @click="opennew">
              新建
            </a-button>
          </div>
          <a-table ref="table" :locale="{emptyText: '暂无数据'}" style="margin-top:20px" :columns="teamcolumns"
            :dataSource="teamlist" :loading="loading" @change="pagechange" :pagination="pagination" @expand="expand">
            <span slot="effectTime" slot-scope="text">
              <span>{{text|dateformat}}</span>
            </span>
            <span slot="failureTime" slot-scope="text">
              <span>{{text|dateformat}}</span>
            </span>
            <a-table :locale="{emptyText: '暂无数据'}" slot="expandedRowRender" :columns="teamsubcolumns"
              :dataSource="record.details" slot-scope="record" :pagination="false">
              <span slot="scale" slot-scope="text,record">
                <span>{{record.minSale}}-{{record.maxSale}}</span>
              </span>
            </a-table>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="提货奖金" key="get">
          <div class="tools">
            <a-button type="primary" @click="openoutnew">
              新建
            </a-button>
          </div>
          <a-table ref="table2" :locale="{emptyText: '暂无数据'}" style="margin-top:20px" :columns="outcolumns"
            :dataSource="outlist" :loading="loading" @change="pagechange" :pagination="pagination">
            <span slot="effectTime" slot-scope="text">
              <span>{{text|dateformat}}</span>
            </span>
            <span slot="failureTime" slot-scope="text">
              <span>{{text|dateformat}}</span>
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-modal destroyOnClose :maskClosable="false" title="新建" v-model="outnewvisible" @ok="outsave" cancelText="取消"
      okText="确认">
      <a-form v-if="outnewvisible">
        <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="提货奖金额" fieldDecoratorId="status"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入提货奖金额'}]}">
          <a-input-number v-model="newout.amout" style="width:150px;" :min="0" :max="999999" placeholder="请输入提货奖金额。" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal destroyOnClose :maskClosable="false" title="新建" v-model="teamnewvisible" @ok="teamsave" cancelText="取消"
      okText="确认">
      <a-form v-if="teamnewvisible">
        <div v-for="(item,index) in newteam" :key="index">
          <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="销售额范围" fieldDecoratorId="count"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入销售额范围。'}]}">
            <a-input-number v-model="newteam[index].minSale" style="width:150px;" :min="0" :max="999999"
              placeholder="请输入销售额范围。" />
            至
            <a-input-number v-model="newteam[index].maxSale" style="width:150px;" :min="item.minSale" :max="999999"
              placeholder="请输入销售额范围。" />
          </a-form-item>
          <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="销售额系数（%）" fieldDecoratorId="status"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入销售额系数'}]}">
            <a-input-number v-model="newteam[index].scale" style="width:150px;" :min="0" :max="100"
              placeholder="请输入销售额系数。" />
          </a-form-item>
        </div>
        <a @click="additem">添加</a>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ctab: 'team',
        teamlist: [],
        outlist: [],
        loading: false,
        teamnewvisible: false,
        outnewvisible: false,
        pagination: {
          total: 0,
        },
        newteam: [{
          maxSale: 0,
          minSale: 0,
          scale: 0,
        }],
        newout: {
          amout: 0,
        }
      }
    },
    methods: {
      change() {
        this.pagination = {
          pageSize: 10,
          current: 1,
          total: 0
        }
      },
      expand() {

      },
      pagechange(pagination) {
        this.params.maxResultCount = pagination.pageSize;
        this.params.skipCount = (pagination.current - 1) * pagination.pageSize;
        if (this.ctab === 'team') {
          this.getteamlist();
        } else {
          this.getoutlist();
        }
      },
      openoutnew() {
        this.newout = {
          amout: 0
        }
        this.outnewvisible = true;
      },

      opennew() {
        this.newteam = [{}];
        this.teamnewvisible = true;
      },
      additem() {
        this.newteam.push({
          maxSale: 0,
          minSale: 0,
          scale: 0,
        })
      },
      async outsave() {
        if (!this.newout.amout) {
          this.$message.error('请填写提货奖金额。');
          return;
        }
        var ret = await this.$http.Post('/api/services/app/B_OrderOutBonus/Create', this.newout);
        if (ret.success) {
          this.outnewvisible = false;
          this.getoutlist();
        }
      },
      async teamsave() {
        for (var i in this.newteam) {
          if (!this.newteam[i].minSale) {
            this.$message.error('请填写销售额范围。');
            return;
          }
          if (!this.newteam[i].maxSale) {
            this.$message.error('请填写销售额范围。');
            return;
          }
          if (!this.newteam[i].scale) {
            this.$message.error('请填写销售额系数。');
            return;
          }
        }
        var ret = await this.$http.Post('/api/services/app/B_TeamSaleBonus/Create', {
          details: this.newteam
        });
        if (ret.success) {
          this.teamnewvisible = false;
          this.getteamlist();
        }
      },
      async getteamlist(id) {
        this.loading = true;
        var ret = await this.$http.Get('/api/services/app/B_TeamSaleBonus/GetList', this.params)
        this.loading = false
        if (ret.success) {
          this.teamlist = ret.result.items;
          this.pagination.total = ret.result.totalCount;
        }
      },
      async getoutlist(id) {
        this.loading = true;
        var ret = await this.$http.Get('/api/services/app/B_OrderOutBonus/GetList', this.params)
        this.loading = false
        if (ret.success) {
          this.outlist = ret.result.items;
          this.pagination.total = ret.result.totalCount;
        }
      },
    },
    mounted() {
      this.getteamlist();
      this.getoutlist();
    },
    computed: {
      outcolumns() {
        var vm = this;
        return [{
          title: '提货奖金额',
          dataIndex: 'amout'
        }, {
          title: '生效时间',
          dataIndex: 'effectTime',
          scopedSlots: {
            customRender: 'effectTime'
          },
        }, {
          title: '失效时间',
          dataIndex: 'failureTime',
          scopedSlots: {
            customRender: 'failureTime'
          },
        }, {
          title: '操作人',
          dataIndex: 'createUserName',
        }, ]
      },
      teamcolumns() {
        var vm = this;
        return [{
          title: '生效时间',
          dataIndex: 'effectTime',
          scopedSlots: {
            customRender: 'effectTime'
          },
        }, {
          title: '失效时间',
          dataIndex: 'failureTime',
          scopedSlots: {
            customRender: 'failureTime'
          },
        }, {
          title: '操作人',
          dataIndex: 'creatorUserName'
        }, ]
      },
      teamsubcolumns() {
        var vm = this;
        return [{
          title: '销售额范围（元）',
          scopedSlots: {
            customRender: 'scale'
          },
        }, {
          title: '系数（%）',
          dataIndex: 'scale'
        }, ]
      },
    }
  }

</script>

<style>

</style>
