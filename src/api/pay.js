import request from "@utils/request";

// 获取订单交易页信息
export const reqTradeData = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade",
  });
};

// 提交订单
export const reqSubmitOrder = ({
  traderNo,
  consignee,
  consigneeTel,
  deliveryAddress,
  paymentWay,
  orderComment,
  orderDetailList,
}) => {
  return request({
    method: "POST",
    url: `/order/auth/submitOrder?tradeNo=${traderNo}`,
    data: {
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList,
    },
  });
};

// 获取订单支付信息
export const reqCreateNative = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`,
  });
};

// 查询支付订单状态
export const reqQueryPayStatus = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/queryPayStatus/${orderId}`,
  });
};
