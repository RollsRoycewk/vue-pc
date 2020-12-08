<template>
  <header class="header">
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您!</p>
          <p v-if="$store.state.user.name">
            <span>{{ $store.state.user.name }}</span>
            &nbsp;
            <button @click="handleExit">退出</button>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="resgis">免费注册</router-link>
          </p>
        </div>
        <div class="infoNav">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
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
        <router-link to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <!-- <form action=""> -->
        <input
          type="text"
          class="searchInput"
          placeholder="三星 苹果 锤子"
          v-model="searchText"
          @keyup="handleSearch"
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
    // 第一种方式
    // handleSearch() {
    //   const { searchText } = this;
    //   const location = searchText ? `/${searchText}` : "";
    //   this.$router.push("/search" + location);
    // },

    // 第三种方式,push也可以传入一个对象,但是使用动态路由要加name属性
    // 只传query可以用path
    // 注意要使用命名路由,而不是path,注意如果是空search就不见了,所以要判断
    handleSearch() {
      const { searchText } = this;
      const location = {
        name: "search",
        // query: {
        //   rolls: "royce",
        // },
      };

      if (searchText) {
        location.params = { searchText };
      }
      const { categoryName } = this.$route.query;
      if (categoryName) {
        location.query = this.$route.query;
      }

      if (this.$route.name === "search") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
    },

    // // 方式二,push传入一个对象
    // handleSearch() {
    //   this.$router.push({
    //     path: "/search",
    //     query: {
    //       name: "rolls",
    //     },
    //   });
    // },

    handleExit() {
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      this.$store.state.user.name = "";
      this.$store.state.user.token = "";
      this.$router.replace("/");
    },
  },
  // 定义清空搜索框的方法,在search组件使用
  mounted() {
    this.$bus.$on("clearSearchText", () => {
      this.searchText = "";
    });
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
