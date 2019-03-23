<template>
  <div class="detail">
    <Open />
    <router-view></router-view>
    <hotRec />
  </div>
</template>

<script>
import Open from './open'
import hotRec from './hotRec'
import DetailNews from './DetailNews'
import axios from 'axios'
  export default {
    components:{
      Open,hotRec,DetailNews
    },
    name:'Detail',
  }
</script>

