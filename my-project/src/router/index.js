import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/login/login.vue"
import Reg from "../components/reg/reg.vue"
import Info from "../components/info/info.vue"
import User from "../components/user/user.vue"
import AddImg from "../components/img/addImg.vue"
import AddMovie from "../components/movie/addMovie.vue"
import MovieList from "../components/movie/movieList.vue"
import Studio from "../components/studio/studio.vue"
import StudioList from "../components/studio/studioList.vue"
import Theater from "../components/theater/theater.vue"
import AddTheater from "../components/theater/addTheater.vue"
import Schedule from "../components/schedule/schedule.vue"
import ScheduleList from "../components/schedule/scheduleList.vue"


Vue.component("Login",Login)
Vue.component("Reg",Reg)
Vue.component("Info",Info)
Vue.component("User",User)
Vue.component("AddImg",AddImg)
Vue.component("AddMovie",AddMovie)
Vue.component("MovieList",MovieList)
Vue.component("Studio",Studio)
Vue.component("StudioList",StudioList)
Vue.component("Theater",Theater)
Vue.component("AddTheater",AddTheater)
Vue.component("Schedule",Schedule)
Vue.component("ScheduleList",ScheduleList)


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/login/:username",
      name: "Login",
      component: Login
    },
    {
      path: "/reg",
      name: "Reg",
      component: Reg
    },{
      path: '/info',
      name: 'Info',
      component: Info,
      children:[{
        path:'user',
        component:User
      },{
        path:'studio',
        component:Studio
      },{
        path:'addMovie',
        component:AddMovie
      },{
        path:'movieList',
        component:MovieList
      },{
        path:'studioList',
        component:StudioList
      },{
        path:'addImg/:_id',
        component:AddImg
      },{
        path:'theater',
        component:Theater
      },{
        path:'addTheater',
        component:AddTheater
      },{
        path:'addTheater/:studioId',
        component:AddTheater
      },{
        path:'schedule',
        component:Schedule
      },{
        path:'scheduleList/:theaterId',
        component:ScheduleList
      }]
    }
  ]
});
