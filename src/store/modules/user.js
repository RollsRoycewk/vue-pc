import { reqRegisterAsync } from "@api/use";

export default {
  state: {},
  getters: {},
  actions: {
    async registerAsync({ commit }, { phone, password, code }) {
      await reqRegisterAsync({ phone, password, code });
      console.log(commit);
    },
  },
  mutations: {},
};
