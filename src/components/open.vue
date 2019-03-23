<template>
  <div class="open">
    <div class="open-box">
      <router-link to="/"><img src="../assets/images/6.png" alt=""></router-link>
      <router-link to="/down-load" class="a">打开</router-link>
    </div>
  </div>
</template>

<script>
  export default {
   name:'Open' 
  }
</script>

<style scoped>
.open{
  width: 100%;
  background: #404040;
}
.open-box{
  width:17.5rem;
  height: 2.2rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.open img{
  width: 5rem;
}
.open-box .a{
  font-size: .7rem;
  color:#fff;
  background: #5c8dfe;
  border-radius: .4rem;
  padding:.1rem .5rem;
}
</style>

