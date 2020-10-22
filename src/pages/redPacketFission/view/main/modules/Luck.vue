<template>
    <div class="luck">
        <div class="titleLuck">
            <span class="bar">//////////////</span>
            <span class="txt">看看大家的手气</span>
            <span class="bar">//////////////</span>
        </div>
        <ul>
            <li class="listItem" v-for="(item,index) in listData" :key="index">
                <img style="width:80p" :src="$Config.aliyuncHost + item.HEAD_ING_URL" alt />
                <div>
                    <span class="phone">{{item.PHONE_NUM}}</span>
                    <span class="time">{{item.CREATE_TIME}}</span>
                </div>
                <span>{{item.AMOUNT}}元</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listData: []
        };
    },
    created() {
        this.getLuckList();
    },
    methods: {
        async getLuckList() {
            let params = {
                SHARE_MEMBER_ID: this.$localStore.get("SHARE_MEMBER_ID") || "",
                SHARE_DATE: this.$localStore.get("SHARE_DATE") || "",
                APP_FLAG:this.$store.state.FROM_APP_FLAG
            };
            let data = await this.$api.getLuckList(params);
            this.listData = data.BLAST_FLOW;
            console.log("排行榜数据：", data);
        }
    }
};
</script>

<style lang="less" scoped>
.luck {
    .titleLuck {
        text-align: center;
        width: 100%;
        display: flex;
        .txt {
            font-size: 32px;
            color: rgba(255, 255, 255, 1);
            line-height: 44px;
            flex: 1;
        }
        .bar {
            font-size: 20px;
            color: rgba(255, 255, 255, 1);
            line-height: 44px;
        }
    }
    .listItem {
        display: flex;
        align-items: center;
        margin-top: 38px;
        img {
            width: 80px;
            height: 80px;
            border-radius: 100%;
            border: 1px solid #fff;
            margin-right: 18px;
        }
        > div {
            display: inline-flex;
            flex-direction: column;
            flex: 1;
            span {
                color: #fff;
            }
            .phone {
                font-size: 32px;
                color: rgba(255, 255, 255, 1);
                line-height: 44px;
            }
            .tiem {
                font-size: 24px;
                color: rgba(255, 255, 255, 1);
                line-height: 34px;
            }
        }
        > span {
            font-size: 40px;
            color: rgba(255, 255, 255, 1);
            line-height: 56px;
        }
    }
}
</style>
