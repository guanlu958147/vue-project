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
            return state.curPage = curPage
        },
        setEachPage(state, { eachPage }) {
            return state.eachPage = eachPage
        },
        updateUser(state,{ _id, username, password }){
            state.rows.map((item)=>{
                if(item._id == _id){
                    item.username = username;
                    item.password = password;
                }
            })
        },
        deleteUser(state,index){
            state.rows.splice(index,1);
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
        },
        async updateUserAsync(context,{ _id, username, password }){
            const data = await fetch(
                "/api/users/update",
                {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "_id=" + _id + "&username=" + username + "&password=" + password,
                    credentials: "include"
                }
            ).then(function(response){
                return response.json();
            });
            if(data.nModified==1){
                context.commit("updateUser",{_id,username,password})//触发updateUser方法更新视图
            }    
        },
        async deleteUserAsync(context,{ _id,index }){
            const data = await fetch(
                "/api/users/delet",
                {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "_id=" + _id,
                    credentials: "include"
                }
            ).then(function(response){
                return response.json();
            });
            if(data.ok==1){
                context.commit("deleteUser",index)//触发updateUser方法更新视图
            } 
        },
    }
}
export default userStore;