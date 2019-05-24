<template>
  <!-- 等级金额 -->
  <div>
    <a-card>
      <a-table :locale="{emptyText: '暂无数据'}" style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list"
        :loading="loading" @change="pagechange"  :pagination="pagination">
        <template slot="first" slot-scope="text, record">
          <a-input-number :min="0" :max="99999" v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e, record.id,'firstRechargeAmout')" />
          <template v-else>{{text}}</template>
        </template>
        <template slot="name5" slot-scope="text, record">
          <a-input-number :min="0" :max="99999" v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e, record.id,'deposit')" />
          <template v-else>{{text}}</template>
        </template>
        <template slot="name6" slot-scope="text, record">
          <a-input-number :min="0" :max="99999" v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e, record.id,'recommendAmout')" />
          <template v-else>{{text}}</template>
        </template>
        <template slot="name7" slot-scope="text, record">
          <a-input-number :min="0" :max="1" :precision="4" :step="0.1" v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e, record.id,'discount')" />
          <template v-else>{{text}}</template>
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="!record.editable" href="javascript:;" @click="edit(record)">编辑</a>
          <div v-else>

            <a href="javascript:;" @click="cancel(record)"> 取消 </a>
            <a href="javascript:;" @click="save(record)"> 保存 </a>
          </div>
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectid: null,
        list:[],
        pagination:{},
        params:{
          maxResultCount:10,
          skipCount:0,
          name:null,
          searchKey:null,
        },
        loading: false,
        columns: [{
          title: '等级',
          dataIndex: 'name'
        }, {
          title: '层级',
          dataIndex: 'level'
        }, {
          title: '首充金额',
          dataIndex: 'firstRechargeAmout',
          scopedSlots: {
            customRender: 'first'
          },
        }, {
          title: '保证金',
          dataIndex: 'deposit',
          scopedSlots: {
            customRender: 'name5'
          },
        }, {
          title: '推荐奖',
          dataIndex: 'recommendAmout',
          scopedSlots: {
            customRender: 'name6'
          },
        }, {
          title: '进货折扣',
          dataIndex: 'discount',
          scopedSlots: {
            customRender: 'name7'
          },
        }, {
          title: '操作',
          key: 'action',
          scopedSlots: {
            customRender: 'action'
          },
        }]
      }
    },
    mounted(){
      this.loadlist();
    },
    methods: {
      handleChange(value, key, column) {
        const newData = [...this.list]
        const target = newData.filter(item => key === item.id)[0]
        if (target) {
          target[column] = value
          this.list = newData
        }
      },
      async save(row) {
        var ret=await this.$http.Put('/api/services/app/B_AgencyLevel/Update',row);
        if(ret.success){
          this.loadlist();
          this.cancel(row);
        }
      },
      edit(row) {
        const newData = [...this.list]
        const target = newData.filter(item => row.id === item.id)[0]
        if (target) {
          target.editable = true
          this.list = newData
        }
      },
      cancel(row) {
        const newData = [...this.list]
        const target = newData.filter(item => row.id === item.id)[0]
        if (target) {
          delete target.editable
          this.list = newData
        }
      },
      pagechange(page){
        this.params.maxResultCount=page.pageSize;
        this.params.skipCount=(page.current-1)*page.pageSize;
        this.loadlist();
      },
      async loadlist() {
        this.loading=true;
        var ret=await this.$http.Get('/api/services/app/B_AgencyLevel/GetAmoutListAsync',this.params)
        this.loading=false
        if(ret.success){
          this.list=ret.result.items;
        }
      },

    }
  }

</script>
