import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    count: 0,
    user_prof_name: "",
    user_prof_image: ""
  },
  mutations: {
    send_message(send_message) {
      this.state.message = send_message;
    },
    increment(state, message) {
      this.state.message = message;
    },
    sign_in(state, user) {
      state.user_prof_name = user.user.displayName;
      state.user_prof_image = user.user.photoURL;
    }
  },
  actions: {
    send_message(context) {
      console.log(context);
    },
    increment(context, payload) {
      context.commit("increment", payload.message);
    },
    sign_in(context, user) {
      context.commit("sign_in", user);
    }
  },
  modules: {}
});
