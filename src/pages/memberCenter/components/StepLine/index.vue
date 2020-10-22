<!--  -->
<template>
  <section class='step-line' :class="{leftLine,rightLine,active}">

  </section>
</template>

<script>

export default {
  props: ["leftLine", "rightLine", "active"],
  components: {},
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {

  },
}
</script>
<style lang='less' scoped>
.step-line {
  width: 16px;
  height: 16px;
  border-radius: 500px;
  background: linear-gradient(
    180deg,
    rgba(249, 176, 73, 1) 0%,
    rgba(249, 110, 76, 1) 100%
  );
  position: absolute;
  z-index: 1;

  &::before,
  &::after {
    content: "";
    display: none;
    width: 40px;
    height: 2px;
    background: linear-gradient(
      180deg,
      rgba(249, 176, 73, 1) 0%,
      rgba(249, 109, 74, 1) 100%
    );
    position: absolute;
    top: 8px;
    z-index: -1;
  }
  &::before {
    right: 16px;
  }

  &::after {
    left: 16px;
  }
}
.leftLine {
  &::before {
    display: block;
  }
}
.rightLine {
  &::after {
    display: block;
  }
}
.active {
  background: #d8d8d8;
  &::before,
  &::after {
    background: #d8d8d8;
  }
}
</style>