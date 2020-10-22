<!--  -->
<template>
  <div class="loading-container" id="loading">
    <div id="caseBlanche">
      <div id="rond">
        <div id="test"></div>
      </div>
      <div id="load">
        <p>{{num}}%</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data () {
    return {

    };
  },
  created () {

  },

  //方法集合
  methods: {

  },
}
</script>
<style lang='less' scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #223856;
  z-index: 10000;
}

#caseBlanche {
  height: 120px;
  width: 120px;
  position: relative;
}

#caseBlanche #load {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

#caseBlanche #load p {
  margin-left: 10px;
  margin-top: 10px;
}

/****DEBUT TEST****/
#test {
  height: 20px;
  width: 20px;
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  top: 0px;
  left: 20px;
}

#rond {
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: 0px;
  animation: rond 2s infinite;
  -webkit-animation: rond 2s infinite;
}

@keyframes rond {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rond {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

/****FIN TEST****/
</style>