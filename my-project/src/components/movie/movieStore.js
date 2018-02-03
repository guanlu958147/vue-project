const movieStore = {
    namespaced: true,
    state: {
        // cName: "正义联盟",
        // eName: "Justice League",
        // type: "动作,冒险,科幻",
        // country: "美国",
        // duration: "120分钟",
        // release: "2017-11-17大陆上映",
        // synopsis:
        //     "本片讲述的是受到超人（亨利·卡维尔 饰）无私奉献的影响，蝙蝠侠（本·阿弗莱克 饰）重燃了对人类的信心，接受了新盟友神奇女侠（盖尔·加朵 饰）的帮助，去对抗更加强大的敌人。蝙蝠侠和神奇女侠一同寻找并招募了一支超人类联盟来抵挡新觉醒的威胁。但尽管这支队伍集结了超人、蝙蝠侠、神奇女侠、闪电侠（埃兹拉·米勒 饰）、海王（杰森·莫玛 饰）和钢骨（雷·费舍 饰）等人，他们似乎无法阻止敌人对地球的进攻……",
        curPage: 1,
        eachPage: 10,
        total: 0,
        rows:[]
    },
    mutations: {
        getMoviesByPage(state,payload){
            Object.assign(state,payload)
        },
        deleMovies(state,{index}){
            state.rows.splice(index,1)
        },
        createMovies(state, payload) {
            console.log(payload)
        },
        updateMovies(state,payload){
            Object.assign(state,payload)
        },
        setCurPage(state,{curPage}){
            // console.log(curPage)
           return state.curPage = curPage
            // console.log(state.curPage)
        },
        setEachPage(state,{eachPage}){
            return state.eachPage = eachPage
        }
    },
    actions: {
        //保存电影
        async createMoviesAsync(meType, {
              cName,
            eName,
            type,
            country,
            duration,
            release,
            synopsis
        }) {
            console.log(cName, eName, type, country, duration, release, synopsis)
            const data = await fetch(
                "/api/movies/create?cName="+cName+"&eName="+eName+"&type="+type+"&country="+country+"&duration="+duration+"&release="+release+"&synopsis="+synopsis,
                {
                    method:"GET",
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).then(function(response){
                    return response.json();
                })
                console.log(data)
                // context.commit("createMovies",data)
        },
        //获取电影分页
        async getMoviesByPageAsync(context){
            const { curPage,eachPage } = context.state
          const data = await fetch(
              "/api/movies/getMoviesByPage?page="+curPage + "&rows=" + eachPage ,
              {
                   method:"GET",
                   headers:{
                       "Content-Type":"application/x-www-form-urlencoded"
                   }
               }).then(function(response){
                   return response.json();
               })
            const rows =data.rows.map((item,index)=>{
                item.synopsis=item.synopsis.length > 10 ? item.synopsis.substring( 0,10 ) + "..." : item.synopsis
                return item
              })
              Object.assign(data.rows,rows)
               context.commit("getMoviesByPage",data)
           },
           //删除电影
           async deleMoviesAsync(type,payload){
            const { _id,index } = payload
            const dataDele = await fetch(
              "/api/movies/dele?_id="+_id,
              {
                   method:"GET",
                   headers:{
                       "Content-Type":"application/x-www-form-urlencoded"
                   }
               }).then(function(response){
                   return response.json();
               })
               type.commit("deleMovies",index)
           },
           //修改
           async updateMoviesAsync(typeMov,{_id,cName,eName,type,country,duration,release,synopsis}){
            // const { _id,index } = payload
            const updateData = await fetch(
              "/api/movies/update?_id=" + _id +"&cName="+cName+"&eName="+eName+"&type="+type+"&country="+country+"&duration="+duration+"&release="+release+"&synopsis="+synopsis,
              {
                   method:"GET",
                   headers:{
                       "Content-Type":"application/x-www-form-urlencoded"
                   }
               }).then(function(response){
                   return response.json();
               })
               type.commit("updateMovies",updateData)
           },
    }
}
export default movieStore;