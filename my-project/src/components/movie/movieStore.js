const movieStore = {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        total: 0,
        rows:[],
        _id:""
    },
    mutations: {
        getMoviesByPage(state,payload){
            Object.assign(state,payload)
        },
        deleMovies(state,{index}){
            state.rows.splice(index,1)
        },
        addMovie(state,{_id}){
            state._id = _id
        },
        getImgs(state,payload){
            console.log(payload.rows)
            const items = payload.rows.map((item)=>{
                item.imgId = item._id
                item.url = "http://localhost:3000"+ item.url.slice(1)
                return item
            })
            state.rows = [...items]
            state.total = payload.total
        },
        updateMovies(state,{ _id,cName, eName, type, country, duration, release, synopsis,stars,average }){
            state.rows.map((item)=>{
                if( _id == item._id ){
                    item.cName = cName,
                    item.eName = eName,
                    item.type = type,
                    item.country = country,
                    item.duration = duration,
                    item.release = release,
                    item.synopsis = synopsis,
                    item.stars = stars,
                    item.average = average
                }
            })
        },
        setCurPage(state,{curPage}){
           return state.curPage = curPage
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
            synopsis,
            stars,
            average
        }) {
            const data = await fetch(
                "/api/movies/create",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    },
                    body:`cName=${cName}&eName=${eName}&type=${type}&country=${country}&duration=${duration}&release=${release}&synopsis=${synopsis}&average=${average}&stars=${stars}`
                }).then(function(response){
                    return response.json();
                })
                if(data){
                    console.log("保存成功")
                }
                meType.commit("addMovie",data)
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
               console.log(payload)
            const { _id,index } = payload
            const data = await fetch(
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
           async updateMoviesAsync(movType,{_id,cName,eName,type,country,duration,release,synopsis,stars,average}){
            const updateData = await fetch(
              "/api/movies/update",
              {
                   method:"POST",
                   headers:{
                       "Content-Type":"application/x-www-form-urlencoded"
                   },
                   body:`_id=${_id}&cName=${cName}&eName=${eName}&type=${type}&country=${country}&duration=${duration}&release=${release}&synopsis=${synopsis}&average=${average}&stars=${stars}`

               }).then(function(response){
                   return response.json();
               })
               if(updateData.nModified==1){
                movType.commit("updateMovies",{_id,cName,eName,type,country,duration,release,synopsis,stars,average})
               }
           },
           //通过movieId查找图片
           async getImgsByAsync(context,payload){
            const { curPage,eachPage } = context.state
            const { movieId,type } = payload
            const data = await fetch(
              "/api/imgs/getImgsByMovieId?page="+curPage+"&rows="+eachPage+"&movieId="+movieId+"&type="+type,
              {
                   method:"GET",
                   headers:{
                       "Content-Type":"application/x-www-form-urlencoded"
                   }

               }).then(function(response){
                   return response.json();
               })
               context.commit("getImgs",data)
               console.log(data)
           },
           //删除图片
           async delImgsByAsync(context,{_id}){
            const data = await fetch(
              "/api/imgs/deleImg?_id="+_id,
              {
                   method:"GET",
                   headers:{
                       "Content-Type":"application/x-www-form-urlencoded"
                   }
               }).then(function(response){
                   return response.json();
               })
               context.commit("getImgs",data)
               console.log(data)
           },
    }
}
export default movieStore;