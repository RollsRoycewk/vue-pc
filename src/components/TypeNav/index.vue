<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div
      class="container"
      @mouseenter="isSideNavLoginShow = true"
      @mouseleave="isSideNavLoginShow = false"
    >
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 过渡动画 -->
      <transition name="sideNav">
        <div class="sort" v-show="isSideNavHomeShow || isSideNavLoginShow">
          <div class="all-sort-list2" @click="handleSearchUrl">
            <div
              class="item bo"
              v-for="oneList in navList"
              :key="oneList.categoryId"
            >
              <h3>
                <!-- <a href="">{{ oneList.categoryName }}</a> -->

                <!-- 第一种方式router-link会产生很多组件 -->
                <!-- <router-link
                :to="`/search/?categoryName=${oneList.categoryName}&category1Id=${oneList.categoryId}`"
                >{{ oneList.categoryName }}</router-link
              > -->

                <!-- 第二种方式,编程式导航,会产生很多函数 -->
                <!-- <a
                @click.prevent="
                  $router.push({
                    name: 'search',
                    query: {
                      category1Id: oneList.categoryId,
                      categoryName: oneList.categoryName,
                    },
                  })
                "
                >{{ oneList.categoryName }}</a
              > -->

                <!-- 最终方式 -->
                <a
                  :data-categoryName="oneList.categoryName"
                  :data-categoryId="oneList.categoryId"
                  data-categoryType="1"
                  >{{ oneList.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="twoList in oneList.categoryChild"
                    :key="twoList.categoryId"
                  >
                    <dt>
                      <!-- <a href="">{{ twoList.categoryName }}</a> -->

                      <!-- 第一种方式router-link会产生很多组件 -->
                      <!-- <router-link
                      :to="`/search/?categoryName=${twoList.categoryName}&category2Id=${twoList.categoryId}`"
                      >{{ twoList.categoryName }}</router-link
                    > -->

                      <!-- 第二种方式,编程式导航 -->
                      <!-- <a
                      @click.prevent="
                        $router.push({
                          name: 'search',
                          query: {
                            category2Id: twoList.categoryId,
                            categoryName: twoList.categoryName,
                          },
                        })
                      "
                      >{{ twoList.categoryName }}</a
                    > -->

                      <!-- 最终版 -->
                      <a
                        :data-categoryName="twoList.categoryName"
                        :data-categoryId="twoList.categoryId"
                        data-categoryType="2"
                        >{{ twoList.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="threeList in twoList.categoryChild"
                        :key="threeList.categoryId"
                      >
                        <!-- <a href="">{{ threeList.categoryName }}</a> -->

                        <!-- 第一种方式router-link会产生很多组件 -->
                        <!-- <router-link
                        :to="`/search/?categoryName=${threeList.categoryName}&category3Id=${threeList.categoryId}`"
                        >{{ threeList.categoryName }}</router-link
                      > -->

                        <!-- 第二种方式,编程式导航 -->
                        <!-- <a
                        @click.prevent="
                          $router.push({
                            name: 'search',
                            query: {
                              category3Id: threeList.categoryId,
                              categoryName: threeList.categoryName,
                            },
                          })
                        "
                        >{{ threeList.categoryName }}</a
                      > -->

                        <!--最终版  -->
                        <a
                          :data-categoryName="threeList.categoryName"
                          :data-categoryId="threeList.categoryId"
                          data-categoryType="3"
                          >{{ threeList.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// 获取三级目录函数
// import { getBaseCategoryList } from "@api/home";
import { mapState, mapActions } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      // navList: [],
      isSideNavHomeShow: this.$route.path === "/",
      isSideNavLoginShow: false,
    };
  },
  // async mounted() {
  //   const result = await getBaseCategoryList();
  //   this.navList = result.slice(0, -1);
  // },

  computed: {
    // ...mapState(["navList"]),
    ...mapState({
      navList: (state) => state.home.navList,
    }),
  },
  methods: {
    ...mapActions(["getCategoryList"]),
    // 方式二,处理跳转路径
    handleSearchUrl(e) {
      // console.log(e.target);
      // console.log(e.target.dataset);
      const { categoryid, categoryname, categorytype } = e.target.dataset;
      if (!categoryname) return;

      const location = {
        name: "search",
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      };
      const { searchText } = this.$route.params;
      if (searchText) {
        location.params = { searchText };
      }

      this.$router.push(location);
    },
  },
  mounted() {
    this.getCategoryList();
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      // background: pink;
      z-index: 999;
      // 动画
      &.sideNav-enter {
        height: 0px;
      }
      &.sideNav-enter-active {
        transition: height 0.5s;
        overflow: hidden;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
