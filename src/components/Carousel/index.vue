<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in slideshowList" :key="item.id">
        <img v-lazy="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";

// import "swiper/swiper-bundle.min.css";

Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  props: {
    slideshowList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    slideshowList() {
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      // new Swiper(".swiper-container", {
      new Swiper(this.$refs.swiper, {
        // direction: "vertical", // 垂直切换选项

        autoplay: {
          delay: 1000,
          disableOnInteraction: false, // 当用户点击下一页时，仍会开启自动轮播
        },
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // 如果需要滚动条
        // scrollbar: {
        //   el: ".swiper-scrollbar",
        // },
      });
    },
  },
  mounted() {
    console.log(123);
    if (!this.slideshowList.length) return;
    this.initSwiper();
  },
};
</script>

<style lang="less" scoped>
</style>
