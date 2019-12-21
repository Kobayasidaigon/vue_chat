import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message:"",
    count:0
  },
  mutations: {
    send_message(send_message){
      this.state.message=send_message
    },
    increment(state,message){
      
      console.log(message);
      this.state.message=message
    }
  },
  actions: {
    send_message(context){
      console.log(context);
    },
    increment(context,payload){
      context.commit('increment',payload.message)
    }
  },
  modules: {
  }
})
