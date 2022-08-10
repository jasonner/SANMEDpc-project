<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted(){
      if (this._isMobile()) {
        window.location.href = 'https://cac.sanmedgene.com/SANMEDH5/index.html#/index';
      }
    },
    methods:{
      _isMobile(){
          let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          return flag;
      },
    },
  }
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #303030;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background: #fbfdfc;
  margin: 0;
  padding: 0;
}
body,h1,h2,h3,h4,h5,h6,div,dd,dt,dl,form,kbd,table,ul,li,marquee,hr,blockquote,ol,pre,fieldset,legend,button,input,textarea,th,td{font-size:12px; margin:0; padding:0; font-family: "微软雅黑",Arial, "宋体", Tahoma, Verdana,  Helvetica, sans-serif;}
address,cite,dfn,em,var{font-style:normal;}
button,input,select,textarea{font-size:100%; cursor:pointer}
input{ cursor:pointer}
table{border-collapse:collapse;border-spacing:0;}
ul,ol{list-style:none;}
img{border:0;}
ul{list-style:none;}
.clear{ clear:both;}
a{text-decoration: none; color: #6e6e6e }
a:hover{ color:#6e6e6e; text-decoration:none}
input[type="submit"],input[type="reset"],input[type="button"],input[type="text"], button { -webkit-appearance: none;border-radius: 0; } 

.clearfix:after { visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }

.el-message-box__message p{
  font-size: 1vw;
  line-height: 2 !important;
}
.el-message-box__title{
  font-size: 1vw !important;
  margin-top: 1vw;
}
.el-message-box{
  width: 20vw !important;
}
.el-message-box__headerbtn{
  font-size: 30px !important;
}
.el-message-box__content{
  margin-top: 1vw !important;
}
.el-button--small{
  font-size: 1vw !important;
}
.el-message-box__btns {
  text-align: center !important;
  margin-top: 1vw;
}
</style>
