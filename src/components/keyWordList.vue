<template>
  <div class="keywordlist">
    <ul v-if="keyList">
      <li v-for="(data,index) in keyList" :key="index">
        <!-- 左右 -->
        <router-link class='left-right' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-if="data.showTempate == 0 && data.user == null && data.imageList.length < 3 && data.imageList.length >= 1 && data.imageList != null">
          <div class="left" >
            <h4>{{ data.title }}</h4>
            <p><span>{{data.source}}</span><span>{{ data.indate }}</span></p>
          </div>
          <div class="right">
            <img v-lazy="data.imageList" :alt="data.title">
          </div>
        </router-link>
        <!-- 一个大图 -->
        <router-link class='one' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 1 && data.user != null && data.imageList.length < 3 &&  data.imageList.length >= 1 && data.imageList != null">
          <h4>{{data.title}}</h4>
          <img v-lazy="data.imageList" :alt="data.title">
          <p><span>{{data.source}}</span><span>{{ data.indate }}</span> </p>
        </router-link>
        <!-- 三个小图 -->
        <router-link class="third" :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 3 && data.user == null && data.imageList != ''">
          <h4>{{ data.title }}</h4>
          <dd>
            <dl><img v-lazy="splitImages(data)[0]" :alt="data.title"></dl>
          </dd>
          <p><span>{{data.source}}</span><img src="../assets/images/4.png" alt=""><span>{{data.indate}}</span></p>
        </router-link>
        <router-link :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else>
          <h4>{{data.title}}</h4>
          <p><span>{{data.source}}</span><span>{{timeFn(data)}}</span></p>
        </router-link>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(data,index) in keyword" :key="index">
        <!-- 左右 -->
        <router-link class='left-right' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-if="data.showTempate == 0 && data.user == null && data.imageList.length < 3 && data.imageList.length >= 1 && data.imageList != null">
          <div class="left" >
            <h4>{{ data.title }}</h4>
            <p><span>{{data.source}}</span><span>{{ data.indate }}</span></p>
          </div>
          <div class="right">
            <img v-lazy="data.imageList" :alt="data.title">
          </div>
        </router-link>
        <!-- 一个大图 -->
        <router-link class='one' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 1 && data.user != null &&  data.imageList.length < 3 && data.imageList.length >= 1 && data.imageList != null">
          <h4>{{data.title}}</h4>
          <img v-lazy="data.imageList" :alt="data.title">
          <p><span>{{data.source}}</span><span>{{ data.indate }}</span> </p>
        </router-link>
        <!-- 三个小图 -->
        <router-link class="third" :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 3 && data.user == null && data.imageList != ''">
          <h4>{{ data.title }}</h4>
          <dd>
            <dl><img v-lazy="splitImages(data)[0]" :alt="data.title"></dl>
          </dd>
          <p><span>{{data.source}}</span><img src="../assets/images/4.png" alt=""><span>{{data.indate}}</span></p>
        </router-link>
        <router-link :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else>
          <h4>{{data.title}}</h4>
          <p><span>{{data.source}}</span><span>{{timeFn(data)}}</span></p>
        </router-link>
      </li>
    </ul>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from './Loading'
  export default {
    components:{Loading},
    name:'keyWordList',
    data(){
      return{
        keyList:'',
        keyword:'',
        REQS:true,
        Loading:false,
        pageindex:11
      }
    },
    watch:{
      $route(){
        this.getNews()
      }
    },
    mounted(){
      this.getNews()
      window.addEventListener('scroll',this.more)
    },
    beforeDestroy(){
      window.removeEventListener('scroll',this.more)
    },
    methods:{
      // 搜索
      getNews(){
        let kW = this.$route.query.keywordid
        let date = new Date(new Date()).getTime();
        let searchUrl = 'https://api.dltoutiao.com/api/News/SearchNews'
        axios.get(searchUrl,{
          headers:{
            Appid:'gf_app_android',
            Timestamp:date,
            Sign:'aaaa',
            vtoken:''
          },
          params:{
            'keyword':kW,
            'pageindex':1,
            'pagesize':10
          }
        }).then(res => {
          this.keyList = res.data.data.list
        }).catch(e => {
          alert('搜索失败')
        })
      },
      more(){
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        let wHeight = window.innerHeight 
        let scrollHeight = document.body.scrollHeight
        if(scrollTop + wHeight >= scrollHeight - 50 && this.REQS){
          this.REQS = false
          this.loading = true
          let kW = this.$route.query.keywordid
        let date = new Date(new Date()).getTime();
        let searchUrl = 'https://api.dltoutiao.com/api/News/SearchNews'
        axios.get(searchUrl,{
          headers:{
            Appid:'gf_app_android',
            Timestamp:date,
            Sign:'aaaa',
            vtoken:''
          },
          params:{
            'keyword':kW,
            'pageindex':this.pageindex,
            'pagesize':10
          }
        }).then(res => {
          let arr = res.data.data.list
          this.keyList = this.keyList.concat(arr)
          this.pageindex += 10
          this.REQS = true
        }).catch(e => {})
        }
      },
      // 分割图片链接
      splitImages(images){
        return images.imageList.split("|")
      },
      // 转换时间差
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
  .keywordlist ul{
    width: 17.75rem;
    margin: 0 auto;
  }
  .keywordlist ul .left-right{
    display: flex;
  }
  .keywordlist ul li{
    margin-top: 1rem;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: .5rem;
  }
  .keywordlist ul .left{
    width: 11rem;
  }
  .keywordlist ul li h4{
    max-height: 2.51rem;
    overflow: hidden;
    font-size: .8rem;
    line-height: 1.2rem;
    color:#000000;
    font-family: Microsoft Yahei;
    font-weight: normal;
  }
  .keywordlist ul li p{
    font-size: .6rem;
    margin-top: .5rem;
  }
   .keywordlist ul li span{
     margin-right:.5rem;
     color:#a9a8a8;
   }
  .keywordlist ul .left .top{
    border: 2px solid #ff0000;
    color:#ff0000;
    padding:0 .1rem
  }
  .keywordlist ul .right{
    width: 5.75rem;
    height: 3.75rem;
    overflow: hidden;
  }
  .keywordlist ul li img{
    width: 100%;
    height: 100%;
  }
  .keywordlist ul .one img{
    margin-top: .5rem;
  }
  .keywordlist ul .third dd{
    display: flex;
    margin-top: .5rem;
  }
  .keywordlist ul .third dl{
    width: 100%;
    height: 3.75rem;
    overflow: hidden;
    margin:0 1%;
  }
  .keywordlist ul .third p img{
    width: .4rem;
    height: .4rem;
    margin:0 .1rem  0 -.4rem;
  }
</style>
