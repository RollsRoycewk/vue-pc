import require from "@utils/request";
/**
 * 获取首页三级分类
 */
export const getBaseCategoryList = () => {
  return require({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};
