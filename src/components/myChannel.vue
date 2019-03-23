<template>
  <div class="channel">
    <div class="return" @click="back">
      <i class="iconfont icon-fanhui"></i>
      <span>返回</span>
    </div>
    <div class="channel-content">
      <h4>我的频道</h4>
      <router-link v-for="(c,index) in channel" :key="index" :to="index == 1 ? {name:'liveBroad'} : {name:'homeList',params:{id:c.id}}" active-class="active" :class="{'active' : index}">{{ c.title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name:'myChannel',
  data(){
    return{
      channel:this.$route.params.id,
      index: this.$route.params.index
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .channel{
    width: 17.5rem;
    margin: 0 auto;
    padding-top: .5rem;
  }
  .channel .return .icon-fanhui{
    font-size: .9rem
  }
  .channel .return span{
    font-size: .8rem;
    color: #333333;
  }
  .channel-content h4{
    font-weight: normal;
    font-size: .8rem;
    color:#666666;
    line-height: 1.6rem;
    margin:.7rem 0;
  }
  .channel-content a{
    display: inline-block;
    width:calc(33.33% - .3rem);
    height: 1.9rem;
    border: 1px solid #e6e6e6;
    line-height: 1.9rem;
    border-radius: .5rem;
    text-align: center;
    margin:0 .15rem;
    margin-bottom: .3rem;
    font-size: .7rem;
    color:#333333;
  }
  .active{
    color:#65a1fc;
  }
</style>

