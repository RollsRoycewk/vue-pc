import request from "@utils/request";

export const reqProductDetail = (detailId) => {
  return request({
    method: "GET",
    url: `/item/${detailId}`,
  });
};
