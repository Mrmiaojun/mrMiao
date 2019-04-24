<template>
  <div class="body">
    <Head title="注册"></Head>
    <div v-if="!getCodeModalState">
      <div class="inputBox">
        <div class="title">手机号：</div>
        <input type="text" v-model="phone">
        <div class="iconfont icon-del delBtn" @click="phone=''"></div>
      </div>
      <div class="code">
        <div class="codeBox">
          <div class="title">验证码：</div>
          <input type="text" v-model="phoneCode">
        </div>
        <button class="getCode" v-on:click="openModal">获取验证码</button>
      </div>
      <div class="inputBox">
        <div class="title">设置密码：</div>
        <input type="password" v-model="userPwd">
        <div class="iconfont icon-del delBtn" @click="userPwd=''"></div>
      </div>
      <div class="btn_box">
        <button class="submit" @click="toRegister">注册</button>
        <div>
          <router-link to="/login" class="toLogin">登录账号</router-link>
        </div>
      </div>
    </div>
    <div class="modal" v-if="getCodeModalState">
      <GetCodeModal v-on:closeModal='closeModal' :phone='phone' :codeImgUrl='imgUrl'></GetCodeModal>
    </div>
  </div>
</template>

<script>
import Head from './Head'
import GetCodeModal from './GetCodeModal'
import qs from 'Qs'
export default {
  name: 'Register',
  components: {
    Head,
    GetCodeModal
  },
  data: function () {
    return {
      getCodeModalState: false,
      imgUrl: '',
      phone: '',
      phoneCode: '',
      userPwd: ''
    }
  },
  methods: {
    openModal () {
      let that=this
      if(this.phone==''){
        this.$message({
          message:'请输入电话号码',
          type:'warning'
        })
      }
      else{
        this.$http.get(process.env.api + '/loginAndRegister/getImgCode.html', {responseType: 'arraybuffer',params: {'mobile': that.phone}}).then((data) => {
        that.imgUrl='data:image/png;base64,'+btoa(
          new Uint8Array(data.data).reduce((data,type) => data+String.fromCharCode(type),'')
        )
        that.getCodeModalState = true
        }).catch((err) => {
          console.log(err)
        })
      }
      
    },
    closeModal () {
      this.getCodeModalState = false
    },
    toRegister () {
      let data={
        "mobile":this.phone,
        "password":this.userPwd,
        'code':this.phoneCode,
        "resource":'test'
        // "openid":'test',
        // "unionid":'test',
        // "nickname":'test',
        // "sex":'test',
        // "province":'test',
        // "city":'test',
        // "country":'test', 
        // "headimgurl":'test',
        // "privilege":'test',
        // "accessToken":'test'
      }
      let newdata=qs.stringify(data)
      console.log(newdata)
      this.$http.post(process.env.api +'/loginAndRegister/register',newdata)
      .then((res)=>{
        console.log(res)
        if(res.data.sccess){
          this.$message({
            message:'注册成功',
            type:'success'
          })
          this.$router.push('/login')
        }
        else{
          this.$message({
            message:'注册失败',
            type:'warning'
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
.code{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: .666667rem;
  height: 3rem;
  line-height: 3rem;
}
.codeBox{
  display: flex;
  flex-direction: row;
  color: rgb(173, 164, 164);
  border-radius: 0.8rem;
  overflow: hidden;
  background-color: #373A41;
  padding: 0 .666667rem;
  font-size: 1.2rem;
  width: 60%;
}
.codeBox>.title{
  width: auto;
  text-align: left;
}
.codeBox>input{
  border: none;
  background-color: transparent;
  width: 60%;
  font-size: 1.2rem;
  outline: none;
  color:  rgb(173, 164, 164);
}
.getCode{
  border: none;
  background-color: #3180FF;
  border-radius: 0.8rem;
  overflow: hidden;
  width: 30%;
  text-align: center;
  font-size: 0.9rem;
  color: white;
  outline: none;
}
.getCode:active{
  background-color: rgb(102, 157, 245);
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
.toLogin{
  margin: .666667rem auto;
  line-height: 1rem;
  color: #03F9E4;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}
.modal{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.74);
}
</style>
