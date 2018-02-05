const studioStore = {
    namespaced: true,   //重命名空间
    state:{
        curPage: 1,
        eachPage: 10,
        total: 0,
        rows: [],
        name: "",
        address: ""
    },
    mutations:{
        getStudiosByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, { curPage }) {
            console.log(curPage)
            return state.curPage = curPage
        },
        setEachPage(state, { eachPage }) {
            console.log(eachPage)
            return state.eachPage = eachPage
        },
        addStudio(state,payload){
            Object.assign(state, payload)
        },
        delStudio(state,payload){
            Object.assign(state, payload)
        }
    },
    actions:{
        async getStudiosByPageAsync(context) {      //获取数据
            const { curPage, eachPage } = context.state
            const data = await fetch(
              "/api/studios/getStudiosByPage?curPage=" + curPage + "&eachPage=" + eachPage,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                // body: "username=" + username + "&password=" + password,
                credentials: "include"
              }
            ).then(function (response) {
              return response.json();   //需要在“/config/index.js”中配置代理
              
            });
            console.log(data)
            context.commit("getStudiosByPage", data)
        },
        async addStudio(context) {      //添加影院
            const { name, address } = context.state;
            console.log(name,address)
            const data = await fetch(
                "/api/studios/addStudio?name=" + name + "&address=" + address,
                {
                    method: "POST",
                    body: "name=" + name + "&address=" + address,
                    credentials: "include"
                }
            )
        },
        async delStudio(context){       //删除影院
            const { name , _id } = context.state;
            const data = await fetch(
                
            )
        }
    }
}
export default studioStore;