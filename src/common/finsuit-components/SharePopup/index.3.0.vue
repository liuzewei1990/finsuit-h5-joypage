<template>
  <popup v-model="show" position="bottom" :show-mask="true" :hide-on-blur="true" :is-transparent="true" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <!-- 头部插槽 -->
    <slot name="header"></slot>

    <!-- btn按钮 -->
    <slot :btnTypes="SHARE_PLACE_TYPE" :btns="btns">
      <div class="box">
        <div class="content">
          <div class="content-box">
            <div class="content-item" v-for="(item,index) in btns" :key="index">
              <span class="icon" @click="clickShare(item)" :class="SHARE_PLACE_TYPE[item.SHARE_PLACE] && SHARE_PLACE_TYPE[item.SHARE_PLACE].icon"></span>
              <span class="name">{{SHARE_PLACE_TYPE[item.SHARE_PLACE] && SHARE_PLACE_TYPE[item.SHARE_PLACE].name}}</span>
            </div>
          </div>
        </div>
        <div class="btn" @click="show=false">取消</div>
        <div class="line"></div>
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
          name: "微信好友",
          tName: "好友",
          icon: "share_wechat"
        },
        "1": {
          name: "朋友圈",
          tName: "朋友圈",
          icon: "share_pyq"
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
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.box .content {
  flex: 1;
  background: rgba(245, 247, 250, 1);
  overflow-y: auto;
  border-radius: 32px 32px 0px 0px;
  display: flex;
  align-items: center;
  .content-box {
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .content-item {
    // flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 160px;

    .icon {
      display: block;
      width: 112px;
      height: 112px;
    }
    .share_wechat {
      background: url("../../finsuit-assets/images/share_wechat.png") no-repeat;
      background-size: 100% 100%;
    }
    .share_pyq {
      background: url("../../finsuit-assets/images/share_pyq.png") no-repeat;
      background-size: 100% 100%;
    }
    .name {
      font-size: 28px;
      margin: 15px 0;
      color: #606266;
    }
  }
}

.box .btn {
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #fff;
  font-size: 30px;
}

.box .line {
  height: 68px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    display: block;
    width: 268px;
    height: 10px;
    background: #555;
    border-radius: 500px;
  }
}
</style>
