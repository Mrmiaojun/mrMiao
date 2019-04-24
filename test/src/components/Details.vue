<template>
  <div>
    <Head title="详情数据"></Head>
    <div class="content">
      <div class="item">
        <div class="name">合约</div>
        <div class="val">{{name}}</div>
      </div>
      <!-- <div class="item">
        <div class="name">刷新时间</div>
        <div class="val">{{pageData[1]}}</div>
      </div> -->
      <div class="item">
        <div class="name">当日开盘</div>
        <div class="val">{{pageData[2]}}</div>
      </div>
      <div class="item">
        <div class="name">最新</div>
        <div class="val" style="color:#D24670;">{{pageData[3]}}</div>
      </div>
      <div class="item">
        <div class="name">当日最高</div>
        <div class="val" style="color:#D24670;">{{pageData[4]}}</div>
      </div>
      <div class="item">
        <div class="name">当日最低</div>
        <div class="val" style="color:#5EE762;">{{pageData[5]}}</div>
      </div>
      <div class="item">
        <div class="name">成交量</div>
        <div class="val">{{pageData[6]}}</div>
      </div>
      <div class="item">
        <div class="name">持仓</div>
        <div class="val">{{pageData[7]}}</div>
      </div>
      <div class="item">
        <div class="name">现量</div>
        <div class="val">{{pageData[8]}}</div>
      </div>
      <div class="item">
        <div class="name">昨收盘</div>
        <div class="val">{{pageData[9]}}</div>
      </div>
      <div class="item">
        <div class="name">买价</div>
        <div class="val" style="color:#5EE762;">{{pageData[13]}}</div>
      </div>
      <div class="item">
        <div class="name">卖价</div>
        <div class="val" style="color:#5EE762;">{{pageData[11]}}</div>
      </div>
      <div class="item">
        <div class="name">卖量</div>
        <div class="val">{{pageData[12]}}</div>
      </div>
      <div class="item">
        <div class="name">昨结算</div>
        <div class="val">{{pageData[10]}}</div>
      </div>
      <div class="item">
        <div class="name">买量</div>
        <div class="val">{{pageData[14]}}</div>
      </div>
      <div class="item">
        <div class="name" style="color:#D5BF49;">更多数据<br>正在计算</div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from './Head'
export default {
  name: 'Details',
  components: {
    Head
  },
  data:function(){
    return{
      pageData:'',
      name:'',
      socket:null
    }
  },
  methods: {
    closeSocket(socket){
      socket.close()
    }
  },
  created(){
    let str=this.$route.params.contract
    let name=this.$route.params.name
    let that=this
    this.name=name
    console.log(str,name)
    let socket =new WebSocket('ws://quote.vs.com:8888/')
    socket.onopen=function(data){
      socket.send(JSON.stringify({
        'method':'req_subscribe',
        'req_id':'1232',
        'data':{
          'contract_list':[str]
        }
      }))
    }
    socket.onmessage=function(event){
      let newData=JSON.parse(event.data).data
      console.log(newData)
      if(newData instanceof Array){
      that.pageData=newData 
      }
    }
    socket.onerror=function(err){
      console.log(err)
    }
    socket.onclose=function(data){
      console.log('关闭了详情页面的连接')
    }
    // window.addEventListener('beforeunload',this.closeSocket(socket))
  },
  distroyed(){
    // window.removeEventListener('beforeunload',this.closeSocket(socket))
  }
}

</script>
<style scoped>
.item{
  min-height:4rem;
  width:calc(23.5% - .2rem);
  margin: .266667rem 3%;
  float: left;
  padding: 0 0 0 15px;
  background-color:  #4b4b4d;
  border-radius: .333333rem;  
}
.item>.name{
  font-size: 12px;
  text-align: left;
  color: rgb(185, 185, 185);
  line-height: 2rem;
}
.item>.val{
  text-align: left;
  line-height: 2rem;
  font-size: 14px;
}
.content{
  padding-top: 1.5rem;
}
</style>