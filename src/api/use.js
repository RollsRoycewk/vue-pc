import instenceRequest from "@utils/request";

export const loginAsync = function({ phone, password }) {
  instenceRequest({
    method: "POST",
    url: "/user/passport/login",
    data: {
      phone,
      password,
    },
  })
    .then((result) => {
      console.log("成功", result);
      return result;
    })
    .catch((err) => {
      //   console.dir(err);
      //   return err.message || "网络错误";
      console.log("失败", err);
    });
};
