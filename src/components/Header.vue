<template>
  <div class="header">
    <div class="logo">
      <h1><router-link to="/"><img src="../assets/images/logo.png" alt=""></router-link></h1>
      <div class="search">
      <i class="iconfont icon-search"></i>
        <router-link to="/home/searchkeyword">
          阳光能源 | 单晶 | 东方IC | 天津
        </router-link>
      </div>
    </div>
    <div class="home_nav">
      <div class="nav">
        <router-link v-for="(n,index) in nav" :key="index" :to="index == 1 ? {name:'liveBroad',params:{id:n}} : {name:'homeList',params:{id:n.id}}" active-class="active">
          {{ n.title }}
        </router-link>
      </div>
      <div class="more">
        <routerLink :to="{
          name:'myChannel',
          params:{
            id:nav 
            }
          }">
          <i class="iconfont icon-jiantou8"></i>
        </routerLink>
      </div>
    </div>
  </div>
</template>
 <script>
import axios from 'axios'
export default {
   name:'Header',
   data () {
     return {
      wrn:true,
      tabIndex:0,
      nav:'',
      live:{id: 1003,title:"直播"}
     }
   },
  created(){
    // console.log(this.live)
    this.getNav()
  },
  methods: {
    getNav(){
      let date = new Date(new Date()).getTime();
      let channel = "https://api.dltoutiao.com/api/News/GetAllChannel"
      let that = this
      axios.get(channel,{
        headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        }
      }).then(res => {
        let arr = res.data.data
        arr.splice(1,0,this.live)
        that.nav = arr
        })
        .catch(e => alert('请求数据超时'))
    }
  }
}
 </script>
 
 <style scoped>
 .header{
    width: 100%;
    background: #65a1fc;
    position: fixed;
    top: 0;
    z-index: 999;
 }
  .logo{
    width: 17.75rem;
    margin: 0 auto;
    display: flex;
    align-items:center;
  }
  .logo h1,.logo a{
    display: block;
    height: 2.2rem;
  }
  .logo img{
    width: 4.25rem;
    height: 2.2rem;
  }
  .logo .search {
    flex-grow: 1;
    margin-left: 1rem;
    position: relative;
  }
  .logo .search i{
    position: absolute;
    top:.35rem;
    left:.4rem;
  }
  .icon-jiantou8{
    margin-left: .3rem;
  }
  .logo .search a{
    display: block;
    background: #fff;
    width: 11rem;
    height: 1.4rem;
    font-size: .6rem;
    text-align: center;
    color:#999999;
    border-radius: 1rem;
    line-height: 1.4rem;
  }
  .home_nav{
    width: 100%;
    background: #ffffff;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .home_nav .nav{
    width: 16.43rem;
    margin: 0 auto;
    display: flex;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .home_nav a{
    white-space: nowrap;
    font-size: .8rem;
    color:#333333;
    padding: 0 .2rem;
    margin: 0 .1rem;
    line-height: 1.75rem;
  } 
  .active{
    color:#65a1fc !important;
    border-bottom: 1px solid #65a1fc;
  }
  .home_nav .more{
    width: 2rem;
    background: #fff;
    position: relative;
  }
  .home_nav .more::before{
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: .1rem;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-mask: -webkit-linear-gradient(top,transparent,#000 45%,#000 55%,transparent 100%);
    border-right: 1px solid #ccc;
    box-shadow: inset -3px 0 3px rgba(0,0,0,.11);
  }
  .home_nav .more img{
    width: 40%;
    margin-left: .5rem;
    margin-top: .35rem;
  }
 </style>

 