<template>
  <div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <div v-if="goods.length>0">
        <!-- <van-checkbox class="card-goods__item" v-for="item in goods" :key="item.id" :name="item.id"> -->
        <carditem @countchange="countchange" v-for="item in goods" :key="item.id" :title="item.name" :desc="item.spe"
          :count="item.number" :id="item.id" :price="item.price" :thumb="api+'api/AbpFile/Show?id='+item.file.id" />
        <!-- </van-checkbox> -->
      </div>
      <center v-else>购物车为空</center>

    </van-checkbox-group>
    <van-submit-bar :price="totalPrice" button-text="结算" @submit="onSubmit" style="bottom:50px" />
  </div>
</template>

<script>
  import {
    Checkbox,
    CheckboxGroup,
    Card,
    SubmitBar,
    Toast
  } from 'vant';
  import carditem from './carditem.vue'
  export default {
    components: {
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [SubmitBar.name]: SubmitBar,
      [CheckboxGroup.name]: CheckboxGroup,
      carditem
    },

    data() {
      return {
        totalPrice:0,
        api:this.$http.api,
      };
    },

    computed: {
      goods() {
        return this.$store.getters.goods;
      },
    },
    mounted() {
      this.gettotalPrice();
    },
    methods: {
      gettotalPrice(){
        var total = 0;
        for (var i in this.goods) {
          total += (this.goods[i].number *this.goods[i].price)
        }
        this.totalPrice=total*100;
      },
      countchange(id, count, price) {
        this.$store.commit('changecount', {
          id: id,
          count: count
        });
       this.gettotalPrice();
      },
      onSubmit() {
        this.$router.push('/index/jiesuan')
      }
    },
  };
</script>

<style lang="less">
  .card-goods {
    padding: 10px 0;
    background-color: #fff;

    &__item {
      position: relative;
      background-color: #fafafa;

      .van-checkbox__label {
        width: 100%;
        height: auto; // temp
        padding: 0 10px 0 15px;
        box-sizing: border-box;
      }

      .van-checkbox__icon {
        top: 50%;
        left: 10px;
        z-index: 1;
        position: absolute;
        margin-top: -10px;
      }

      .van-card__price {
        color: #f44;
      }
    }
  }
</style>