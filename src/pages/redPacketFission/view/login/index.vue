<template>
    <div class="login-box">
        <div class="img-box">
            <img src="../../assets/images/loginBG.png" alt />
            <div class="rule" @click="handleGoRule">活动规则</div>
        </div>
        <div class="content">
            <input type="text" v-wxBlur class="phone" placeholder="请输入手机号码" oninput='if(value.length > 11) value = value.slice(0, 11)' v-model="number" />
            <div class="code clearfloat">
                <input type="number" v-wxBlur class="code-txt float-left" placeholder="请输入短信验证码" oninput='if(value.length > 6) value = value.slice(0, 6)' v-model="code" />
                <button @click="handleGetCode" class="float-right code-btn" :class="getCodeFlag  ? 'code-btn-false' : 'code-btn-true'" :disabled="getCodeFlag">{{btn.txt}}</button>
            </div>
            <button class="login-btn" @click="handleLogin">登录并领取</button>
        </div>
    </div>

</template>

<script>
export default {
    components: {},
    data() {
        return {
            btn: {
                txt: "获取验证码"
            },
            code: "", //验证码
            getCodeFlag: true, //获取验证码节流
            number: "", //手机号码
            Loading: this.$Loading(),
            numberFlag: false //验证码按钮校验
        };
    },
    watch: {
        number() {
            if (this.number.length == 11  && !this.numberFlag) {
                this.getCodeFlag = false;
            } else {
                this.getCodeFlag = true;
            }
        }
    },
    created() {
        this.$trackEvents.ACB0S001();
    },
    methods: {
        //获取验证码
        async handleGetCode() {
            try {
                if (!this.number) {
                    this.$Toast("请填写手机号");
                } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.number)) {
                    this.$Toast("请填写正确的手机号");
                } else {
                    this.Loading.show();
                    this.getCodeFlag = true;
                    this.numberFlag = true;
                    let params = {
                        SAFT_CODE: "",
                        PHONE_NUM: this.number,
                        CHECK_SAFT_CODE_FLAG: "1",
                        APP_FLAG:this.$store.state.FROM_APP_FLAG
                    };
                    let head = {
                        APP_FLAG:"OUT_SIDE"
                    };
                    let data = await this.$api.getCode(params,head);
                    console.log("获取验证码：", data);
                    if (data.head.CODE == "0") {
                        this.session_id = data.head.SESSION_ID;
                        let n = 60;
                        let _this = this;
                        _this.numberFlag = true;
                        let timer = setInterval(function() {
                            _this.btn.txt = --n + "秒";
                        }, 1000);
                        setTimeout(() => {
                            _this.btn.txt = "重新获取";
                            _this.getCodeFlag = false;
                            _this.numberFlag = false;
                            clearInterval(timer);
                        }, n * 1000);
                    }

                }
            } catch (error) {
                console.error("获取验证码：", error);
            }
            this.Loading.close();
        },
        // 登陆
        async handleLogin() {
            try {
                if (this.session_id) {
                    let params = {
                        PHONE_NUM: this.number,
                        PHONE_CODE: this.code,
                        HD_CODE: this.$Config.actityCode,
                        APP_FLAG:this.$store.state.FROM_APP_FLAG
                    };
                    let head = {
                        SESSION_ID: this.session_id,
                        APP_FLAG:"OUT_SIDE"
                    };
                    let data = await this.$api.goLogin(params, head);
                    console.log("登陆信息：", data);
                    let userInfo = {
                        ID: data.data.ID,
                        PHONE_NUM: data.data.PHONE_NUM,
                        TOKEN: data.head.TOKEN,
                        SESSION_ID: data.head.SESSION_ID,
                        DEVICE_ID: data.head.DEVICE_ID,
                        SYSTEM_TYPE: data.data.SYSTEM_TYPE,
                        OPEN_API_CHANNEL_ID: data.data.OPEN_API_CHANNEL_ID,
                        APP_FLAG:"OUT_SIDE"
                    };
                    this.$store.commit("USER_LOGIN", userInfo);
                    localStorage.setItem("TOKEN", data.head.TOKEN);
                    if (data.head.CODE == "0") {
                        this.$trackEvents.ACB0S002();
                        this.$router.replace({path:"/",query:this.$route.query});
                    } else {
                        this.$Toast(data.head.MSG);
                    }
                }else {
                    this.$Toast("请先获取验证码");
                }
            } catch (error) {
                console.log("登陆：", error);
            }
        },
        // 活动规则
        handleGoRule() {
            this.$trackEvents.ACB0S003();
            this.$router.push({ path: "/rule" });
        }
    }
};
</script>

<style lang="less" scoped>
.login-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ff6c46;
    .img-box {
        height: 848px;
        position: relative;
        img {
            width: 100%;
            height: 848px;
        }
    }
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
    .content {
        width: 100%;
        padding-top: 34px;
        text-align: center;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        background-color: #ff6c46;
        input {
            padding-left: 35px;
            box-sizing: border-box;
            border-radius: 10px;
            font-size: 32px;
            color: rgba(153, 153, 153, 1);
        }
        .login-btn {
            width: 620px;
            height: 88px;
            margin-top: 30px;
            margin-bottom: 64px;
            font-size: 32px;
            font-weight: 500;
            border-radius: 8px;
            color: #fff;
            background: linear-gradient(
                180deg,
                rgba(255, 199, 0, 1) 0%,
                rgba(255, 162, 0, 1) 100%
            );
        }
        .phone {
            width: 620px;
            height: 108px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
        }
        .code {
            width: 620px;
            height: 108px;
            margin: 0 auto;
            margin-top: 30px;
            border-radius: 10px;
            background: #fff;
            vertical-align: middle;
            .code-txt {
                height: 100%;
                width: 50%;
            }
            .code-btn {
                width: 176px;
                height: 62px;
                line-height: 62px;
                margin-right: 32px;
                margin-top: 4%;
                padding: 0 14px;
                white-space: nowrap;
                border-radius: 6px;
                font-size: 30px;
                color: #fff;
            }
            .code-btn-true {
                background: rgba(255, 195, 0, 1);
            }
            .code-btn-false {
                opacity: 0.5;
                background: gray;
                // filter: grayscale(100%);
                // filter: gray;
            }
        }
    }
}
.float-left {
    float: left;
}
.float-right {
    float: right;
}
.clearfloat:after {
    display: block;
    content: "";
    clear: both;
}
</style>
