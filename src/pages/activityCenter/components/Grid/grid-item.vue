<template>
  <a href="javascript:;" class="weui-grid" :class="{
      'vux-grid-item-no-border': (isLast && !$parent.showLrBorders) || (!isLast && !$parent.showVerticalDividers),
    }" @click="onClick" :style="style">
    <div class="weui-grid__icon" v-if="hasIconSlot || icon">
      <slot name="icon">
        <img :src="icon" alt="">
      </slot>
      <!-- <sup v-if="badge">
                <Badge :text="badge"></Badge>
            </sup> -->
    </div>
    <p v-if="hasLabelSlot || label" class="weui-grid__label">
      <slot name="label">
        <span v-html="label"></span>
      </slot>
    </p>
    <slot></slot>
  </a>
</template>

<script>

export default {
  name: 'grid-item',
  props: ['icon', 'label'],
  created () {
    this.$parent.countColumn()
  },
  mounted () {
    this.$slots.icon && (this.hasIconSlot = true)
    this.$slots.label && (this.hasLabelSlot = true)
  },
  destroyed () {
    this.$parent.countColumn()
  },
  computed: {
    isLast () {
      return !((this.index + 1) % this.$parent.column)
    },
    style () {
      const column = this.$parent.column
      // if (!column || column === 3) {
      //   return
      // }

      if (!column) {
        return
      }

      const styles = {}
      styles.width = `${100 / column}%`
      return styles
    }
  },
  methods: {
    onClick () {
      this.$emit('on-item-click')
    }
  },
  data () {
    return {
      index: 0,
      hasIconSlot: false,
      hasLabelSlot: false
    }
  }
}
</script>

<style lang="less" scoped>
@import "./border-1px.less";

.weui-grid.vux-grid-item-no-border {
  &:before {
    display: none;
  }
}

.weui-grid {
  position: relative;
  float: left;
  padding: 20px 0;
  box-sizing: border-box;
  color: #000;
  text-decoration: none;

  &:before {
    .setRightLine(#ccc);
  }
  &:after {
    .setBottomLine(#ccc);
  }

  &:active {
    // background-color: rgb(233, 233, 233);
  }
}

.weui-grid__icon {
  width: 52px;
  height: 52px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  & + .weui-grid__label {
    margin-top: 5px;
  }

  sup {
    position: absolute;
    top: 0px;
    left: 80%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 101;
  }
}

.weui-grid__label {
  margin: 0;
  display: block;
  text-align: center;
  white-space: nowrap;
  // color: #222;
  // font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
