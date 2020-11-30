import Mock from "mockjs";
import banners from "./rbanners.json";
import floors from "./rfloors.json";

/* 
    一旦运行就会拦截Get请求,请求地址/mock/banners
    并最后参数作为响应结果响应,注意请求方式要小些
    所以还需要设置一个拦截器,处理/mock的请求
*/
Mock.mock("/mock/banners", "get", {
  code: 200,
  "data|4": banners,
});

Mock.mock("/mock/floors", "get", {
  code: 200,
  "data|3-5": floors,
});
