<template>
  <div class="loading"><p>加载中<span></span><span></span><span></span><span></span><span></span></p></div>
</template>
<script>
export default {
  name:"Loading"
}
</script>

<style scoped>
.loading{
  text-align: center;
}
.loading p{
  font-size: .6rem;
  color:#333;
}
.loading span{
    display: inline-block;
    width: .2rem;
    height: .2rem;
    margin-right: 5px;
    border-radius: 50%;
    background: #129aee;
    -webkit-animation: load 1.04s ease infinite;
  }
  .loading span:last-child{
    margin-right: 0px;
  }
  @keyframes load{
    0%{
      opacity: 1;
      -webkit-transform: scale(1.2);
    }
    100%{
      opacity: .2;
      -webkit-transform: scale(.2);
    }
  }
  .loading span:nth-child(1){
    animation-delay:0.13s;
  }
  .loading span:nth-child(2){
    animation-delay:0.26s;
  }
  .loading span:nth-child(3){
    animation-delay:0.39s;
  }
  .loading span:nth-child(4){
    animation-delay:0.52s;
  }
  .loading span:nth-child(5){
    animation-delay:0.65s;
  }

</style>
