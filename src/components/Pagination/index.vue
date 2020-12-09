<template>
  <div class="pagination">
    <button :disabled="myCurrentPage === 1">上一页</button>
    <!-- 第一个按钮 -->
    <button
      v-if="start_end.start > 1"
      @click="myCurrentPage = 1"
      :class="{ active: myCurrentPage === 1 }"
    >
      1
    </button>
    <!-- 前面省略 -->
    <button v-if="start_end.start > 2">...</button>
    <!-- 中间连续按钮 -->
    <button
      v-for="item in loopBtn"
      :key="item"
      @click="myCurrentPage = item"
      :class="{ active: myCurrentPage === item }"
    >
      {{ item }}
    </button>
    <!-- 后面省略 -->
    <button v-if="start_end.end < total_Num - 1">...</button>
    <!-- 最后一个按钮 -->
    <button v-if="start_end.end < total_Num">{{ total_Num }}</button>
    <button :disabled="myCurrentPage === total">下一页</button>
    <button>总共{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 接收参数
  props: {
    // 当前页数
    currentPage: {
      type: Number,
      default: 1,
    },
    // 连续页码数量
    pagerCount: {
      type: Number,
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    // 每页显示的数量
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总数
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // props数据只读不修改
      myCurrentPage: this.currentPage,
    };
  },
  computed: {
    // 总页数,向上取整,即使只有一条数据也要多增加一页
    total_Num() {
      return Math.ceil(this.total / this.pageSize);
    },

    start_end() {
      const { pagerCount, myCurrentPage, total_Num } = this;
      let start, end, needNum;

      // 如果总页数小于连续页面数量
      if (total_Num < pagerCount) {
        (start = 1), (end = total_Num);
      } else {
        start = myCurrentPage - Math.floor(pagerCount / 2);
        end = myCurrentPage + Math.floor(pagerCount / 2);
        // 左侧范围限定
        if (start < 1) {
          needNum = 1 - start;
          start += needNum;
          end += needNum;
        }
        // 右侧范围限定
        if (end > total_Num) {
          needNum = end - total_Num;
          start -= needNum;
          end -= needNum;
        }
      }

      return {
        start,
        end,
      };
    },

    // 需要遍历的按钮
    loopBtn() {
      let arr = [];
      const { start, end } = this.start_end;
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  watch: {
    myCurrentPage(currentPage) {
      console.log("myCurrent", currentPage);
      this.$emit("handleCurrentChange", currentPage);
    },
    currentPage(currentPage) {
      console.log("currentPage", currentPage);
      // this.myCurrentPage = currentPage;
    },
  },
};
</script>

<style lang='less' scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>
