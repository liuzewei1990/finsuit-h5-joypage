<template>
  <popup v-model="show" position="bottom" :show-mask="true" :hide-on-blur="true" :is-transparent="true" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <!-- 头部插槽 -->
    <slot name="header"></slot>

    <!-- btn按钮 -->
    <slot :btnTypes="SHARE_PLACE_TYPE" :btns="btns">
      <div class="box">
        <div class="content">
          <div class="content-item" @click="clickShare(item)" v-for="(item,index) in btns" :key="index">
            <i :class="SHARE_PLACE_TYPE[item.SHARE_PLACE] && SHARE_PLACE_TYPE[item.SHARE_PLACE].icon"></i>
            <span>{{SHARE_PLACE_TYPE[item.SHARE_PLACE] && SHARE_PLACE_TYPE[item.SHARE_PLACE].name}}</span>
          </div>
        </div>
        <div class="btn" @click="show=false">取消</div>
      </div>
    </slot>

    <!-- 底部插槽 -->
    <slot name="footer"></slot>
  </popup>
</template>

<script>
import Popup from "../Popup"
import mixins from "./mixins.js"
export default {
  components: { Popup },
  mixins: [mixins],
  data () {
    return {
      // btn类型
      SHARE_PLACE_TYPE: {
        "0": {
          name: "微信",
          tName: "好友",
          icon: "icon-wechat"
        },
        "1": {
          name: "朋友圈",
          tName: "朋友圈",
          icon: "icon-wechat-circle"
        },
        "2": {
          name: "QQ",
          tName: "QQ好友",
          icon: "icon-qq"
        },
        "3": {
          name: "QQ空间",
          tName: "QQ空间",
          icon: "icon-qzone"
        },
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.box .content {
  display: flex;
  flex: 1;
  background: #fff;
  overflow-y: auto;

  .content-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 20px;

    i {
      font-size: 80px;
    }
    span {
      font-size: 30px;
      margin: 5px 0;
    }
  }
}

.box .btn {
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-top: 4px solid #eee;
  background: #fff;
  font-size: 30px;
}
</style>
