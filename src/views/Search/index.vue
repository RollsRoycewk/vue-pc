<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="options.keyword" @click="delKeyword">
              {{ options.keyword }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-show="options.categoryName"
              @click="delcategoryName"
            >
              {{ options.categoryName }}<i>×</i>
            </li>
            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              品牌:{{ options.trademark.split(":")[1] }}<i>×</i>
            </li>

            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="prop"
              @click="delProp(index)"
            >
              {{ prop.split(":")[2] }}:{{ prop.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addTrademark="addTrademark" @add-prop="addProp" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 综合排序 -->
                <li :class="{ active: isOrderId('1') }" @click="setOrder('1')">
                  <a
                    >综合
                    <i
                      :class="{
                        iconfont: true,
                        'icon-direction-down': compuShow,
                        'icon-direction-up': !compuShow,
                      }"
                    ></i>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <!-- 价格排序 -->
                <li @click="setOrder('2')" :class="{ active: isOrderId('2') }">
                  <a
                    >价格
                    <span>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-arrow-up-filling': true,
                          deactive: isOrderId('2') && productShow,
                        }"
                      ></i>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-arrow-down-filling': true,
                          deactive: isOrderId('2') && !productShow,
                        }"
                      ></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"
                      ><img :src="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;&nbsp;&nbsp;</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link
                      :to="`/detail/${goods.id}`"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{
                        (Math.random() * 10000 + 1000).toString().slice(0, 4)
                      }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <!-- <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div> -->

            <!-- elmentUI 分页器 -->
            <div class="block">
              <!-- <span class="demonstration">完整功能</span> -->
              <el-pagination
                background
                :pager-count="5"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="options.pageNo"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="options.pageSize"
                layout=" prev, pager, next, jumper,total, sizes"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapActions } from "vuex";

import TypeNav from "@components/TypeNav";

export default {
  name: "Search",
  data() {
    return {
      options: {
        category1Id: "", // 一级分类id
        category2Id: "", // 二级分类id
        category3Id: "", // 三级分类id
        categoryName: "", // 分类名称
        keyword: "", // 搜索内容（搜索关键字）
        order: "1:desc", // 排序方式：1：综合排序  2：价格排序   asc 升序  desc 降序
        pageNo: 1, // 分页的页码（第几页）
        pageSize: 10, // 分页的每页商品数量
        props: [], // 商品属性
        trademark: "", // 品牌
      },
      // 综合排序图标显示
      compuShow: true,
      // 价格排序显示
      productShow: false,
    };
  },
  computed: {
    ...mapGetters(["goodsList", "total"]),
  },
  methods: {
    ...mapActions(["getProductList"]),
    updataProductList() {
      const { searchText: keyword } = this.$route.params;
      const {
        categoryName,
        category2Id,
        category1Id,
        category3Id,
      } = this.$route.query;

      const options = {
        ...this.options,
        keyword,
        categoryName,
        category2Id,
        category1Id,
        category3Id,
      };

      // 代理这个数据
      this.options = options;
      this.getProductList(options);
    },
    // 删除关键字
    delKeyword() {
      this.options.keyword = "";
      // 清空搜索框
      this.$bus.$emit("clearSearchText");
      // 删除以后需要重新发送请求
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
    },
    delcategoryName() {
      this.options.categoryName = "";
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";

      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    // 添加品牌
    addTrademark(trademark) {
      // bug优化
      if (this.options.trademark) return;
      this.options.trademark = trademark;
      this.updataProductList();
    },
    // 删除品牌
    delTrademark() {
      this.options.trademark = "";
      this.updataProductList();
    },
    // 添加品牌属性
    addProp(prop) {
      // bug解决
      if (this.options.props.indexOf(prop) > -1) return;
      this.options.props.push(prop);
      this.updataProductList();
    },
    // 删除品牌属性
    delProp(index) {
      this.options.props.splice(index, 1);
      this.updataProductList();
    },
    // 设置排序方式  1:desc  默认降序
    setOrder(order) {
      // asc升序  desc降序
      let [orderNum, orderType] = this.options.order.split(":");
      console.log(orderNum);

      if (orderNum === order) {
        // 如果不相等,说明是第一次点击==>不改变图标
        //  如果相等,说明是第二次,改变图标

        /* 这个if就是第二次点击,值进行取反 */
        if (order === "1") {
          this.compuShow = !this.compuShow;
        } else {
          this.productShow = !this.productShow;
        }
        // 进来这个就是和上一次相等,所以进行取反
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        // else永远是第一次点击
        // 如果点击的是价格,要初始化为升序
        if (order === "2") {
          this.productShow = false;
          // 第一次点一定是升序,默认行为
          orderType = "asc";
        } else {
          // 上一次的值是多少就多少,否则点击完价格排序以后他的排序方式会给默认排序.这是注意点
          orderType = this.compuShow ? "desc" : "asc";
        }
      }
      this.options.order = `${order}:${orderType}`;
      this.updataProductList();
    },
    // 分页器
    // 每页显示的数量
    handleSizeChange(pageSize) {
      // console.log("pageSize", pageSize);
      this.options.pageSize = pageSize;
      this.updataProductList();
    },
    // 当前点击的页数
    handleCurrentChange(pageNo) {
      this.options.pageNo = pageNo;
      this.updataProductList();
    },
    // 性能优化
    isOrderId(num) {
      return this.options.order.indexOf(num) > -1;
    },
  },
  watch: {
    $route() {
      this.updataProductList();
    },

    // $route: {
    //   handler() {
    //     this.updataProductList();
    //   },
    //   immediate: true,
    // },
  },
  mounted() {
    this.updataProductList();
  },

  components: {
    SearchSelector,
    TypeNav,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: flex;
                align-items: center;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                span {
                  display: flex;
                  flex-direction: column;
                  line-height: 10px;
                  padding-left: 10px;
                  i {
                    &.deactive {
                      color: rgba(250, 250, 250, 0.5);
                    }
                  }
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>