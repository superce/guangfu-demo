<template>
  <div>
    <lunBo class="lunbo" />
    <div class="live-content" >
      <div class="content">
        <h5>直播回顾</h5>
        <span></span>
      </div>
        <ul class="list">
          <li v-for="(list,index) in dataMsg" :key="index">
            <router-link :to="{name:'liveDetail',params:{id:list.id}}">
              <div class="left">
              <h6>{{ list.title }}</h6>
              <p>
                <!-- 回顾 -->
                <span class="see">回顾</span>
                <span class="data">{{ timeFn(list) }}</span>
              </p>
              </div>
              <div class="right">
                <img v-lazy="list.headImg" :alt="list.title">
              </div>
            </router-link>
          </li>
        </ul>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>
<script>
  import Loading from './Loading'
  import lunBo from './lunBo.vue'
  import axios from 'axios'
  export default {
    components:{
      lunBo,
      Loading,
    },
    name:'liveBroad',
    data (){
      return {
        max:'',
        min:'',
        REQS:true,
        loading: true,
        dataMsg:''
      }
    },
  created(){
    this.getLiveList()
  },
  mounted(){
    window.addEventListener('scroll',this.gundong)
  },
  beforeDestroy(){
    window.removeEventListener("scroll",this.gundong)
  },
  methods:{
    getLiveList(){
      let date = new Date(new Date()).getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/News/GetNewsList'
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            'channelid':1003,
            'isUp':1,
            'maxid':0,
            'minid':0,
            'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
            'pagesize':10
          }
        })
        .then(res => {
          this.dataMsg = res.data.data.items
          this.loading = false
          this.max = res.data.data.minid
          this.min = this.max - 10          
        })
        .catch(e => alert('新闻加载失败'))
    },
    gundong(){
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      let wHeight = window.innerHeight 
      let scrollHeight = document.body.scrollHeight
      if(scrollTop + wHeight >= scrollHeight - 50 && this.REQS == true){
          this.loading = true
          this.REQS = false
          let date = new Date(new Date()).getTime();
          let getNewsListUrl = 'https://api.dltoutiao.com/api/News/GetNewsList'
          axios.get(getNewsListUrl,{
              headers:{
              Appid:'gf_app_android',
              Timestamp:date,
              Sign:'aaaa',
              vtoken:''
            },
              params:{
                'channelid':1003,
                'isUp':1,
                'maxid':this.max,
                'minid':this.min,
                'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
                'pagesize':10
              }
            })
            .then(res => {
              this.REQS = true
              this.loading = false
              let arr = res.data.data.items
              for(var i = 0;i<arr.length;i++){
                this.dataMsg.push(arr[i])
              }
              this.max = res.data.data.minid
              this.min = this.max - 10              
            })
            .catch(e => {
              this.loading = false
              this.REQS = false
            })
      }

    },
     timeFn(time) {
        //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
        var dateBegin = new Date(time.indate.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateEnd = new Date();//获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))//计算出小时数
        //计算相差分钟数
        var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
        // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
        //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");

        if(minutes < 1 ) return '刚刚'
        if(minutes < 60 && minutes > 1) return minutes + "分钟以前"
        if(hours < 24 && hours >1 ) return hours + '小时以前'
        if(dayDiff > 1) return dayDiff + '天以前'
    }
  }
}
</script>
<style scoped>
.live-content {
  width: 17.5rem;
  margin: 0 auto;
}
.live-content .content{
  display: flex;
  align-items: center;
  margin:.5rem 0;
}
.live-content h5{
  font-size: .7rem;
  color:#a8a8a8;
  flex-grow: 1;
}
.content span{
  width:14rem;
  height: .05rem;
  border-top: .05rem solid #a8a8a8;
}
.live-content .list li{
  padding-bottom: .3rem;
  margin-top: .5rem;
  border-bottom: 1px solid #ededed;
}
.live-content .list li a{
  display: flex;
}
.live-content .list .left{
  width: 12rem;
}
.live-content .list .left h6{
  font-weight: normal;
  max-height: 2.2rem;
  overflow: hidden;
  font-size: .8rem;
  color:#242424;
}
.live-content .list .left p{
  font-size: .6rem;
  color:#acacac;
  margin-top: .5rem;
}
.live-content .list .left p .see{
  border:1px solid #acacac;
  border-radius: .2rem;
  padding:0 .2rem;
  margin-right: .2rem;
}
.live-content .list .right{
  width: 5.75rem;
  height: 3.5rem;
}
.live-content .list .right img{
  width: 100%;
  height: 100%;
}
.wc-pagination{
  justify-content: flex-end;
}
</style>
