<template>
<div>
  <div class="hot-rec">
    <h5>热门推荐</h5>
    <ul>
      <li v-for="(hot,index) in hotRec" :key="index">
        <div class="li" v-if="hot.showTempate == 0 && hot.user == null && hot.imageList != ''">
            <div class="left">
              <router-link :to="{name:'DetailNews',params:{id:hot.id,icon:hot.headImg}}">
                <p>{{ hot.title }}</p>
              </router-link>
              <div class="tab">
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqi21.guangfu&ckey=CK1375908563872" class="openapp">打开APP</a>
                <span class="margin">{{ hot.source }}</span>
                <span>{{ timeFn(hot) }}</span>
              </div>
            </div>
            <div class="right">
              <router-link :to="{name:'DetailNews',params:{id:hot.id,icon:hot.headImg}}">
                <img v-lazy="hot.imageList" />
              </router-link>
            </div>
        </div>
        <div v-else-if="hot.showTempate == 3 && hot.user == null && hot.imageList != ''">
          <router-link class='hot-a' :to="{name:'DetailNews',params:{id:hot.id,icon:hot.headImg}}">
            <p>{{ hot.title }}</p>
            <dl>
              <dd><img v-lazy="splitImg(hot)[0]" alt=""></dd>
            </dl>
          </router-link>
          <div class="tab tabt">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqi21.guangfu&ckey=CK1375908563872" class="openapp">打开APP</a>
            <span class="margin">{{hot.source}}<img src="../assets/images/4.png" alt=""></span>
            <span>{{timeFn(hot)}}</span>
          </div>
        </div>
        <div v-else-if="hot.showTempate == 0 && hot.user != null && hot.imageList.length == 0">
          <router-link class='hot-a' :to="{name:'DetailNews',params:{id:hot.id,icon:hot.headImg}}" >
            <p>{{hot.title}}</p>
          </router-link>
          <div class="tab tabt">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqi21.guangfu&ckey=CK1375908563872" class="openapp">打开APP</a>
            <span class="margin">{{hot.source}}</span>
            <span>{{timeFn(hot)}}</span>
          </div>
        </div>
        <div v-else>
          <router-link class='hot-a' :to="{name:'DetailNews',params:{id:hot.id,icon:hot.headImg}}">
            <p>{{hot.title}}</p>
          </router-link>
          <div class="tab tabt">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqi21.guangfu&ckey=CK1375908563872" class="openapp">打开APP</a>
            <span class="margin">{{hot.source}}</span>
            <span>{{timeFn(hot)}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="wechat">
      <img src="../assets/images/750-250.png" alt="">
    </div>
  </div>
  <div class="pinglun" id="pinglun"><a class="pinglun_con" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yiqi21.guangfu&ckey=CK1375908563872">打开一起光伏，参与文章讨论</a></div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name:'hotRec',
  data () {
    return {
      hotRec:'',
      imageLists:''
    }
  },
  created(){
    this.getHot()
  },
  methods:{
    // 热门推荐
    getHot(){
      let date = new Date(new Date()).getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/News/HotNews'
      axios.get(getNewsListUrl,{
          headers:{
            Appid:'gf_app_android',
            Timestamp:date,
            Sign:'aaaa',
            vtoken:''
          },
          params:{
            'top':10
          }
        }).then(res => {
          this.hotRec = res.data.data.list
        })
        .catch(e => alert(e))
      },
    splitImg(imgs){
      return imgs.imageList.split("|")
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
.hot-rec{
  width: 17.5rem;
  margin: 0 auto;
}
.hot-rec h5{
  font-size: .8rem;
  color:#666666;
  font-weight: 500;
  border-left: .2rem solid #3e88f9;
  line-height: .8rem;
  margin:1rem 0;
  padding-left: .2rem;
}
.hot-rec ul,dl,p{
  margin: 0;
}
.hot-rec li{
  padding: .4rem 0 .2rem;
  border-bottom: 1px solid #eeeeee;
  margin-left: 0;
}
.hot-rec li .li{
  display: flex;
  justify-content: space-between;
}
.hot-rec li .left{
  width:11.25rem;
}
.hot-rec li .left p{
  height: 2.2rem;
  overflow: hidden;
  font-size: .8rem;
  color:#000000;
}
.hot-rec li .tab{
  margin-top: .5rem;
  display: flex
}
.hot-rec li .tabt{
  margin-top: .2rem;
}
.hot-rec li span{
  font-size: .6rem;
  color:#a9a8a8;
}
.hot-rec li span.margin{
  margin:0 .3rem;
}
.hot-rec li span img{
  width: .4rem;
  height: .4rem;
  margin: 0 -.1rem 0 0;
}
.hot-rec li .openapp{
  font-size: .6rem;
  color:#f85959;
}
.hot-rec li .right{
  width:5.75rem;
  height: 3.75rem;
}
.hot-rec li .right img{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.hot-rec li .hot-a{
  display: block
}
.hot-rec li .hot-a p{
  max-height: 3rem;
  overflow: hidden;
  font-size: .8rem;
  color:#000000;
}
.hot-rec li .hot-a dl{
  display: flex;
  margin-top: .8rem;
}
.hot-rec li .hot-a dl dd{
  width:100%;
  height: 3.75rem;
  margin:0 1%;
}
.hot-rec li .hot-a dl dd img{
  width:100%;
  height: 100%;
  margin:0;
  padding: 0
}
.wechat{
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
}
.wechat img{
  width:100%;
}
.pinglun {
  width: 100%;
  background: #eee;
  padding: .5rem 0;
  position: fixed;
  bottom: 0;
  left: 0;
}
.pinglun_con {
    display: block;
    width: 90%;
    margin: 0 auto;
    height: 1.5rem;
    font-size: 0.6rem;
    border-radius: 5px;
    background: #fff url(http://api.dltoutiao.com/public/images/words.png) no-repeat 0.5rem 0.5rem;
    background-size: 1em 1em;
    color: #888;
    text-indent: 2em;
    line-height:1.5rem;
}
</style>

