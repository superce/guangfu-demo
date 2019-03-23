<template>
  <div class="live-detail">
    <div class="live">
      <div id="de" :class="{'detail' : !setHeight,'detail-height' : setHeight,'detail-height' : liveD.newslist == ''}">
        <div class="top">
          <img src="../assets/images/guangfu.jpg" alt="">
          <router-link to="/down-load">打开</router-link>
        </div>
         <div class="banner">
        <!-- {{  hideBox }} -->
          <img v-lazy="liveD.topic.image">
          <div class="ban">
            <p>{{ liveD.topic.content }}</p>
            <div class="span">
              <span v-for="(tab,index) in liveD.tags" :key="index">{{ tab.item2 }}</span>
            </div>
          </div>
        </div>
        <Loading v-if="loading"/>
        <div class="puclic" v-for="(tag,index) in liveD.tags" :key="index" v-if="liveD.newslist != ''">
          <div class="h4">
            <h4>{{ tag.item2 }}</h4>
          </div>
          <ul class="list">
            <li v-for='(list,index) in liveD.newslist' :key='index'>
              <router-link :to="{name:'DetailNews',params:{id:list.id,icon:list.headImg}}" v-if="tag.item1 == list.tagid">
                <div class="left">
                <h6>{{ list.title }}</h6>
                <p><span class="see">{{ list.source }}</span><span class="data">{{ timeFn(list) }}</span></p>
                </div>
                <div class="right">
                  <img v-lazy="list.headimg" :alt="list.title">
                </div>
              </router-link>
              <router-link :to="{name:'DetailNews',params:{id:list.id,icon:list.headImg}}" v-else>
                <div class="left">
                <h6>{{ list.title }}</h6>
                <p><span class="see">{{ list.source }}</span><span class="data">{{ timeFn(list) }}</span></p>
                </div>
                <div class="right">
                  <img v-lazy="list.headimg" :alt="list.title">
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="more" v-if="liveD.newslist != ''">
        <More class="down" @get='height' v-if="!setHeight"/>
      </div>
    </div>
    <router-link to="/down-load" :class="{'app' : !setHeight, 'app2' : setHeight}"  v-if="liveD.newslist != ''">{{ open }}</router-link>
  </div>
</template>
<script>
import More from './more'
import axios from 'axios'
import Loading from './Loading'
  export default {
    components:{
      More,Loading
    },
    name:'liveDetail',
    data (){
      return{
        loading:true,
        open:"打开app阅读全文",
        setHeight:false,
        liveD:''
      }
    },
    created(){
      this.getLiveDetail()
    },
    watch:{
      "$route" : "getLiveDetail"
    },
    methods:{
      height(){
        this.setHeight = !this.setHeight
        this.open = '下载一起光伏，阅读更佳'
      },
      getLiveDetail(){
        let data = this.$route.params.id
        let date = new Date(new Date()).getTime();
        let getNewsListUrl = 'https://api.dltoutiao.com/api/News/TopicNews'
        axios.get(getNewsListUrl,{
            headers:{
            Appid:'gf_app_android',
            Timestamp:date,
            Sign:'aaaa',
            vtoken:''
          },
          params:{
            id:data
          }
        }).then(res => {
          this.loading = false
          this.liveD = res.data.data
          console.log(res.data.data)
        }).catch(e => alert(e))
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

        if(dayDiff >= 1) return dayDiff + '天以前'
        if(hours < 24 && hours >= 1 ) return hours + '小时以前'
        if(minutes < 60 && minutes >= 1) return minutes + "分钟以前"
        if(seconds < 60 ) return '刚刚'
    }
    }
  }
</script>

<style scoped>
.live{
  position: relative;
}
  .top{
    width: 100%;
    display: flex;
    background: #f4f4f4;
    justify-content: space-between;
    padding: 0 .5rem;
    align-items: center;
    position: fixed;
    top: 0;
    box-shadow: 0 2px 2px 1px #ccc
  }
  .top img{
    width:6.45rem;
    height: 2.2rem;
  }
  .top a{
    font-size: .7rem;
    color:#3e75c7;
    border: 1px solid #3e75c7;
    border-radius: .5rem;
    padding: .2rem .5rem;
  }
  .detail{
    height: 56rem;
    overflow: hidden;
  }
  .detail-height{
    height: auto;
  }
 .banner{
    width:100%;
    margin-top: 2.3rem;
  }
  .banner .ban{
    width: 17.5rem;
    margin: 0 auto;
  }
  .banner img{
    width: 100%;
  }
  .banner p{
    font-size: .8rem;
    color:#000;
    line-height: 1.1rem;
    font-family: "Microsoft Yahei Simhei";
  }
  .span{
    display: flex;
    flex-wrap: wrap;
  }
  .banner span{
    font-size: .7rem;
    color:#333;
    border-radius: .4rem;
    border: 1px solid #000;
    margin:0 .2rem;
    margin-top: .5rem;
    padding:.1rem .3rem;
  }
.puclic{
  margin-top: 1rem;
}
.puclic .h4{
  background: #e9e9e9;
}
.puclic .h4 h4{
  width:17.5rem;
  margin: 0 auto;
  font-size: .79rem;
  color:#070707;
  line-height: 1.5rem;
  font-family: "Microsoft Yahei Simhei";
}
.list{
  width:17.5rem;
  margin: 0 auto;
}
.list li{
  padding-bottom: .3rem;
  margin-top: .5rem;
  border-bottom: 1px solid #ededed;
}
.list li:last-child{
  border-bottom: none;
}
.list li a{
  display: flex;
}
.list .left{
  width: 12rem;
}
.list .left h6{
  height: 2.1rem;
  overflow: hidden;
  font-size: .75rem;
  color:#262626;
  font-weight: normal;
}
.list .left p{
  font-size: .6rem;
  color:#acacac;
  margin-top: .7rem;
}
.list .left p .see{
  margin-right: .4rem;
}
.list .right{
  width: 5.75rem;
  height: 3.78rem;
  overflow: hidden;
}
.list .right img{
  width: 100%;
  height: 100%;
}
@keyframes down
{
  0% {bottom: .5rem}
  50% {bottom:.8rem;}
  100% {bottom:.5rem;}
}
.down{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  animation:down 1s infinite;
}
.seemore{
  /* background: #fefefe;
  height: 2.5rem; */
}
.app{
  width: 15rem;
  margin: .5rem auto;
  font-size: .8rem;
  color:#fff;
  background: #66a1fc;
  border-radius: 1rem;
  display: block;
  text-align: center;
  line-height: 1.5rem;
}
.app2{
  width: 15rem;
  margin:1rem auto;
  font-size: .8rem;
  color:#fff;
  background: #66a1fc;
  border-radius: 1rem;
  display: block;
  text-align: center;
  line-height: 1.5rem;
}
</style>
