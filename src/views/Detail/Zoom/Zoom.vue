<template>
  <div class="spec-preview" @mousemove="handleMove">
    <img :src="imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img :src="imgBigUrl" :style="{ left: bigImgX, top: bigImgY }" />
    </div>
    <div class="mask" :style="{ left: maskX, top: maskY }"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      maskX: "0px",
      maskY: "0px",
      bigImgX: "0px",
      bigImgY: "0px",
    };
  },
  props: {
    imgUrl: {
      type: String,
    },
    imgBigUrl: {
      type: String,
    },
  },
  methods: {
    handleMove(e) {
      // 获取主图盒子距离窗口距离
      const phone_box_side = {
        x: e.target.getBoundingClientRect().left,
        y: e.target.getBoundingClientRect().top,
      };

      // 因为要一直让鼠标保持在蒙版中间,所以计算蒙版的一半
      const mask_half = {
        x: 200 / 2,
        y: 200 / 2,
      };

      // 鼠标位置 - 放大镜到视口距离 - 蒙版一半 = 蒙版现在的位置
      const mask_side = {
        x: e.clientX - phone_box_side.x - mask_half.x,
        y: e.clientY - phone_box_side.y - mask_half.y,
      };

      if (mask_side.x >= 200) {
        mask_side.x = 200;
      } else if (mask_side.x <= 0) {
        mask_side.x = 0;
      }
      if (mask_side.y >= 200) {
        mask_side.y = 200;
      } else if (mask_side.y <= 0) {
        mask_side.y = 0;
      }
      // 赋值
      this.maskX = mask_side.x + "px";
      this.maskY = mask_side.y + "px";

      //计算大图移动的位置
      //比例:大图区域 - 大图的大小(也就是大图可以走的距离) / 小图区域 - 蒙版的大小(也就是小图可以移动的距离)
      let scale = (400 - 800) / (400 - 200);

      // 大图走动的位置
      this.bigImgX = mask_side.x * scale + "px";
      this.bigImgY = mask_side.y * scale + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      // left: 50px;
      // top: 20px;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>