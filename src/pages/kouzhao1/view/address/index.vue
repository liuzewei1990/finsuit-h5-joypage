<!-- 地址填写 -->
<template>
  <section class="address">
    <div class="view mar-top-30">
      <Cell class="cell-row" title="请选择" :topLine="true" :isLink="true" @click.native="$refs.City.open()">
        <span slot="desc" class="desc" v-if="formData.district" style="color:#000;">{{formData.district}}</span>
        <span slot="desc" class="desc" v-else style="color:#909499;">点击选择</span>
      </Cell>

      <Cell class="cell-row" title="详细地址" :topLine="true"></Cell>

      <div class="textarea">
        <textarea v-model="formData.detailAddress" v-wxBlur name placeholder="请输入详细地址" maxlength="50"></textarea>
      </div>

      <Cell class="cell-row" title="收货人" :topLine="true">
        <span class="input-wrapper" slot="desc">
          <input v-model="formData.addressee" v-wxBlur type="text" placeholder="请填写收货人姓名" maxlength="20" />
        </span>
      </Cell>

      <Cell class="cell-row" title="手机号" :topLine="true">
        <span class="input-wrapper" slot="desc">
          <input v-model="formData.contactPhone" v-wxBlur type="tel" placeholder="请填写收货人手机号码" maxlength="11" />
        </span>
      </Cell>
    </div>

    <Button class="submit-btn" :disabled="btnDisabled || btnLoading" :show-loading="btnLoading" @click.native="submit">提交地址，领取口罩</Button>

    <!-- 城市选择器 -->
    <City :init-value="defaultCityVal" @confirm="cityConfirm" ref="City"></City>
  </section>
</template>

<script>
import Cell from "../../components/Cell";
import Textarea from "../../components/Textarea";
import Button from "@common/finsuit-components/Button";

const City = () =>
  import(/* webpackChunkName: "city" */ "../../components/City");
export default {
  components: { Cell, Textarea, Button, City },
  data () {
    return {
      // 默认城市选中
      defaultCityVal: [
        {
          name: "北京",
          value: "110000"
        },
        {
          name: "北京市",
          value: "110100"
        },
        {
          name: "昌平区",
          value: "110114"
        }
      ],

      // 校验规则
      formRule: [
        {
          name: "district",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "请选择地区"
        },
        {
          name: "detailAddress",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "请填写详细地址"
        },
        {
          name: "addressee",
          checkType: "string",
          checkRule: "2,20",
          errorMsg: "请输入姓名"
        },
        {
          name: "contactPhone",
          checkType: "phoneno",
          checkRule: "",
          errorMsg: "手机号格式不正确"
        }
      ],

      // 表单数据
      formData: {
        district: "",
        detailAddress: "",
        addressee: "",
        contactPhone: ""
      },

      // 提交loading
      btnLoading: false,

      // 来源页面code
      fromCode: this.$route.query["fromCode"]
    };
  },
  computed: {
    btnDisabled () {
      let res = this.$formChecker.check(this.formData, this.formRule);
      return !res;
    }
  },
  mounted () {
    // 打点
    this.$trackEvents.ACB0Y008({ ITEM_VALUE: this.fromCode });
  },
  //方法集合
  methods: {
    // 城市选择
    cityConfirm (v) {
      this.formData.district = v[0].name + "-" + v[1].name + "-" + v[2].name;
    },

    // 提交
    submit () {
      let res = this.$formChecker.check(this.formData, this.formRule);
      if (!res) {
        this.$Toast(this.$formChecker.error);
        return;
      }
      this.$iosConfirm({
        title: "确认提交",
        text: "要不要再检查一下，提交地址后不可更改哦",
        cancelText: "取消",
        okText: "确认"
      })
        .then(this.submitAddress)
        .catch(() => {
          console.log("取消");
        });
    },

    // 提交请求
    async submitAddress () {
      // 打点
      this.$trackEvents.ACB0Y009({ ITEM_VALUE: this.fromCode });

      this.btnLoading = true;
      try {
        let params = JSON.parse(JSON.stringify(this.formData));
        let data = await this.$api.submitAddress(params);
        this.formData = {};
        this.$Toast("提交地址成功");
        setTimeout(() => {
          // 这里返回到活动首页
          if (this.fromCode === "pincai") {
            // 活动主页面url中需要包含?page_id=kouzhao参数
            this.$bcBridge.backToPrevisouPageWithPageId({ page_id: "kouzhao" });
            // this.$bcBridge.gotoMainActivityPage()
            // this.$bcBridge.gotoMainPage()
          } else {
            // 后退一个
            this.$bcBridge.gotoPreviousPage();
          }
        }, 2000);
      } catch (error) { }
      this.btnLoading = false;
    }
  }
};
</script>
<style lang='less' scoped>
.address {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  .view {
    padding: 0 30px;
    background: #fff;
  }
  .cell-row {
    .desc {
      flex: 3;
    }
  }
  .cell-row {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    .input-wrapper {
      flex: 3;
      input {
        width: 100%;
        text-align: right;
        font-size: 32px;
      }
    }
  }
  .textarea {
    height: 164px;
    overflow: hidden;
    border-radius: 5px;
    textarea {
      width: 100%;
      height: 100%;
      font-size: 32px;
      background: #f5f7fa;
      padding: 10px;
      box-sizing: border-box;
    }
  }

  .submit-btn {
    width: 686px;
    margin: 128px auto;
    background: #508cee;
    font-size: 36px;
    color: #fff;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 98px;
    border-radius: 4px;
    font-weight: normal;
  }
}
</style>