<template>
  <div class="v-goods">
    <div class="inner">

      <a href="javascript:void(0);" :class="{'v-goods-disabled':disabled}">
        <div class="goods-header">
          <div class="goods-img">
            <img :src="item.thumb" :key="item.thumb" />
          </div>
        </div>
        <div class="content">
          <div class="title">
            <slot name="badge"></slot>{{item.goodsName}}
          </div>
          <small v-if="isShowBrief" class="brief">{{item.brief || item.goodsName}}</small>
        </div>
      </a>
      <div class="list-price buy">
        <span class="price-new" :class="{'v-goods-disabled':disabled}">{{item.kehuJifen}}积分</span>
        <slot name="actionIcon"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    disabled: {
      type: Boolean,
      default: false
    },
    isShowBrief: {
      type: Boolean,
      default: true
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.v-goods {
  float: left;
  padding: 6px;
  width: 50%;
  box-sizing: border-box;
  position: relative;
  border: 2px solid #f5f7fa;
}
.inner {
}
.v-goods-disabled {
  opacity: 0.8;
}

.v-goods a {
  display: block;
  text-decoration: none;
  color: #222;
}

.goods-header {
  position: relative;

  .goods-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img[lazy="loading"] {
      background-color: #f1f4f3;
      width: 100% !important;
    }
    img[lazy="error"] {
      width: 200px !important;
    }
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: auto;
      height: auto;
      max-height: 100%;
      max-width: 100%;
    }
  }
}

.v-goods .content {
  .title {
    word-break: break-word;
    white-space: pre-line; //合并空白符序列，但是保留换行符。
    text-align: left;
    margin-top: 10px;
    padding: 0 8px;
    box-sizing: border-box;
    font-size: 30px;
    font-weight: 500;
    color: #303133;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    text-align: center;
    display: -webkit-box;
    // 留着以下注释，否则wenpack打包不上
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
  }
  .brief {
    color: #797d82;
    display: block;
    margin-top: 6px;
    text-align: left;
    font-size: 24px;
    padding: 8px;
    box-sizing: border-box;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}

.list-price {
  height: 68px;
  //   line-height: 70px;
  position: relative;
  bottom: 0;

  display: flex;
  //   align-items: center;

  .price-new {
    flex: 1;
    text-align: left;
    color: rgba(231, 97, 40, 1);
    font-size: 28px;
    text-align: center;
  }
}
</style>
