<template>
  <div class="down" @click="getHeight">
    <img src="../assets/images/7.png" alt="">
  </div>
</template>
<script>
export default {
  name:'More',
  methods:{
    getHeight(){
      this.$emit('get')
    }
  }
  
}
</script>
<style scoped>
  .down{
    width: .8rem;
  }
  .down img{
    width: 100%;
  }
</style>
