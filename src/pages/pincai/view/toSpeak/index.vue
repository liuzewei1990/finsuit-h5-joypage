<template>
    <div class="content">
        <textarea v-model="text" placeholder="您的意见反馈，经客服审核通过后，会在首页展示"></textarea>
        <button class="submit-btn" @click="handleSubmit">完成</button>
        <div class="bottom-content" v-show="showBoot">
            <p>客服微信：bicaikefu</p>
            <p v-show="SERVICE_PHONE_SHOW">
                <span class="css-line"></span>
                <span class="css-fang"></span>
                <span class="css-center">
                    客服电话：
                    <a :href="'tel:'+ SERVICE_PHONE_CALL">{{SERVICE_PHONE_SHOW}}</a>
                </span>
                <span class="css-fang"></span>
                <span class="css-line"></span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showBoot: true,
            text: "",//反馈内容
            SERVICE_PHONE_CALL: this.$route.query.PHONE_CALL,
            SERVICE_PHONE_SHOW: this.$route.query.PHONE_SHOW
        }
    },
    created () {
    },
    mounted () {
        let height = document.documentElement.clientHeight
        window.addEventListener('resize', () => {
            let dynamicHeight = document.documentElement.clientHeight
            if (dynamicHeight < height) {
                this.showBoot = false
            } else {
                this.showBoot = true
            }
        })
    },
    methods: {
        async handleSubmit () {
            if (!this.text) {
                this.$Toast('输入内容不能为空');
                return
            }
            let params = {
                SUGGEST: this.text,
            }
            let data = await this.$api.handleSubmit(params);
            this.$Toast('反馈成功');
            setTimeout(() => {
                this.$bcBridge.gotoMainPage();
            }, 1000)
        }
    }
}
</script>

<style lang="less" scoped>
.content {
    background: #f5f5f5;
    height: 100vh;
    textarea {
        display: block;
        width: 690px;
        height: 280px;
        margin: 0 auto;
        margin-top: 20px;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 26px;
        font-family: "Microsoft YaHei";
        resize: none;
        background: #fff;
        color: #999;
    }
    .submit-btn {
        display: block;
        width: 690px;
        height: 88px;
        line-height: 88px;
        margin: 40px auto 0;
        font-size: 32px;
        text-align: center;
        border-radius: 4px;
        background: #508cee;
        color: #fff;
    }
    .bottom-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        padding-bottom: 80px;
        order: 4;
        line-height: 0.5rem;
        text-align: center;
        font-size: 24px;
        color: #cdd1da;
        .css-line {
            display: inline-block;
            width: 100px;
            height: 2px;
            margin-top: -2px;
            vertical-align: middle;
            background: #e5e8f0;
        }
        .css-fang {
            display: inline-block;
            width: 16px;
            height: 16px;
            transform: rotate(45deg);
            background: #e5e8f0;
        }
        .css-center {
            padding: 0 10px;
            a {
                color: #508cee;
            }
        }
    }
}
</style>
