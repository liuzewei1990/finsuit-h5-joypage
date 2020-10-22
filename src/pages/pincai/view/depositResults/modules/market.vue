<template>
    <div class="main-market" v-show="list.length">
        <div class='name'>{{title}}</div>
        <div class="market-box dev">
            <!-- 小于等于两条时 展示宽版，大于两条时展示，前两条宽版，剩余窄版 -->

            <div class="item dev" :class="(list.length === 2 || index === 0)?'item-max':'item-min'" v-for="(item,index) in list" :key="index" @click="clickItem(item,index)" v-track:ACB0T007.click="{handleClick:()=>{},item}">
                <img :src="$Config.aliyuncHost + item.ACT_IMG_URL" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 模块标题
            title: "",
            // 活动列表
            list: [],
            // 当前点击item
            currClickItem: {},
            clickItemLoading: this.$Loading()
        };
    },
    props: ["activity_code"],
    created () {
        this.getActivityList();
    },
    methods: {
        // 获取精彩活动列表
        async getActivityList () {
            try {
                let params = {
                    ACTITY_CODE: this.activity_code
                };
                let data = await this.$api.getActivityList(params);
                console.log("获取精彩活动列表：", data);
                this.title = data.ACTIVITY_FIELD_CONFIG || "精彩活动";
                let list = data.FIELD_DATA || [];
                list.sort(
                    (a, b) => a.ACTIVITY_FIELD_SORT - b.ACTIVITY_FIELD_SORT
                );
                this.list = list;
            } catch (error) {
                console.error("获取精彩活动列表：", error);
            }
        },

        // 点击活动跳转链接
        clickItem (item, index) {
            // 如果没有IMG_LINK_URL 链接地址 判定为最后一个不可点击
            if (!item.IMG_LINK_URL) return;
            if (this.clickItemLoading.isShow) return;
            this.clickItemLoading.show();
            this.currClickItem = item;
            let url = "";
            if ((item.IMG_LINK_URL + "").indexOf("http") === 0) {
                url = item.IMG_LINK_URL;
            } else {
                url =
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    item.IMG_LINK_URL;
            }
            // 拼财和比财APP 活动跳转
            if (
                this.$store.state.APP_FLAG === "BC" ||
                this.$store.state.APP_FLAG === "PC"
            ) {
                this.$bcBridge.openWebview(url);
            } else {
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
            }
            this.clickItemLoading.close(1000);
        }
    }
};
</script>

<style lang="less" scoped>
.name {
    // padding-left: 12px;
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
    line-height: 52px;
    padding-bottom: 16px;
}
.main-market {
    background: #fff;
    padding: 26px;
    box-sizing: border-box;
}

.market-box {
}

.market-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
        width: 100%;
        height: 100%;
    }

    .item {
        border-radius: 10px;
        overflow: hidden;
    }

    .item-max {
        width: 698px;
        height: 180px;
        border-radius: 12px;
        margin-bottom: 20px;
    }

    .item-min {
        // width: 339px;
        width: 48.5%;
        height: 180px;
        border-radius: 12px;
        margin-bottom: 20px;
    }
}
</style>
