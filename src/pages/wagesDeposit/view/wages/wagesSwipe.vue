<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {

}
</script>

<style lang="less">
.mint-swipe {
    width:750px;
    height:580px;
    background:rgba(88,92,101,.5);
    .mint-swipe-indicators {
        top: 374px !important;
        .mint-swipe-indicator {
            width:10px;
            height:10px;
            background:rgba(255,255,255,1);
            border-radius:5px;
            opacity: 1;
        }
        .is-active {
            width:54px;
            height:10px;
            border-radius:5px;
        }
    }
}
</style>
