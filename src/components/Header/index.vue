<template>
  <header class="header">
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您!</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <a href="###" class="resgis">免费注册</a>
          </p>
        </div>
        <div class="infoNav">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>

    <div class="header-bottom">
      <h1 class="logoSearch">
        <a href="##">
          <img src="./images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <!-- <form action=""> -->
        <input
          type="text"
          class="searchInput"
          placeholder="三星 苹果 锤子"
          v-model="searchText"
        />
        <button class="searchBtn" @click="handleSearch">搜索</button>
        <!-- </form> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    handleSearch() {
      const { searchText } = this;
      const location = searchText ? `/${searchText}` : "";
      this.$router.push("/search" + location);
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  // height: 30px;
  background-color: #eaeaea;
}
.container {
  width: 1200px;
  height: 30px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loginList {
  display: flex;
  p:nth-child(1) {
    margin-right: 10px;
  }
}
.resgis {
  border-left: 1px solid #b3aeae;
  margin-left: 5px;
  padding-left: 5px;
}
.infoNav {
  a {
    padding: 0 10px;
    border-right: 1px solid #b3aeae;
  }
  a:last-child {
    border: none;
  }
}
.header-bottom {
  height: 106px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.searchInput {
  text-indent: 10px;
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  border: 2px solid #ea4a36;
  outline: none;
}
.searchBtn {
  width: 68px;
  height: 32px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  outline: none;
  cursor: pointer;
}
</style>
