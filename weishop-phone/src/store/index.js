import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/fetch'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        cart: [],
        count:0,
        loginInfo:{},
        cartaddress:null,
    },
    actions: {
        // 获取用户信息
        getCurrentLoginInformations(context) {
            http.Get('/api/services/app/Session/GetCurrentLoginInformations').then(function (data) {
                if (data.success) {
                    context.commit('setuser', data.result)
                }
            })
        },
        //
        // getaddress(context,userid){
        //     http.Get('/api/services/app/B_MyAddress/GetList',{
        //         UserId:userid,
        //         IsDefault:true,
        //     }).then(function (data) {
        //         if (data.success&&data.result.items.length>0) {
        //             context.commit('setaddress', data.result.items[0])
        //         }
        //     })
        // }
    },
    mutations: {
        setuser(state, loginInfo) {
            state.loginInfo = loginInfo
        },
        setaddress(state,address){
            state.cartaddress=address;
        },
        addgood(state, good) {
            var has = state.cart.filter((item) => item.id === good.id)[0]
            if (has) {
                has = good
            } else {
                state.cart.push(good)
            }
            state.count=0;
            for(var i in state.cart){
                state.count=state.count+state.cart[i].number
            }

        },
        changecount(state, obj) {
            var has = state.cart.filter((item) => item.id === obj.id)[0];
            if (has) {
                has.number = obj.count;
            }
            state.count=0;
            for(var i in state.cart){
                state.count=state.count+state.cart[i].number
            }
        },
        remove(state,id){
            for(var i in state.cart){
                if(state.cart[i].id===id){
                    state.cart.splice(i,1);
                }
            }
            state.count=0;
            for(var j in state.cart){
                state.count=state.count+state.cart[j].number
            }
        }
    },
    getters: {
        
        goods: state => {
            return state.cart;
        },
       address:state=>{
           return state.cartaddress;
       },
       user:state=>{
        return state.loginInfo.user?state.loginInfo.user:{};
    },
    }
})