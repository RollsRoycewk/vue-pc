import require from "@utils/request";
import mockRequire from "@utils/mockRequest";
/**
 * 获取首页三级分类
 */
export const getBaseCategoryList = () => {
  return require({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};

/**
 * 获取mock轮播图图片
 */
export const getslideshow = () => {
  return mockRequire({
    method: "GET",
    url: "/banners",
  });
};
