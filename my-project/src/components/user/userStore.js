const userStore = {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        total: 0,
        rows: []
    },
    mutations: {
        getUsersByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, { curPage }) {
            console.log(curPage)
            state.curPage = curPage
        },
        setEachPage(state, { eachPage }) {
            state.eachPage = eachPage
        }
    },
    actions: {
        async getUsersByPageAsync(context) {
            const { curPage, eachPage } = context.state
            const data = await fetch(
              "/api/users/getUserList?curPage=" + curPage + "&eachPage=" + eachPage,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                // body: "username=" + username + "&password=" + password,
                credentials: "include"
              }
            ).then(function (response) {    
              return response.json();
            });
            context.commit("getUsersByPage", data)
          }
    }
}
export default userStore;