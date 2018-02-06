const scheduleStore = {
  namespaced: true,
  state: {
    curPage: 1,
    eachPae: 10,
    total: 0,
    rows: [],
    theaters: {
      data: []
    },
    movies: {
      rows: []
    },
    studio: {
      rows: []
    },
    theatersList: {
      rows: [],
      curPage: 1,
      eachPage: 10,
      total: 0
    },
    studiosList: {
      data: []
    }


  },
  //更新视图以后的唯一方法
  mutations: {
    getMovies(state, payload) {
      return Object.assign(state.movies, payload)
    },
    getStuidos(state, payload) {
      return Object.assign(state.studio, payload)
    },
    getTheaters(state, payload) {
      return Object.assign(state.theaters, payload)
    },
    //影厅列表
    getSchedule(state, payload) {
      return Object.assign(state.theatersList, payload)
    },
    //影厅列表
    studioList(state, payload) {
      return Object.assign(state, studiosList, payload)
    }

  },
  actions: {

    //*********************************************获取电影****************************************************
    async getMoviesByPage({
      commit
    }, {}) {
      const data = await fetch(
        "/api/movies/getMoviesByPage", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          //    credentials:"include"
        }
      ).then(function (response) {
        return response.json()
      });

      //触发updated方法更新视图
      commit("getMovies", data)
    },



    //*******************************************************获取影院********************************************************
    async getStudiosByPage({
      commit
    }, {

    }) {
      const data = await fetch(
        "/api/studios/getStudiosByPage", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      ).then(function (response) {
        return response.json()
      });

      commit("getStuidos", data)
    },



    //********************************************************获取影厅************************************************
    async getTheatersByStudioId({
      commit
    }, {
      studioId
    }) {
      const data = await fetch(
        "/api/theaters/getTheatersByStudioId?studioId=" + studioId, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      ).then(function (response) {
        return response.json()

      });
      commit("getTheaters", {
        data
      })
    },




    //******************************** 确认提交  ************************************
    async addSchedule({
      commit
    }, {
      movieId,
      studioId,
      theateriD,
      showId,
      price
    }) {
      const data = await fetch(
        "/api/schedules/addSchedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "movieId=" + movieId + "&studioId=" + studioId + "&theateriD=" + theateriD + "&showId=" + showId + "&price=" + price
        }
      )
    },




    // *****************************************  查询后影院列表,排片信息  ***************************************************
    async getStudiosByMovieId({
      commit
    }, {
      movieId,
      page,
      rows
    }) {
      const data = await fetch(
        "/api/schedules/getStudiosByMovieId?movieId=" + movieId + "&page=" + page + "&rows=" + rows, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      ).then(function (response) {
        return response.json()
      });
      commit("getSchedule", data)
    },



    //******************************************  查询放映厅   ************************************************
    async getTheatersByStudioIdList({
      commit
    }, {
      studioId
    }) {
      const data = await fetch(
        "/api/theaters/getTheatersByStudioId?studioId=" + studioId, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      ).then(function (response) {
        return response.json()

      });

      console.log(data)
      commit("getTheaters", {
        data
      })
    }
  }
}
export default scheduleStore;
