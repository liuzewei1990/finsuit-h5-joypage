<template>
  <div class="result">
    <!-- 持仓中 -->
    <div v-if="status.num===1" class="num3">
      <p>{{status.data.address}}</p>
      <p>
        <span>{{status.data.name}}</span>
        <span>{{status.data.phone}}</span>
      </p>
      <hr />
      <p>{{status.data.other}}</p>
      <p>{{status.why}}</p>
    </div>
    <!-- 等待发货 -->
    <div v-if="status.num===2" class="num4">
      <p>{{status.data.address}}</p>
      <p>
        <span>{{status.data.name}}</span>
        <span>{{status.data.phone}}</span>
      </p>
      <hr />
      <p>{{status.data.other}}</p>
      <p>{{status.why}}</p>
    </div>
    <!-- 已发货 -->
    <div v-if="status.num===3" class="num5">
      <p>{{status.data.address}}</p>
      <p>
        <span>{{status.data.name}}</span>
        <span>{{status.data.phone}}</span>
      </p>
      <hr />
      <div class="num5_seccess">
        <p>口罩已发货，正在路上！</p>
        <p>
          <span>物流信息：{{status.data.other.gongsi}}&nbsp;{{status.data.other.number}}</span>
          <span v-copy="status.data.other.number" v-copy:callback="copyCallback">复制</span>
        </p>
      </div>
      <p>{{status.why}}</p>
    </div>

    <!-- 已参与，未填写地址 -->
    <div v-if="status.num===4" class="num2" @click="toAddress">{{status.why}}</div>

    <!-- 奖励失效，已填地址 -->
    <div v-if="status.num===6" class="num6">
      <p>{{status.data.address}}</p>
      <p>
        <span>{{status.data.name}}</span>
        <span>{{status.data.phone}}</span>
      </p>
      <hr />
      <p>{{status.data.other}}</p>
      <p>{{status.why}}</p>
    </div>

    <!-- 奖励失效，未填地址 -->
    <div v-if="status.num===7" class="num7">
      <p>{{status.why}}</p>
      <p>{{status.why}}</p>
    </div>

    <!-- 售罄 -->
    <div v-if="status.num===8" class="num1">{{status.why}}</div>
  </div>
</template>
<script>
export default {
  props: ["status"],
  methods: {
    copyCallback() {
      this.$Toast("复制成功");
      this.$trackEvents.ACB0Y006();
    },
    toAddress() {
      this.$trackEvents.ACB0Y005();
      let url = this.$Config.kouzhaoHost;
      url += `#/address`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);

      // this.$router.push({ name: "address" });
    }
  }
};
</script>

<style scoped>
.result {
  margin: 60px 33px 10px;
}
.result > div {
  border-radius: 10px;
}
hr {
  display: block;
  border-top: 1px solid #888686;
  width: calc(100% - 40px);
  margin: 0 20px;
}
.num1,
.num6 > p:nth-of-type(4),
.num7 > p:nth-of-type(2) {
  font-size: 34px;
  color: #fff;
  background: #a4a4a4;
  padding: 12px 0;
  text-align: center;
  box-shadow: 0px 4px 13px 0px #a4a4a4;
  border-radius: 0 0 10px 10px;
}
.num2 {
  font-size: 34px;
  color: #fff;
  background: #496df2;
  padding: 12px 0;
  text-align: center;
  box-shadow: 0px 4px 13px 0px rgba(73, 109, 242, 1);
}
.num3,
.num4,
.num5,
.num7,
.num6 {
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.18);
}
.num3 > p:nth-of-type(1),
.num4 > p:nth-of-type(1),
.num5 > p:nth-of-type(1),
.num6 > p:nth-of-type(1) {
  font-size: 30px;
  padding: 35px 20px 0 20px;
}
.num3 > p:nth-of-type(2),
.num4 > p:nth-of-type(2),
.num6 > p:nth-of-type(2),
.num5 > p:nth-of-type(2) {
  padding: 20px;
}
.num3 > p:nth-of-type(2) > span,
.num6 > p:nth-of-type(2) > span,
.num4 > p:nth-of-type(2) > span,
.num5 > p:nth-of-type(2) > span {
  font-size: 25px;
  color: #999999;
}
.num3 > p:nth-of-type(2) > span:nth-of-type(1),
.num6 > p:nth-of-type(2) > span:nth-of-type(1),
.num4 > p:nth-of-type(2) > span:nth-of-type(1),
.num5 > p:nth-of-type(2) > span:nth-of-type(1) {
  margin-right: 20px;
}
.num3 > p:nth-of-type(3),
.num6 > p:nth-of-type(3),
.num4 > p:nth-of-type(3) {
  padding: 20px;
  color: #464646;
}
.num3 > p:nth-of-type(4),
.num4 > p:nth-of-type(4),
.num5 > p:nth-of-type(3) {
  font-size: 34px;
  color: #fff;
  background: #496df2;
  text-align: center;
  padding: 12px 0;
  box-shadow: 0px 4px 13px 0px rgba(73, 109, 242, 1);
  border-radius: 0 0 10px 10px;
}
.num5_seccess {
  padding: 10px 20px;
}

.num5_seccess > p:nth-of-type(1) {
  padding-bottom: 10px;
}
.num5_seccess > p:nth-of-type(2) {
  display: flex;
  justify-content: space-between;
}
.num5_seccess > p:nth-of-type(2) > span:nth-of-type(2) {
  color: #496df2;
}

.num7 > p:nth-of-type(1) {
  line-height: 90px;
  font-size: 30px;
  padding: 140px 20px 0px 20px;
  text-align: center;
  background-image: url("../assets/images/11.png");
  background-repeat: no-repeat;
  background-size: 150px 150px;
  background-position: center 10%;
  color: #464646;
}
</style>