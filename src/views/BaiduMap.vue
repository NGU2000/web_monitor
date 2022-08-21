<template>
  <baidu-map class="bm-view" v-bind="mapOptions">
    <bm-control :offset="{ width: '10px', height: '10px' }">
      <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 1 }">
      </bm-auto-complete>
    </bm-control>
    <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>
    <div class="container">
      <button class="bm-button" @click="jsError">JS异常</button>
      <button class="bm-button" @click="psError">Promise异常</button>
      <button class="bm-button" @click="white_Error">白屏异常</button>
      <button class="bm-button" @click="load_Error">资源请求异常</button>
      <button class="unlog-button" id="fail" @click="logout">登出</button>
      <img id="test" src="" alt="">
    </div>
  </baidu-map>

</template>
 
<script>
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
} from "vue-baidu-map";
export default {

  components: {
    BaiduMap,
    BmView,
    BmControl,
    BmAutoComplete,
    BmLocalSearch,
  },

  data() {
    return {
      mapOptions: {
        ak: "ak",
        center: "上海",
        scrollWheelZoom: true,
      },
      keyword: "",
    };
  },

  //在所有网页监听异常
  mounted() {
    //懒加载错误
    window.onload = function (e) {
      loadScript({
        url: 'https://www.domain.com/test.js',
        timeout: 10000
      }).then(() => {
        console.log('ok');
      }).catch(console.error);
    };
  },


  //方法
  methods: {
    // 登出函数
    logout() {
      //删除用户数据
      this.$router.push('/');
    },

    //抛出JS异常
    jsError() {
      throw new Error('用户名无效');
    },

    //获得当前时间
    getTime() {
      let cur = new Date();
      let time = cur.getFullYear() + ":" + cur.getMonth() + ":" + cur.getDay() + ":" + cur.getHours() + ":" + cur.getMinutes() + ":" + cur.getSeconds();
      return time;
    },

    //抛出Promise异常
    psError() {
      new Promise((resolve, reject) => {
        window.a.a;
      });
    },

    //抛出白屏异常
    white_Error() {

    },

    //抛出资源加载异常        
    load_Error() {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'fail', true)
      xhr.responseType = 'json';
      xhr.onload = function () {
        console.log(xhr.response);
      }
      xhr.onerror = function (error) {
        console.log(error);
      }
      xhr.send('name=aaa');
    },
  },

};
</script>
 
<style>
.bm-view {
  width: 100%;
  height: 95%;
}

.bm-button {
  width: 100px;
  height: 5%;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  margin-right: 5px;
  cursor: pointer;
}

.unlog-button {
  width: 100px;
  height: 5%;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(125, 0, 0);
  color: #fff;
  font-size: 1.8em;
  cursor: pointer;
  float: right;
}
</style>