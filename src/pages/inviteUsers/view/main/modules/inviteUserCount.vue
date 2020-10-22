<template>
  <ModuleBox class="module-inviteUserCount">
    <div class="container">
      <ul>
        <li>
          <p class="count"><span>{{inviteUserCount.userInviteNums}}</span>人</p>
          <span class="type">邀请好友</span>
        </li>
        <li>
          <p class="count"><span>{{inviteUserCount.userAuthNums}}</span>人</p>
          <span class="type">实名好友</span>
        </li>
        <li>
          <p class="count"><span>{{inviteUserCount.userBankNums}}</span>人</p>
          <span class="type">开户好友</span>
        </li>
        <li>
          <p class="count"><span>{{inviteUserCount.userInvestNums}}</span>人</p>
          <span class="type">投资好友</span>
        </li>
      </ul>
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@inviteUsers/components/ModuleBox/index.vue"
import { mapState } from "vuex"
export default {
  components: { ModuleBox },
  computed: {
    ...mapState({
      inviteUserCount: state => state.main.inviteUserCount
    })
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 30px 0;
  box-sizing: border-box;
  ul {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      &:not(:first-of-type) {
        border-left: 2px solid #f5f5f5;
      }
      .count {
        font-size: 26px;
        margin: 7px 0;
      }
      .count span {
        color: #eb4928;
        font-size: 40px;
      }
      .type {
        color: #b5b5b5;
      }
    }
  }
}
</style>
