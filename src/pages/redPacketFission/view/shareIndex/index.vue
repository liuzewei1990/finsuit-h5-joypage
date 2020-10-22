<template>
    <div id="imgShare">
        <div class="topImg">
            <img ref="BGImg" src="@redPacketFission/assets/images/BG.png" alt />
        </div>
        <div class="contianer">
            <div class="first">
                <img src="@redPacketFission/assets/images/ZUI.png" alt />
                <img src="@redPacketFission/assets/images/GAOTXT.png" alt />
                <span>{{userInfo.AMOUNT}}</span>
                <img src="@redPacketFission/assets/images/YUAN.png" alt />
            </div>
            <div class="third">
                <img class="JUANImg" ref="JUANImg" src="@redPacketFission/assets/images/JUAN.png" alt />
                <img class="qrcodeSrc" :src="qrcodeSrc" alt />
                <img class="icon" src="@redPacketFission/assets/images/bicai.png" alt />
            </div>
            <p>【长按二维码领取福利】</p>
        </div>
        <div class="user">
            <img :src="$Config.aliyuncHost +  userInfo.HEAD_IMG" alt />
            <span>{{userInfo.AUTH_NAME}}邀请你领红包</span>
        </div>
    </div>
</template>

<script>
import QRCode from "qrcode";
import html2canvas from "html2canvas";
export default {
    components: {},
    data() {
        return {
            qrcodeSrc: "", //二维码地址
            userInfo: {
                MAIN_TITLE: null,
                VICE_TITLE: null,
                AMOUNT: "35",
                AUTH_NAME: "139****9502",
                HEAD_IMG: "头像"
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.allPromise();
        });
    },
    methods: {
        // 所有promise all
        allPromise() {
            let _this = this;
            // 判断图片是否加载完成
            let ImgLoad = new Promise((resolve, reject) => {
                let count = 0;
                let imgList = [_this.$refs["JUANImg"], _this.$refs["BGImg"]];
                for (let img of imgList) {
                    console.log(img);
                    img.onload = () => {
                        count += 1;
                        console.log(count);
                        if (count == imgList.length) {
                            resolve(imgList);
                        }
                    };
                }
            });
            // 个人信息接口
            let GetInfoData = new Promise((resolve, reject) => {
                this.$api.getUserInfo().then(res => {
                    console.log("个人信息：", res);
                    if (res.head.CODE == "0") {
                        this.userInfo = res.data;
                        this.generateQRCode(this.userInfo);
                        resolve();
                    }
                });
            });
            let promiseArr = [ImgLoad, GetInfoData];
            Promise.all(promiseArr).then(res122 => {
                setTimeout(() => {
                    this.autoHtml2canvas();
                }, 1000);
            });
        },
        // 生成二维码
        generateQRCode(data) {
            // 二维码&链接
            let _this = this;
            let url = this.$Config.resPacketServerHost;
            url += "#/";
            url += `?FROM_APP_FLAG=${this.$store.state.APP_FLAG}`;
            url += `&ACTITY_ID=${this.$store.state.ACTITY_ID}`;
            url += `&SHARE_MEMBER_ID=${data.SHARE_MEMBER_ID}`;
            url += `&SHARE_DATE=${data.SHARE_DATE}`;
            console.log("二维码地址", url);
            QRCode.toDataURL(
                url,
                {
                    margin: 1
                },
                function(err, url) {
                    _this.qrcodeSrc = url;
                }
            );
        },
        // 截要分享的图片
        autoHtml2canvas() {
            html2canvas(document.getElementById("imgShare"), {
                scale: 1,
                useCORS: true
            }).then(function(canvas) {
                var context = canvas.getContext("2d");
                var testImg = canvas.toDataURL("image/jpeg", 1);
                // console.log("baseImg::完成");
                window.parent.postMessage(
                    { message: "html2canvasCallBack", data: testImg },
                    "*"
                );
            });
        }
    }
};
</script>

<style lang="less" scoped>
p {
    font-size: 34px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 48px;
    margin-top: 60px;
    text-align: center;
}
#imgShare {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #ff7649;
}
.topImg {
    width: 100%;
    // height: 75%;
    img {
        width: 100%;
        height: 100%;
    }
}
.contianer {
    position: absolute;
    top: 8vh;
    left: 0;
    right: 0;
    min-height: 736px;
}
.first {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    img {
        width: 11.5vw;
        height: 13vw;
        margin: 10px 2px 0 2px;
    }
    span {
        font-size: 130px;
        font-weight: 600;
        color: rgba(255, 232, 171, 1);
        text-shadow: 0 8px 0 rgba(0, 0, 0, 0.3);
        padding: 0 4px;
        margin-top: -6px;
    }
}
.second {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;
    position: relative;
    z-index: 2;
    img {
        width: 580px;
        height: 86px;
    }
}
.third {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: -2vh;
    position: relative;
    .JUANImg {
        width: 100%;
    }
    .qrcodeSrc {
        position: absolute;
        width: 42vw;
        height: 42vw;
        bottom: 23%;
    }
    .icon {
        position: absolute;
        width: 12vw;
        height: 12vw;
        bottom: 35%;
    }
}
.user {
    position: fixed;
    top: 32px;
    left: 34px;
    font-size: 30px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fff;
    img {
        width: 40px;
        height: 40px;
        display: inline-block;
        border-radius: 50%;
    }
}
</style>
