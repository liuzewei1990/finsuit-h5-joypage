<template>
    <div class="weui-grids" :class="{
      'vux-grid-no-lr-borders': !showLrBorders,
      'no-border':noBorder
    }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'grid',
    methods: {
        countColumn() {
            this.childrenSize = this.$children.length
            this.$children.forEach((c, index) => (c.index = index))
        }
    },
    props: {
        rows: {
            type: Number,
            validator() {
                /* istanbul ignore if */
                if (process.env.NODE_ENV === 'development') {
                    console.warn('[VUX warn] Grid rows 属性已经废弃，使用 cols 代替。单行列数为自动计算')
                }
                return true
            }
        },
        cols: {
            type: Number
        },
        showLrBorders: {
            type: Boolean,
            default: true
        },
        showVerticalDividers: {
            type: Boolean,
            default: true
        },
        noBorder: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        column() {
            return this.cols || this.childrenSize
        }
    },
    data() {
        return {
            childrenSize: 3
        }
    }
}
</script>
<style lang="less" scoped>
@import "./border-1px.less";

.weui-grids.vux-grid-no-lr-borders {
  &:after {
    display: none;
  }
}

.weui-grids {
  position: relative;
  overflow: hidden;
  background: #fff;

  &:before {
    .setTopLine(#ccc);
  }
  &:after {
    .setLeftLine(#ccc);
  }
}

.no-border {
  &::before {
    display: none;
  }

  &:after {
    display: none;
  }
  .weui-grid {
    &::before {
      display: none;
    }

    &:after {
      display: none;
    }
  }
}
</style>
