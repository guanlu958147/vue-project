import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/login/login.vue"
import Reg from "../components/reg/reg.vue"
import Info from "../components/info/info.vue"
import User from "../components/user/user.vue"
import Movie from "../components/movie/movie.vue"
import Studio from "../components/studio/studio.vue"
import Theater from "../components/theater/theater.vue"
import AddTheater from "../components/theater/addTheater.vue"
import Schedule from "../components/schedule/schedule.vue"

Vue.component("Login",Login)
Vue.component("Reg",Reg)
Vue.component("Info",Info)
Vue.component("User",User)
Vue.component("Movie",Movie)
Vue.component("Studio",Studio)
Vue.component("Theater",Theater)
Vue.component("AddTheater",AddTheater)
Vue.component("Schedule",Schedule)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/reg',
      name: 'Reg',
      component: Reg
    },{
      path: '/info',
      // name: 'Info',
      component: Info,
      children:[{
        path:'user',
        component:User
      },{
        path:'studio',
        component:Studio
      },{
        path:'movie',
        component:Movie
      },{
        path:'theater',
        component:Theater
      },{
        path:'addTheater',
        component:AddTheater
      },{
        path:'schedule',
        component:Schedule
      }]
    }
  ]
})
