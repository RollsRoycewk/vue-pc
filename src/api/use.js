import request from "@utils/request";

// export const loginAsync = function({ phone, password }) {
//   request({
//     method: "POST",
//     url: "/user/passport/login",
//     data: {
//       phone,
//       password,
//     },
//   });
// };

// 注册接口
export const reqRegisterAsync = ({ phone, password, code }) => {
  return request({
    method: "POST",
    url: "/user/passport/register",
    data: {
      phone,
      password,
      code,
    },
  });
};
