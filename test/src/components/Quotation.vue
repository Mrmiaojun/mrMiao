<template>
  <div class="content">
    <Head title="订阅"></Head>
    <div class="body">
      <div class="item" v-for="(item,index) in thisList" :key='index'>
      <div>{{item.commodity_name}}</div>
      <div @click='Subscribe(item.security_type,item.commodity_no)'>订阅</div>
    </div>
    </div>
  </div>
</template>

<script>
import qs from'Qs'
import Head from './Head'
export default {
  name: 'Quotation',
  components:{Head},
  data: function() {
    return {
      limit_sub_list:[],
      commodity_list:[],
      thisList:[],
      socket:null
    }
  },
  created(){
    let that=this
    if(this.$store.state.loginState){
      let loginData={
      'method':'req_login',
      'req_id':'1231',
      'data':{
        'user_name':this.$store.state.loginPhone,
        'password':this.$store.state.loginPwd,
        // 'user_name':'chenlin',
        // 'password':'a123456',
        'protoc_version':'2.2',
        }
      }
      let getListData={
      'method':'req_commodity_list',
      'req_id':'1232',
      'data':{}
      }

      let socket =new WebSocket('ws://quote.vs.com:8888/')
      socket.onopen=function(data){
        socket.send(JSON.stringify(loginData))
        socket.send(JSON.stringify(getListData))
      }
      socket.onmessage=function(event){
        let newData=JSON.parse(event.data).data
        // console.log(event.data)
        if(newData.limit_sub_list){
          that.limit_sub_list=newData.limit_sub_list
        }
        if(newData.commodity_list){
          that.commodity_list=newData.commodity_list
          that.getThisList()
          socket.close()
        }
      }
      socket.onerror=function(err){
        console.log(err)
      }
      socket.onclose=function(data){
        console.log('关闭连接')
      }
    }
    else{
      this.$router.push('/login')
    }
  },
  methods:{
    getThisList(){
      let list1=this.limit_sub_list
      let list2=this.commodity_list
      for(let i =0;i<list1.length;i++){
        let strArr=list1[i].split('_')
        for(let j=0;j<list2.length;j++){
          if(list2[j].security_type==strArr[0]&&list2[j].commodity_no==strArr[1]){
            this.thisList.push(list2[j])
          }
        }
      }
    },
    Subscribe(str1,str2) {
      let str=str1+'_'+str2
      let name=''
      for(let i=0;i<this.commodity_list.length;i++){
        if(str1==this.commodity_list[i].security_type&&str2==this.commodity_list[i].commodity_no){
          name=this.commodity_list[i].commodity_name
        }
      }
      this.$router.push({
        name:'details',
        params:{contract:str,name:name}
      })
    }
  },
  distroyed() {
    this.socket.close()
  }
}
</script>

<style scoped>
.body{
  border: .013333rem solid rgba(255, 255, 255, 0);
  overflow: scroll;
  height: calc(100% - 3rem);
  margin-top: 1.5rem;
}
.content{
  height: 100%;
}
.item{
  height: 3rem;
  border: .013333rem solid black;
  display: flex;
  flex-direction: row;
  margin: .16rem 0;
  line-height: 3rem;
}
.item>div{
  width: 50%;
  text-align: center;
}
</style>
