import Vue from 'vue';
import Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';
import { RootState } from '@/store/RootState';
import RootGetters from '@/store/RootGetters';
import RootMutations from '@/store/RootMutations';
import RootActions from '@/store/RootActions';

Vue.use(Vuex);

export const rootModule = new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
});

const store = createStore(
  rootModule,

  // Vuex store options
  {
    strict: process.env.NODE_ENV !== 'production',
  },
);

export default store;
