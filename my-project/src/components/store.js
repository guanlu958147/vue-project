import Vue from "vue";
import Vuex from "vuex";
// import userStore from "./user/userStore.js";
// import movieStore from "./movie/movieStore.js";
// import studioStore from "./studio/studioStore.js";
// import theaterStore from "./theater/theaterStore.js";
import scheduleStore from "./schedule/scheduleStore.js";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        // userStore,
        // movieStore,
        // studioStore,
        // theaterStore,
        scheduleStore
    }
})
export default store;