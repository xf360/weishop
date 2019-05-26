<template>
    <div id="myadadd">
        <van-nav-bar title="新增邀请链接" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell title="代理等级" :value="agentlevelselect.name" is-link @click="selectagent" />
            <!-- <van-cell title="期限" :value="daysselect.name" is-link @click="selectdays" />
            <van-field v-model="info.availableCount" required type="number" label="使用次数"  placeholder="请输入使用次数" /> -->
        </van-cell-group>
        <van-actionsheet v-model="agentshow" :actions="agentlist" cancel-text="取消" @select="onSelect"
            @cancel="onCancel" />
        <van-actionsheet v-model="dayshow" :actions="dayslist" cancel-text="取消" @select="onSelect2"
            @cancel="onCancel2" />
<div class="loginbt">
            <van-button block type="primary"  @click="onSubmit">确认</van-button>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        Cell,
        CellGroup,
        Actionsheet,
        Field ,Button,Toast
    } from 'vant';

    Vue.use(Cell).use(Toast).use(CellGroup).use(NavBar).use(Actionsheet).use(Field ).use(Button);

    export default {
        data() {
            return {
                agentshow: false,
                dayshow: false,
                agentlist: [],
                dayslist: [{
                    name: '一天',
                    value: 1
                }, {
                    name: '一周',
                    value: 7
                }, {
                    name: '一月',
                    value: 30
                }],
                daysselect: {
                    name: '一天',
                    value: 1
                },
                agentlevelselect: {
                    name: '请稍等...',
                    id: ''
                },
                info: {
                    agencyLevel: '',
                    validityDataType: 30,
                    availableCount: 999,
                    url:'d'
                }
            }
        },
        mounted(){
            this.getagentlevel();
        },
        methods: {
            async onSubmit(){
                if(this.info.availableCount<=0){
                    Toast.fail('期限必须大于0');
                    return
                }
                var ret= await this.$http.Post('/api/services/app/B_InviteUrl/Create',this.info);
                if(ret.success){
                    Toast.success('添加成功');
                    this.$router.push('/myad')
                }
            },

            onClickLeft() {
                this.$router.go(-1)
            },
            async getagentlevel(){
                var ret=await this.$http.Get('/api/services/app/B_AgencyLevel/GetList',{
                    MaxResultCount:999,
                    SkipCount:0
                })
                if(ret.success){
                this.agentlist=ret.result.items;
                this.agentlevelselect=this.agentlist[0]
                this.info.agencyLevel=this.agentlist[0].id
                }
            },
            selectagent() {
                this.agentshow = true;
            },
            selectdays() {
                this.dayshow = true;
            },
            onSelect(val) {
                this.agentlevelselect = val;
                this.info.agencyLevel = val.id;
                this.agentshow = false;

            },
            onCancel() {
                this.agentshow = false;
            },
            onSelect2(val) {
                this.daysselect = val;
                this.info.validityDataType = val.value;
                this.dayshow = false;

            },
            onCancel2() {
                this.dayshow = false;
            },
        }
    }
</script>
<style>
    .loginbt {
        margin: auto;
        padding: 20px;
        text-align: center;
    }
</style>