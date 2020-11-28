<template>
  <div>
    Login
    <button @click="handleLoginAsync">按钮</button>
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
        password: "111111",
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
