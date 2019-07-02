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
    set_refuels: (state, payload) => {
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
    set_single_refuel: (state, payload) => {
      let refuels = [];
      for (let index = 0; index < state.refuels.length; index++) {
        const element = state.refuels[index];
        if (element.id === payload.id) {
          console.log("adding this deepshit.");
          refuels.push(payload);
        } else {
          refuels.push(element);
        }
      }
      state.refuels = refuels;
    },
    remove_refuel: (state, payload) => {
      state.refuels = state.refuels.filter(function(obj) {
        return obj.id !== payload;
      });
    }
  },
  actions: {
    fetchRefuels: context => {
      db.ref("refuels").on("value", snapshot => {
        context.commit("set_refuels", snapshot.val());
      });
    },
    submitRefuel: (state, payload) => {
      db.ref("refuels").push(payload);
    },
    updateRefuel: (context, payload) => {
      db.ref("refuels")
        .child(payload.id)
        .update(payload)
        .then(() => {
          /*let refuels = [];
          for (let i = 0; i < state.refuels.length; i++) {
            const element = state.refuels[i];
            if (element.id === payload.id) {
              console.log("adding this deepshit.");
              refuels.push(payload);
            } else {
              refuels.push(element);
            }
          }
          state.refuels = refuels;*/
          context.commit("set_single_refuel", payload);
        });
    },
    removeRefuel: (context, payload) => {
      db.ref("refuels")
        .child(payload)
        .remove()
        .then(() => {
          context.commit("remove_refuel", payload);
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
