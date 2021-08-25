import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    liveValue:{}
  },
  mutations: {
    setLiveValue(state,liveValue){
      state.liveValue = liveValue
    }
  },
  getters: {
    //get方法
    getLiveValue: state => state.liveValue

  },
  actions: {

  },
  modules: {
  }
})
