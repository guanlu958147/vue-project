const theaterStore = {
  namespaced: true,
  state: {
      rows: [],
      curPage: 1,
      eachPage: 10,
      total: 0
  },
  mutations: {
    // 查询所有
    getTheater(state, payload) {
      return Object.assign(state, payload)
    },
    setCurPage(state,{curPage}){//curPage：newValue=oldValue
        return state.curPage = curPage
    },
    setEachPage(state,{ eachPage }){//eachPage：newValue=oldValue
        return state.eachPage = eachPage
    },
    delTheater(state,index){//删除
      state.rows.splice(index, 1)
    },
    updated(state,{name,_id,index}){//修改
      state.rows.map((item)=>{
        if(item._id==_id){
          item.name=name
        }
      })
    }
  },
  actions: {
    // 新增放映厅
    async addTheater({commit},{name,rowNo,colNo,studioId}){
      const data = await fetch(
        "/api/theaters/addTheater", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:`rowNo=${rowNo}&name=${name}&colNo=${colNo}&studioId=${studioId}`,
          credentials: "include"
        }
      ).then(function (response) {
        return response.json();
      })
      if(data){
        console.log("成功")
      }    
    },
    // 请求修改
    async modifyTheater({commit},{_id,name,index}){
      const data = await fetch(
        "/api/theaters/modifyTheater", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:`_id=${_id}&name=${name}`,
          credentials: "include"
        }
      ).then(function (response) {
        return response.json();
      });
      if(data.nModified==1){
        commit("updated",{name,_id,index})//触发updated方法更新视图
      }    
    },
    async removeTheater({commit},{theaterId,index}){//请求删除
      const data = await fetch(
        "/api/theaters/removeTheater", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:`theaterId=${theaterId}`,
          credentials: "include"
        }
      ).then(function (response) {
        return response.json();
      });
      if(data.ok==1){
        commit("delTheater",index)//触发delTheater方法更新视图
      }
    },
    async getTheatersByPage(context) {//请求放映厅所有数据
      const {curPage,eachPage} = context.state
      const data = await fetch(
        "/api/theaters/getTheatersByPage?page=" + curPage + "&rows=" + eachPage, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          credentials: "include"
        }
      ).then(function (response) {
        return response.json();
      });
      // 通过studioId找studio下的影院名
        const studio = await fetch(
          "/api/studios/getStudiosByPage", {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include"
          }
        ).then(function (response) {
          return response.json();
        });
      data.rows.some(item=>{//放映厅的所有studioId 和 影院的所有_id判断相等
        studio.rows.some(info=>{
          if(item.studioId==info._id){
            return item.studioName=info.name //给data的rows添加studioName属性，值为影院名称
          }
        })
      })
      context.commit("getTheater", data)//触发getTheater方法更新视图
    }
  }
}

export default theaterStore;
