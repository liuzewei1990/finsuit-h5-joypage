<!--  -->
<template>
  <section class='prs-list-page'>
    <div class="list">
      <block v-for="(item,index) in prsData.list" :key="index">
        <PrsItemMax class="mar-bottom-20" :item="item.uiData" v-if="item.ASSEMBLE_TYPE=='1'" @click.native="$checkLogin({action:toPersonalDetail,data:item})"></PrsItemMax>
        <PrsItemMin class="mar-bottom-20" :item="item.uiData" v-if="item.ASSEMBLE_TYPE=='2'" @click.native="$checkLogin({action:toPersonalDetail,data:item})"></PrsItemMin>
      </block>

      <!-- <Loadmore v-show="prsData.list.length > 0" :tip="tipText" :showLoading="false"></Loadmore> -->

      <!-- 数据为空 -->
      <EmptyData class="empty-data" v-show="prsData.isEmpty" descText='<span style="width:3.3rem;display:inline-block;">团生成中，请稍安勿躁 休息一会儿，福利继续</span>' text="" :imgUrl="require('../../../assets/images/empty-data.png')" imgStyle="width:3.5rem;margin:0.2rem auto;"></EmptyData>

    </div>
  </section>
</template>

<script>

import Loadmore from "@common/finsuit-components/Loadmore"
import EmptyData from "@common/finsuit-components/EmptyData"
import { PrsItemMin, PrsItemMax } from "../../../components/PrsItem2.0/index.js"
export default {
  components: { Loadmore, EmptyData, PrsItemMin, PrsItemMax },
  computed: {
    tipText () {
      if (this.prsData.list.length <= 3) return "更多福利，敬请期待";
      if (this.prsData.list.length > 3) return "没有更多啦";
    }
  },
  data () {
    return {
      prsData: {
        isEmpty: false,
        list: []
      },
      loading: this.$Loading({ className: "list-page-loading", iconClass: "list-page-loading-1", isColumn: true, message: "正在加载" })
    };
  },
  created () {
    this.getPersonData();
  },
  mounted () {

  },
  //方法集合
  methods: {
    // 获取拼人数列表数据
    async getPersonData () {
      if (this.loading.isShow) return;
      this.loading.show(false, 0);
      try {
        let params = {};
        let data = await this.$api.getPersonDataNew(params).then(this.$interfaceApi.createPersonUiData);
        this.prsData.list = data;
      } catch (error) { }
      if (this.prsData.list.length === 0) this.prsData.isEmpty = true;

      this.loading.close();
    },

    // 点击产品去拼人数包装页
    toPersonalDetail (item) {
      // 打点
      this.$trackEvents.ACB0P004({ ITEM_VALUE: item.ASSEMBLE_TYPE, ITEM_VALUE1: item.PRD_INDEX_ID, ITEM_VALUE2: item.ID });

      this.$toNewPrdDetail({ activityType: "0", ...item });

    },

    // createPersonUiData (data = {}) {
    //   return data.map(item => {
    //     item.uiData = {};
    //     // 团类型 1：超级团 2：普通团
    //     item.uiData.teamType = item.ASSEMBLE_TYPE;
    //     // 银行名称
    //     item.uiData.orgName = item.ORG_NAME;
    //     // 产品名称
    //     item.uiData.prdName = item.PRD_NAME;
    //     // 利率
    //     item.uiData.prdRate = item.PRD_RATE;
    //     // 加息
    //     item.uiData.couponRate = item.STANDARDS_RATE;
    //     // 利率描述
    //     item.uiData.prdRateText = item.PRD_RATE_NAME;
    //     // 标签
    //     item.uiData.tags = item.LABEL_DESCRIPT_LIST || [];
    //     // 标签描述
    //     item.uiData.tagText = item.aaaa;
    //     // 已参团人数
    //     item.uiData.personNum = Number(item.JOIN_COUNT) || 0;
    //     // 团人数
    //     item.uiData.personTotalNum = Number(item.ASSEMBLE_TOTAL_NUMBERS) || 0;
    //     // 团标签
    //     item.uiData.labelText = item.SUPER_ASSEMBLE_TYPE;

    //     return item;
    //   });
    // }
  },
}
</script>
<style lang='less' scoped>
.prs-list-page {
  font-family: PingFangSC-Regular, PingFang SC;
  padding: 30px 30px;
  box-sizing: border-box;
  .list {
    position: relative;
    min-height: 500px;
  }

  .empty-data {
    background: rgba(0, 0, 0, 0);
  }
}
</style>