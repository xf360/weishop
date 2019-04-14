<template>
  <!-- 等级金额 -->
  <div>
    <a-card>
      <a-table style="margin-top:20px" bordered :columns="columns" :rowKey="record => record.id" :dataSource="data"
        :loading="loading">
        <template slot="first" slot-scope="text, record">
          <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e.target.value, record.id,'name4')" />
          <template v-else>{{text}}</template>
        </template>
        <template slot="name5" slot-scope="text, record">
          <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e.target.value, record.id,'name5')" />
          <template v-else>{{text}}</template>
        </template>
        <template slot="name6" slot-scope="text, record">
          <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e.target.value, record.id,'name6')" />
          <template v-else>{{text}}</template>
        </template>
        <template slot="name7" slot-scope="text, record">
          <a-input  v-if="record.editable" style="margin: -5px 0" :value="text"
            @change="e => handleChange(e.target.value, record.id,'name7')" />
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
        data: [{
          id: 1,
          name1: '金牌',
          name3: '一级',
          name4: 20,
          name5: 300,
          name6: 2,
          name7: 80
        }],
        loading: false,
        columns: [{
          title: '等级',
          dataIndex: 'name1'
        }, {
          title: '层级',
          dataIndex: 'name3'
        }, {
          title: '首充金额',
          dataIndex: 'name4',
          scopedSlots: {
            customRender: 'first'
          },
        }, {
          title: '保证金',
          dataIndex: 'name5',
          scopedSlots: {
            customRender: 'name5'
          },
        }, {
          title: '推荐奖',
          dataIndex: 'name6',
          scopedSlots: {
            customRender: 'name6'
          },
        }, {
          title: '进货折扣',
          dataIndex: 'name7',
          scopedSlots: {
            customRender: 'name7'
          },
        }, {
          title: '操作',
          key: 'action',
          dataIndex: 'name12',
          scopedSlots: {
            customRender: 'action'
          },
        }]
      }
    },
    methods: {
      handleChange(value, key, column) {
        debugger;
        const newData = [...this.data]
        const target = newData.filter(item => key === item.id)[0]
        if (target) {
          target[column] = value
          this.data = newData
        }
      },
      save() {
      },
      edit(row) {
        const newData = [...this.data]
        const target = newData.filter(item => row.id === item.id)[0]
        if (target) {
          target.editable = true
          this.data = newData
        }
      },
      cancel(row) {
        const newData = [...this.data]
        const target = newData.filter(item => row.id === item.id)[0]
        if (target) {
          delete target.editable
          this.data = newData
        }
      },
      async loadlist() {
        this.loading = true
        //var ret=await this.$http.Get('/api/services/app/User/Get',{id:1})
        this.loading = false
      },

    }
  }

</script>
