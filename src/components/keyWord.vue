<template>
  <div class="keyword">
    <div class="title">
      <h4>大家都在搜</h4>
    </div>
    <ul>
      <li v-for="(w,index) in word" :key="index"><span>{{ index + 1 }}</span><span class="a" @click='keyWordList($event)'>{{ w }}</span></li>
    </ul>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from './Loading'
import axios from 'axios'
  export default {
  components:{Loading},
   name:'keyWord',
   data () {
     return {
       loading:true,
       word:[]
     }
   },
   created(){
     this.keyWord()
   },
   methods:{
     keyWord(){
      let date = new Date(new Date()).getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/News/HotKeywords'
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            top:10
          }
        })
        .then(res => {
          this.word = res.data.data
          this.loading = false
        })
        .catch(e => alert('关键词加载失败'))
     },
     keyWordList(e){
       let res = e.target.innerText
       this.$router.push({
            path:'keywordlist',
            query:{
              'keywordid':res
            }
          })
     }
   }
  }
</script>

<style scoped>
.keyword .title{
  border-bottom: 1px solid #e2e1e1;
}
.keyword h4{
  width: 17.5rem;
  margin: 0 auto;
  font-size: .7rem;
  color:#666666;
  line-height: 2rem;
}
.keyword ul{
  width: 17.5rem;
  margin: 1rem auto 0;
  display: flex;
  flex-wrap: wrap;
}
.keyword ul li{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 8.75rem;
}
.keyword ul li span{
  font-size: .7rem;
  color:#bbbbbb;
}
.keyword ul li:nth-child(1) span{
  color:#de0c01
}
.keyword ul li:nth-child(2) span{
  color:#ff803d
}
.keyword ul li:nth-child(3) span{
  color:#ffa800;
}
.keyword ul li .a{
  color:#333 !important;
  font-size: .7rem;
  color:#333333;
  margin-left: .2rem;
}
</style>
