<template>
  <div>
    Login
    <el-button type="warning" @click="handleLoginAsync">按钮</el-button>
  </div>
</template>

<script>
import { loginAsync } from "@api/use";

export default {
  name: "Login",
  methods: {
    handleLoginAsync() {
      loginAsync({
        phone: "13700000000",
        password: "1111112",
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
