// store.js
import { createStore } from 'vuex';
import axios from 'axios';
import {chatLogin} from "@/api/api"
export default createStore({
  state() {
    return {
      meetingAssistance:null,
      autoCaptures:null,
      summarization:null,
      transcription: null,
      background:null,
      chatId:null
    };
  },
  getters: {

    // 派生状态
  },
  mutations: {
    setMeetingAssistance(state, info) {
      state.meetingAssistance = info
      // 同步修改状态的方法
    },
    setBackground(state, info) {
      state.background = info
      // 同步修改状态的方法
    },
    setChatId(state, info) {
      state.chatId = info
      // 同步修改状态的方法
    },
    setAutoChapters(state, info) {
      state.autoCaptures = info
      // 同步修改状态的方法
    },
    setSummarization(state, info) {
      state.summarization = info
    },
    setTranscription(state, info) {
      state.transcription = info
    }
  },
  actions: {
    updateCurrentPage({ commit }, page) {
      commit('setCurrentPage', page);
    },
    updatePageSize({ commit }, size) {
      commit('setPageSize', size);
    },

    fetchAndStoreData({ commit }, urls) {
      const fetchPromises = Object.keys(urls).map(key => {
        return axios.get(urls[key]).then(response => {
          console.log(key)
          console.log(response.data)
          commit(`set${key}`, response.data);
        });
      });

      return Promise.all(fetchPromises);
    }
  },
  modules: {
    // 模块化store
  },
 
});