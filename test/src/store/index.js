import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  loginState:false,
  loginPhone:'',
  loginPwd:''
}

const getters={
  isLogin(state){
    return state.loginState
  }
}
const mutations ={
  login(state,num){
    state.loginState=true
    state.loginPhone=num.phone
    state.loginPwd=num.userpwd
  },
  logout(state){
    state.loginState=false
    state.loginPhone=''
    state.loginPwd=''
  },
  showState(state){
    console.log(state.loginState)
  }
}
const actions = {
  toLogin(context,num){
    context.commit('login',num)
  },
  toLogout(context){
    context.commit('logout')
  },
  show(context){
    context.commit('showState')
  }
}
const store =new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store