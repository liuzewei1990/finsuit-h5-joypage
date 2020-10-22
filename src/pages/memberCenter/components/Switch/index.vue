<template>
  <div :class="className" @click="onClick">
    <span class="open"></span>
    <span class="close"></span>
  </div>

</template>

<script>
'use strict';
export default {
  props: {
    value: {
      default: true
    },
    // blue red green orange
    color: {
      type: String,
      default: 'red'
    },
    openValue: {
      default: true
    },
    closeValue: {
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className () {
      let {
        value,
        openValue,
        closeValue,
        color,
        disabled
      } = this;
      return {
        'vue-switch': true,
        'z-on': value === openValue,
        'z-disabled': disabled,
        ['c-' + color]: true
      };
    }
  },
  methods: {
    onClick () {
      let {
        disabled,
        value,
        openValue,
        closeValue
      } = this;
      if (!disabled) {
        if (openValue === value) {
          this.$emit('input', closeValue);
        } else {
          this.$emit('input', openValue);
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 颜色
@c1: #eee;
@c2: #3091f2;
@c3: #f60;
@c4: #0c6;

// 尺寸
@md: 48px;
@lg: 60px;

.vue-switch {
  position: relative;
  display: inline-block;
  width: 78px;
  height: 38px;
  line-height: 20px;
  border-radius: 500px;
  border: 1px solid #d5d5d5;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.21s ease;
  user-select: none;
  overflow: hidden;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  transform: rotate(0deg);

  span {
    position: absolute;
    font-size: 12px;
    left: 25px;
    color: #222;

    &.open {
      display: none;
    }

    &.close {
      display: inline;
    }
  }

  &::after {
    content: "";
    width: 28px;
    height: 28px;
    border-radius: 100px;
    background-color: #a3a7ad;
    position: absolute;
    left: 5px;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    transition: left 0.23s ease, background-color 0.23s ease;
  }

  &:active {
    &::after {
      width: 28px;
    }
  }

  &.z-on {
    background-color: @c1;
    border-color: @c1;

    &.c-blue {
      background-color: @c2;
      border-color: @c2;
    }

    &.c-orange {
      background-color: @c3;
      border-color: @c3;
    }

    &.c-green {
      background-color: @c4;
      border-color: @c4;
    }

    span {
      color: #fff;
      left: 10px;

      &.open {
        display: inline;
      }

      &.close {
        display: none;
      }
    }

    &::after {
      left: 45px;
      background-color: #508cee;
    }
  }
}
</style>
