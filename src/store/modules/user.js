import { reqRegisterAsync, reqUserLoginAsync } from "@api/use";

export default {
  state: {
    name: "",
    token: "",
  },
  getters: {},
  actions: {
    // 注册
    async registerAsync({ commit }, { phone, password, code }) {
      await reqRegisterAsync({ phone, password, code });
      console.log(commit);
    },
    // 登录
    async userLoginAsync({ commit }, { phone, password }) {
      const userLoginData = await reqUserLoginAsync(phone, password);
      console.log(userLoginData);
      commit("USER_LOGIN_ASYNC", userLoginData);
    },
  },
  mutations: {
    USER_LOGIN_ASYNC(state, userLoginData) {
      state.name = userLoginData.name;
      state.token = userLoginData.token;
    },
  },
};
