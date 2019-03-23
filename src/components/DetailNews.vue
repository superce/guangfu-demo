<template>
  <div class="detail-content">
    <h4>{{ detailList.title }}</h4>
    <p>
      <img v-if="detailList.user != null && detailList.user.headImg != ''" v-lazy="detailList.user.headImg" alt="头像">
      <!-- <img v-else v-lazy="this.$route.params.icon" alt=""> -->
      <span class="author">{{ detailList.source }}</span>
      <img v-if="detailList.user != null && detailList.user.isVip == 1" src="../assets/images/4.png" alt="" class="v">
      <span class="data">{{ detailList.indate }}</span>
    </p> 
    <!-- <img v-if="this.$route.params.icon != null" v-lazy="this.$route.params.icon" :alt="detailList.title" class="big-img"> -->
    <div class="intro-box">
      <div :class="{'intro' : !setHeight, 'set-height' : setHeight}" >
        <div v-html="detailList.content"></div>
        <Loading v-if="loading"/>
      </div>
      <More @get="height" v-if="!setHeight" class="down"/>
    </div>
    <router-link to="/down-load" :class="{'app' : !setHeight, 'app2' : setHeight}">{{ open }}</router-link>
  </div>
</template>
<script>
import Loading from './Loading'
import More from './more'
import axios from 'axios'
export default {
  components:{
    Loading,More
  },
  name:'DetailNews',
  data(){
    return{
      loading:true,
      setHeight:false,
      open:'打开APP阅读全文',
      detailList:''
    }
  },
  created(){
    this.getDetail()
  },
  watch:{
    "$route": 'getDetail'//监听路由变化，重新渲染数据
  },
  methods:{
    height(){
        this.setHeight = !this.setHeight
        this.open = '打开一起光伏, 阅读更佳'
      },
    getDetail(){
        let data = this.$route.params.id
        let date = new Date(new Date()).getTime();
        let getNewsListUrl = 'https://api.dltoutiao.com/api/News/GetNewsDetailV2'
        axios.get(getNewsListUrl,{
            headers:{
            Appid:'gf_app_android',
            Timestamp:date,
            Sign:'aaaa',
            vtoken:''
          },
            params:{id:data}
          })
          .then(res => {
            this.detailList = res.data.data
            // console.log(res.data.data)
            this.loading = false
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
          })
          .catch(e => alert('新闻加载失败'))
    }
  }
}
</script>
<style scoped>
.detail-content{
  width: 17.5rem;
    margin: 0 auto;
}
.detail-content h4{
  font-size: 1rem;
  margin:1rem 0;
  color:#333333;
}
.detail-content p{
  display: flex;
  margin: 0;
  margin-bottom: .2rem;
}
img{
  margin: 0;padding: 0;
}
.detail-content p img{
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  border-radius: 50%;
  overflow: hidden;
}
.detail-content p .author{
  font-size: .7rem;
  color:#333333;
  line-height: 1.7rem;
  margin-left: .25rem;
}
.detail-content p .data{
  flex-grow: 1;
  text-align: right;
  font-size: .6rem;
  color:#999999;
  line-height: 1.5rem;
}
.detail-content .big-img{
  width: 100%;
  margin-top: 1rem;
}
.intro{
  height: 24rem;
  overflow: hidden;
}
.set-height{
  height: auto;
}
.intro-box{
  position: relative; 
}
.intro-box p{
  font-size: .8rem;
  line-height: 1.25rem;
  margin-top: .5rem;
  transition: all .5s;
}
@keyframes down
{
  0% {bottom: -.5rem}
  50% {bottom:-.7rem;}
  100% {bottom:-.5rem;}
}
.down{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  animation:down 1s infinite;
}
.detail-content .app{
  font-size: .8rem;
  color:#fff;
  background: #66a1fc;
  border-radius: 1rem;
  display: block;
  text-align: center;
  line-height: 1.5rem;
  margin-top: 1rem;
}
.detail-content .app2{
  font-size: .8rem;
  color:#fff;
  background: #66a1fc;
  border-radius: 1rem;
  display: block;
  text-align: center;
  line-height: 1.5rem;
  margin-top: 1rem;
}
.v{
    width: .5rem !important;
    height: .5rem !important;
    margin-left: .1rem;
    margin-top: .5rem;
    border-radius: 0 !important;
}
</style>
