<template>
  <div class="lun_bo">
    <wc-swiper class="swiper" :duration="1000" v-if='listMsg != ""'>
      <wc-slide v-for="(s,index) in listMsg" :key="index">
        <router-link :to="{name:'liveDetail',params:{id:s.id}}">
          <img v-lazy="s.headImg">
          <p><span>{{ s.title }}</span></p>
        </router-link>
      </wc-slide>
    </wc-swiper>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name:'lunBo',
    data(){
      return{
        listMsg:''
      }
    },
    created(){
      this.getlist()
    },
    methods:{
      getlist(){
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
              'pagesize':3
            }
          })
          .then(res => {
            this.listMsg = res.data.data.items          
          })
          .catch(e => alert('新闻加载失败'))
      }
    }
  }
</script>

<style scoped>
.lun_bo{
  margin-top: 4rem;
}
  .swiper{
    height: 10rem;
  }
  .swiper img{
    width:100%;
    height: 100%;
  }
  .swiper p{
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    color: #fff;
    padding-left: .5rem;
    line-height: 1.5rem;
    font-size: .7rem;
  }
  .swiper p span{
    display: block;
    width: 14rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .wc-pagination{
    bottom:0px !important;
    justify-content: flex-end !important;
  }
</style>

