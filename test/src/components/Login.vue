<template>
  <div class="body">
    <Head title="登录"></Head>
    <div class="inputBox">
      <div class="title">手机号：</div>
      <input type="text" v-model="phone">
      <div class="iconfont icon-del delBtn" @click="phone=''"></div>
    </div>
    <div class="inputBox">
      <div class="title">密码：</div>
      <input type="text" v-model="userpwd">
      <div class="iconfont icon-del delBtn" @click="userpwd=''"></div>
    </div>
    <button class="submit" @click="toLogin">登录</button>
  </div>
</template>

<script>
import Head from './Head'
import qs from 'Qs'
import {Message} from 'element-ui'
export default {
  name: 'Login',
  components: {
    Head
  },
  data: function(){
    return {
      phone:'',
      userpwd:''
    }
  },
  methods: {
    toLogin() {
      let data={
        "mobile":this.phone,
        "password":this.userpwd,
        "clientId":"test",
        "imgCode":'1234'
      }
      data=qs.stringify(data)
      let that=this
      this.$http.post(process.env.api+'/loginAndRegister/mobileLogin',data)
      .then((res)=>{
        if(res.data.code==1){
          this.$store.dispatch('toLogin',{phone:this.phone,userpwd:this.userpwd})
          this.$router.push('/quotation')
        }
        else if(res.data.code=='-1'){
          Message({
            message:'参数错误',
            type:'error'
          })
        }
        else if(res.data.code=='-2'){
          Message({
            message:'登录失败，账号或者密码错误！',
            type:'error'
          })
        }
        else if(res.data.code=='-3'){
          Message({
            message:'还未注册',
            type:'error'
          })
        }
        else if(res.data.code=='-4'){
          Message({
            message:'登录错误超次数',
            type:'error'
          })
        }
        else if(res.data.code=='-5'){
          Message({
            message:'图形验证码错误',
            type:'error'
          })
        }
        else if(res.data.code=='-6'){
          Message({
            message:'图形验证码未填写',
            type:'error'
          })
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.inputBox{
  height: 3rem;
  display: flex;
  flex-direction: row;
  line-height: 3rem;
  font-size: 1.2rem;
  color: rgb(173, 164, 164);
  border-radius: 0.8rem;
  overflow: hidden;
  background-color: #373A41;
  justify-content: space-around;
  padding: 0 .666667rem;
  margin: .666667rem;
}
.inputBox>.title{
  /* width: 7rem; */
  width: auto;
  text-align: left;
}
.inputBox>input{
  border: none;
  background-color: transparent;
  width: 60%;
  font-size: 1.2rem;
  outline: none;
  color:  rgb(173, 164, 164);
}
.inputBox>.delBtn{
  text-align: center;
  font-size: 1.2rem;
}
.submit{
  height: 3rem;
  width: calc(100% - 1.333333rem);
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  border: .266667rem solid #4C5059;
  background-color: #01FFEA;
  color: black;
  outline: none;
}
.submit:active{
  background-color: rgb(13, 192, 177);
}
</style>
