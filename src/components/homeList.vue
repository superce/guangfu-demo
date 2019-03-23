<template>
  <div class="home_content">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up='mescrollUp' @init='mescrollInit'>
      <div class="home-down">
        <p v-show="p">更新时间：{{time}}</p>
        <ul>
          <li v-for="(top,index) in topMsg" :key="index + 'i'">
            <div v-if="top.showTempate == 10">
              <!-- 置顶有图片 -->
              <router-link class='left-right' :to="{name:'DetailNews',params:{id:top.id,icon:top.headImg}}" v-if="index == 0 && top.imageList != ''">
                <div class="left" >
                  <h4>{{ top.title }}</h4>
                  <p><span class="top">置顶</span><span class="top-msg">{{top.source}}</span><img class="v" v-if="top.user != null && top.user.isVip == 1" src="../assets/images/4.png" alt=""><span class="top-data">{{ timeFn(top) }}</span></p>
                </div>
                <div class="right">
                  <img v-lazy="top.imageList" :alt="top.title">
                </div>
              </router-link>
              <!-- 置顶无图片 -->
              <router-link :to="{name:'DetailNews',params:{id:top.id,icon:top.headImg}}" v-else-if="index == 0">
                  <h4>{{ top.title }}</h4>
                  <p><span class="top">置顶</span><span class="top-msg">{{top.source}}</span><img class="v" v-if="top.user != null && top.user.isVip == 1" src="../assets/images/4.png" alt=""><span class="top-data">{{ timeFn(top) }}</span></p>
              </router-link>
              <!-- 热门有图片 -->
              <router-link class='left-right' :to="{name:'DetailNews',params:{id:top.id,icon:top.headImg}}" v-else-if="index >= 0 && top.imageList != ''">
                <div class="left" >
                  <h4>{{ top.title }}</h4>
                  <p><span class="top">热</span><span class="top-msg">{{top.source}}</span><img class="v" v-if="top.user != null && top.user.isVip == 1" src="../assets/images/4.png" alt=""><span class="top-data">{{ timeFn(top) }}</span></p>
                </div>
                <div class="right">
                  <img v-lazy="top.imageList" :alt="top.title">
                </div>
              </router-link>
              <!-- 热门无图片 -->
              <router-link :to="{name:'DetailNews',params:{id:top.id,icon:top.headImg}}" v-else>
                  <h4>{{ top.title }}</h4>
                  <p><span class="top">热</span><span class="top-msg">{{top.source}}</span><img class="v" v-if="top.user != null && top.user.isVip == 1" src="../assets/images/4.png" alt=""><span class="top-data">{{ timeFn(top) }}</span></p>
              </router-link>
            </div>
          </li>
          <li v-for="(data,index) in dataMsg" :key="index">
            <router-link class='left-right' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-if="data.showTempate == 0 && data.user == null && data.imageList != ''">
              <div class="left" >
                <h4>{{ data.title }}</h4>
                <p><span class="top-msg">{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span class="top-data">{{ timeFn(data) }}</span></p>
              </div>
              <div class="right">
                <img v-lazy="data.imageList" :alt="data.title">
              </div>
            </router-link>
            <router-link class='one' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 1 && data.user != null  && data.imageList != ''">
              <h4>{{data.title}}</h4>
              <img v-lazy="data.imageList" :alt="data.title">
              <p><span>{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{ timeFn(data) }}</span> </p>
            </router-link>
            <router-link class="third" :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 3 && data.user == null && data.imageList != ''">
              <h4>{{ data.title }}</h4>
              <dd>
                <dl>
                  <img v-lazy="getImage(data)[0]" alt="">
                </dl>
              </dd>
              <p><span>{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{timeFn(data)}}</span></p>
            </router-link>
            <router-link :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else>
              <h4>{{data.title}}</h4>
              <p><span>{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{timeFn(data)}}</span></p>
            </router-link>  
          </li>
          <Loading v-if='loading' class="ab"/>
        </ul>
      </div> 
    </mescroll-vue>
  </div>
</template>
<script>
import Loading from './Loading'
import axios from 'axios'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  components: {
    MescrollVue, // 注册mescroll组件
    Loading
  },
  name:'homeList',
  data () {
    return {
      time:'',
      p:false,
      loading:true,
      mescroll: null, // mescroll实例对象
      mescrollDown:{callback:this.upCallback,auto:false}, //下拉刷新的配置
      mescrollUp:{callback: this.downCallback,offset:400},
      REQS:true,
      dataMsg:'',
      images:'',
      topMsg:'',
      max:'',
      min:''
    }
  },
  created(){
    this.getNewsList()
    this.top()
  },
  watch:{
    //"$route": ['getNewsList','top']//监听路由变化，重新渲染数据
    $route(newD,oldD){
      this.getNewsList()
      this.top()
      this.mescroll.scrollTo(0,0)
    }
  },
  methods:{
    // 置顶
    top(){
      let data = this.$route.params.id
      let date = new Date().getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/Ad/ChannelTopAds'
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            'channelid':data       
          }
        })
        .then(res => {
          this.topMsg = res.data.data
        })
        .catch(e => alert('获取置顶新闻失败'))
    },
    // 列表数据
    getNewsList(){
      this.max = ''
      this.min = ''
      let data = this.$route.params.id
      let date = new Date().getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/News/GetNewsList'   
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            'channelid':data,
            'isUp':1,
            'maxid':0,
            'minid':0,
            'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
            'pagesize':10
          }
        })
        .then(res => {
          this.loading = false
          this.dataMsg = res.data.data.items
          this.max = res.data.data.minid;
          this.min = this.max - 10
        })
        .catch(e => alert('请求新闻失败'))
    },
    getImage(images){
      return images.imageList.split("|")
    },
    // 下拉刷新
    upCallback(mescroll){
      let data = this.$route.params.id
      console.log(data + '频道')
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
            'channelid':data,
            'isUp':1,
            'maxid':0,
            'minid':0,
            'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
            'pagesize':10
          }
        })
        .then(res => {
          this.dataMsg = res.data.data.items
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess()
          })
          this.time = this.jieTime()
          this.p = true
          setTimeout(() => {
            this.p = false
          },2000)
        })
        .catch(e => alert('请求新闻失败'))
    },
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 上拉加载
    downCallback (page, mescroll) {
      let data = this.$route.params.id
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
            'channelid':data,
            'isUp':1,
            'maxid':this.max,
            'minid':this.min,
            'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
            'pagesize':10
          }
        }).then((res) => {
        //请求的列表数据
        let arr = res.data.data.items
        // 如果是第一页需手动制空列表
        if (page.num === 1) this.dataMsg = []
        // 把请求到的数据添加到列表
        this.dataMsg = this.dataMsg.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess()
        })
        this.max = res.data.data.minid
        this.min = this.max - 10
      }).catch((e) => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
      })
    },
    // 截取时间
    jieTime(){
      let data = new Date()
      let hour = data.getHours()
      let minutes = data.getMinutes()
      let seconds = data.getSeconds()
      if(hour < 10) hour = "0" + hour
      if(minutes < 10) minutes = "0" + minutes
      if(seconds < 10) seconds = "0" + seconds
      return hour + ':' + minutes + ':' + seconds
    },
    // 计算时间差
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
        // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数",hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
        if(dayDiff >= 1) return dayDiff + '天以前'
        if(hours < 24 && hours >= 1 ) return hours + '小时以前'
        if(minutes < 60 && minutes >= 1) return minutes + "分钟以前"
        if(seconds < 60 ) return '刚刚'
    }
  }
}
</script>
<style scoped>
/*以fixed的方式固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    height: auto;
  }
  .ab{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%)
  }
   @keyframes pp
  {
    0%{opacity: 0;}
    25%{opacity: 0.25;}
    50%{opacity: 0.5;}
    75%{opacity: 0.75;}
   100%{opacity: 1;}
  }
  .home_content .home-down>p{
    font-size: .7rem;
    color: #65a1fc;
    font-family: Microsoft Yahei;
    text-align: center;
    margin-top: 10px;
    line-height: 22px;
    animation: pp 1s ;
  }
  .home_content ul{
    width: 17.75rem;
    margin: 0 auto;
  }
  .home_content ul a.left-right{
    display: flex;
    justify-content: space-between;
  }
  .home_content ul li{
    margin-top: 1rem;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: .5rem;
  }
  .home_content ul .left{
    width: 11.5rem;
  }
  .home_content ul li h4{
    max-height: 2.4rem;
    overflow: hidden;
    font-size: .9rem;
    line-height: 1.2rem;
    color:#222222;
    font-weight: normal;
    font-family: Microsoft Yahei;
  }
  .home_content ul li p{
    font-size: .6rem;
    margin-top: .5rem;
  }
   .home_content ul li span{
     margin-right:.2rem;
     color:#a9a8a8;
     height: .85rem;
   }
   .home_content ul li span.top-msg{
     max-width: 6.2rem;
     overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
   }
   .home_content ul li span.top-data{
     overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
   }
   .home_content ul li span.top{
     border: 1px solid #ff0000;
    color:#ff0000;
    padding:0 .05rem;
    line-height: .75rem;
   }
  /* .home_content ul .left .top{
    border: 1px solid #ff0000;
    color:#ff0000;
    padding: .1rem .1rem .15rem;
    line-height: .6rem;
  } */
  .home_content ul .right{
    width: 5.75rem;
    height: 3.75rem;
    overflow: hidden;
  }
  .home_content ul li img{
    width: 100%;
    height: 100%;
  }
  .home_content ul .one img{
    height: 3.8rem;
    margin-top: .5rem;
  }
  .home_content ul .third dd{
    display: flex;
    margin-top: .5rem;
  }
  .home_content ul .third dl{
    width: 100%;
    height: 3.75rem;
    overflow: hidden;
    margin:0 1%;
  }
  .home_content ul .third dl img{
    width: 100%;
    height: 100%;
  }
  .home_content ul .third p img{
    width: .4rem;
    height: .4rem;
    margin:0 .1rem  0 -.4rem;
  }
  .home_content ul li p{
    display: flex;
  }
  .home_content ul li .one .v{
    margin-top: .15rem;
  }
  .v{
    width:.5rem !important;
    height: .5rem !important;
    margin: .15rem .1rem 0 0;
  }
</style>


