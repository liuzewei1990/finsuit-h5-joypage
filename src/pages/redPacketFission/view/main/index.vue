<template>
    <div class='index'>
        <!-- 活动规则 -->
        <div class="rule" @click="handleGoRule">活动规则</div>
        <!-- 红包列表 -->
        <div class='listDiv'>
            <list-div></list-div>
        </div>
        <!-- 拼手气 -->
        <div class='luckDiv'>
            <luck-div></luck-div>
        </div>
    </div>
</template>

<script>
import listDiv from "./modules/list";
import LuckDiv from "./modules/Luck";
export default {
    data() {
        return {};
    },
    components: { listDiv, LuckDiv },
    methods: {
        // 活动规则
        handleGoRule() {
            this.$trackEvents.ACB0S003();
            this.$router.push({ path: "/rule" });
        }
    }
};
</script>

<style lang="less" scoped>
.index {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: max-content;
    padding: 0 24px;
    padding-bottom: 48px;
    background: #ff6c46 url(../../assets/images/loginBG.png) no-repeat;
    background-size: contain;
    min-height: 100%;
    .rule {
        width: 154px;
        height: 54px;
        position: absolute;
        top: 10px;
        right: 0;
        line-height: 54px;
        text-align: center;
        background: rgba(245, 80, 65, 1);
        border-top-left-radius: 27px;
        border-bottom-left-radius: 27px;
        color: #fff;
    }
    .listDiv {
        background: rgba(216, 56, 0, 1);
        border-radius: 10px;
        padding: 26px 22px;
        margin-top: 73%;
    }
    .luckDiv {
        background: rgba(216, 56, 0, 1);
        border-radius: 10px;
        padding: 26px 42px;
        margin-top: 28px;
    }
}
</style>
