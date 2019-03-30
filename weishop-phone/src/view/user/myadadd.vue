<template>
    <div id="myadadd">
        <van-nav-bar title="新增邀请链接" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-cell title="代理级别" :value="agentlevelselect.name" is-link @click="selectagent" />
            <van-cell title="期限" :value="daysselect.name" is-link @click="selectdays" />
            <van-field v-model="username" required type="number" label="使用次数"  placeholder="请输入使用次数" />
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
        Field ,Button
    } from 'vant';

    Vue.use(Cell).use(CellGroup).use(NavBar).use(Actionsheet).use(Field ).use(Button);

    export default {
        data() {
            return {
                agentshow: false,
                dayshow: false,
                agentlist: [{
                    name: '三级',
                    value: 3
                }, {
                    name: '二级',
                    value: 2
                }, {
                    name: '一级',
                    value: 1
                }],
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
                    name: '三级',
                    value: 3
                },
                info: {
                    agentlevel: 0,
                    days: 0,
                    count: 0
                }
            }
        },
        methods: {
            onSubmit(){},
            onClickLeft() {
                this.$router.go(-1)
            },
            selectagent() {
                this.agentshow = true;
            },
            selectdays() {
                this.dayshow = true;
            },
            onSelect(val) {
                this.agentlevelselect = val;
                this.info.agentlevel = val.value;
                this.agentshow = false;

            },
            onCancel() {
                this.agentshow = false;
            },
            onSelect2(val) {
                this.daysselect = val;
                this.info.days = val.value;
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