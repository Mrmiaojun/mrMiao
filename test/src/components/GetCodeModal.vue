<template>
  <div class="box">
    <div class="head">
      请输入验证码
      <i @click="cancel">&times;</i>
    </div>
    <div class="body">
      <input type="text" v-model="imgCode">
      <img :src="codeImgUrl" alt="test">
    </div>
    <div class="foot">
      <div @click="btnOk">确认</div>
      <div @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
import qs from 'Qs'
export default {
  name: 'GetCodeModal',
  props: ['codeImgUrl','phone'],
  data: function () {
    return {
      imgUrl: 'data:image/jpeg;base64,',
      imgCode: ''
    }
  },
  methods: {
    btnOk () {
      let that=this
      let data={
        "mobile":that.phone,
        "type":'1',
        'imageCode':that.imgCode
      }
      let newData=qs.stringify(data)
      console.log('data-----------',newData)
      if(this.imgCode){
        this.$http.post(process.env.api+'/loginAndRegister/getSmsCode',newData)
        .then((res)=>{
          if(res.data.code==1){
            this.$emit('closeModal')
          }
          else if(res.data.code=='-1'){
            alert('参数错误')
          }
          else if(res.data.code=='-2'){
            alert('手机号码格式错误')
          }
          else if(res.data.code=='-3'){
            alert('手机号码不存在')
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
      else{
        alert('请输入验证码！')
      }
    },
    cancel () {
      this.$emit('closeModal')
    }
  },
  created () {
  },
  computed: {
  }
}
</script>
<style scoped>
.box{
  height: 25vh;
  width: 80vw;
  background-color: #20212A;
  color: #7E829C;
  margin: 50vh auto 0;
}
.head{
  height: 3rem;
  text-align: center;
  font-size: 0.9rem;
  line-height: 3rem;
  position: relative;
}
.head>i{
  position: absolute;
  font-size: 1.5rem;
  top: 0;
  right: 1.5rem;
}
.body{
  padding: 0 0.8rem;
  height: 2.6rem;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.body>input{
  border: none;
  border-radius: 0.4rem;
  background-color: #17191E;
  width: 60%;
  height: 100%;
  outline: none;
  font-size: 1.2rem;
  color: rgb(173, 164, 164);
}
.body>img{
  height: 100%;
  width: 30%;
  height: 2.6rem;
  line-height: 2.6rem;
  vertical-align: middle;
}
.foot{
  line-height: 3rem;
  margin: 1rem 0;
}
.foot>div{
  float: right;
  width: 4rem;
  text-align: center;
}
</style>
