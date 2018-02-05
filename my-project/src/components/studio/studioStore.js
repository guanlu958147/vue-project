const studioStore = {
    namespaced: true,   //重命名空间
    state: {
        curPage: 1,
        eachPage: 10,
        total: 0,
        rows: [],
        name: "",
        address: ""
    },
    mutations: {
        getStudiosByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, { curPage }) {
            return state.curPage = curPage
        },
        setEachPage(state, { eachPage }) {
            return state.eachPage = eachPage
        },
        delStudio(state, index ) {   //删除
            state.rows.splice(index, 1);
        },
        update(state, { name, _id, index, address }) {    //修改
            state.rows.map((item) => {
                if (item._id == _id) {
                    item.name = name;
                    item.address = address
                }
            })
        }
    },
    actions: {
        async getStudiosByPage(context) {      //获取数据
            const { curPage, eachPage } = context.state
            const data = await fetch(
                "/api/studios/getStudiosByPage?page=" + curPage + "&rows=" + eachPage,
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
        async addStudio({ commit }, { name, address }) {      //添加影院
            const data = await fetch(
                "/api/studios/addStudio", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `name=${name}&address=${address}`,
                    credentials: "include"
                }
            ).then(function (response) {
                return response.json();
            })
        },
        async delStudio({ commit }, { studioId, index }) {       //删除影院
            const data = await fetch(
                "/api/studios/delStudio", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `studioId=${studioId}`,
                    credentials: "include"
                }
            ).then(function (response) {
                return response.json();
            });
            if (data.ok == 1) {
                commit("delStudio", index);
            }
        },
        async changeStudio({ commit }, { _id, name, index, address }) {     //更新影院
            const data = await fetch(
                "api/studios/changeStudio", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `_id=${_id}&name=${name}&address=${address}`,
                    credentials: "include"
                }
            ).then(function(response){
                return response.json();
            });
            if(data.nModified==1){
                commit("update",{name,_id,index,address})
            }
        }
    }
}
export default studioStore;