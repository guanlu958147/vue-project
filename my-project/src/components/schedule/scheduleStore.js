const scheduleStore = {
    namespaced:true,
    state:{
      curPage:1,
      eachPae:10,
      total:0,
      rows:[]   
     
    },
    //更新以后的唯一方法
    mutations:{
       
    },
    actions:{
        
        //获取电影
        async getMovie(context,params) {

            const data = await fetch(
              "/studios/getStudiosAll?page=1&rows=58",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
            //    credentials:"include"
              }
            ).then(function(response){
                console.log(response)
                return response.json()
            })
            console.log(data)
            console.log("111")
          }
    }
}
export default scheduleStore;