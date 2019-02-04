import Vue from "vue";
import Vuex from "vuex";

import { db } from "./firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    refuels: [],
    pas: "mps"
  },
  mutations: {
    SET_REFUELS: (state, payload) => {
      if (payload === null) {
        state.refuels = [];
        return;
      }

      Object.keys(payload).forEach(function(key) {
        if (state.refuels.some(e => e.id === key) === false) {
          var obj = payload[key];
          obj.id = key;
          state.refuels.push(obj);
        }
      });
    },
    REMOVE_REFUEL: (state, payload) => {
      state.refuels = state.refuels.filter(function(obj) {
        return obj.id !== payload;
      });
    }
  },
  actions: {
    fetchRefuels: context => {
      db.ref("refuels").on("value", snapshot => {
        context.commit("SET_REFUELS", snapshot.val());
      });
    },
    submitRefuel: (state, payload) => {
      db.ref("refuels").push(payload);
    },
    removeRefuel: (context, payload) => {
      db.ref("refuels")
        .child(payload)
        .remove()
        .then(() => {
          context.commit("REMOVE_REFUEL", payload);
        });
    }
  },
  getters: {
    refuels: state => {
      return state.refuels;
    },
    pas: state => {
      return state.pas;
    },
    fullRefuelDates: state => {
      let full = [];

      state.refuels.forEach(element => {
        if (element.full) full.push(element.date);
      });

      return full;
    },
    nonFullRefuelDates: state => {
      let nonFull = [];

      state.refuels.forEach(element => {
        if (element.full === false) nonFull.push(element.date);
      });

      return nonFull;
    }
  }
});
