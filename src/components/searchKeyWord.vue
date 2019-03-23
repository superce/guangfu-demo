<template>
  <div class="search">
    <div class="search_top">
      <div class="top">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder='搜索你感兴趣的任何词' v-model="keyWord" @keyup.enter="inputWord">
        <router-link to="/home">取消</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name:'searchKeyWord',
    data(){
      return{
        keyWord:'',
      }
    },
    
    methods:{
      inputWord(){
        let kwLen = this.keyWord.trim().length
        if(kwLen < 2){
          alert('请输入两个以上关键词')
          return
        }
        this.search()
      },
      search(){
        // let date = new Date(new Date()).getTime();
        // let searchUrl = 'https://api.dltoutiao.com/api/News/SearchNews'
        // axios.get(searchUrl,{
        //   headers:{
        //     Appid:'gf_app_android',
        //     Timestamp:date,
        //     Sign:'aaaa',
        //     vtoken:''
        //   },
        //   params:{
        //     'keyword':this.keyWord,
        //     'pageindex':1,
        //     'pagesize':10
        //   }
        // }).then(res => {
          this.$router.push({
            path:'keyWordList',
            query:{
              'keywordid':this.keyWord
            }
          })
          this.keyWord = ''
        // }).catch(e => {
        //   alert('搜索失败')
        //   this.keyWord = ''
        // })
      }
    }
  }
</script>

<style scoped>
  .search_top{
    width:100%;
    background: #f7f7f7;
  }
  .search_top .top{
    width: 17.5rem;
    margin: 0 auto;
    padding: .5rem 0;
    position: relative;
  }
  .search_top input{
    width:15.5rem;
    height:1.45rem;
    line-height: 1.45rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    padding-left: 1.4rem;
  }
  .search_top i{
    position: absolute;
    top:.85rem;
    left: .4rem
  }
  .search_top a{
    font-size: .8rem;
    color:#333333;
    
  }
</style>
