import createPresistedState from "vuex-persistedstate";

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPresistedState({})(store);
  });
};
