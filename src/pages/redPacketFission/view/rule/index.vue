<template>
    <div class="rule-box">
        <img class="rule-img" src="../../assets/images/rule.png" alt />
        <div class="rule-conent" v-html="html">{{html}}</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            html: ""
        };
    },
    created () {
        this.getRuleMsg();
    },
    methods: {
        // 获取活动规则
        async getRuleMsg () {
            try {
                let params = {
                    CODE: this.$Config.actityCode,
                    APP_FLAG:this.$store.state.FROM_APP_FLAG
                };
                let data = await this.$api.getRuleMsg(params);
                this.html = data.RULE_CONTENT;
                console.log("获取活动规则：", data);
            } catch (error) {
                console.log("获取活动规则：", error);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.rule-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 10px;
    padding-bottom: 46px;
    background: linear-gradient(
        180deg,
        rgba(255, 115, 84, 1) 0%,
        rgba(254, 66, 82, 1) 100%
    );
    height: max-content;
    min-height: 100%;
    .rule-img {
        width: 543px;
        height: 137px;
        margin: 0 auto;
        margin-top: 10px;
    }
    .rule-conent {
        width: 702px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 31px 31px;
        margin-top: -54px;
        background: rgba(255, 255, 255, 1);
        border-radius: 20px;
        border: 6px solid rgba(255, 194, 180, 1);
    }
}
</style>
