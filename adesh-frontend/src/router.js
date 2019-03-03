import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import( './views/Home.vue')
const professor = () => import( './views/Professor.vue')
const about = () => import( './views/about.vue')
const Class = () => import( './views/Classes.vue')
const Prof_profile = () => import( './views/Prof_profile.vue')
const Course_profile = () =>import( './views/Course_profile.vue')

const uploadtranscript = () => import('./views/uploadtranscript.vue')
const Mydata = () => import('./views/Mydata.vue')
const gsignin = () => import('./views/gsignin.vue')
// import User_upload from './views/userupload.vue'



Vue.use(Router)
export default new Router({
   // scrollBehavior(){
   //    return {x:0, y:0}
   // },
  mode: 'history',
  routes: [
    
    {
      path: '/',
      name: 'homepage',
      component: Home
    },
    {
      path: '/professor',
      redirect: '/professor/department/All/page/1'
    },
    {
      path: '/professor/department/:department/page/:page',
      name: 'professor',
      component: professor
    },
    {
      path: '/googlesignin',
      name: 'googlesignin',
      component: gsignin
    },
    {
      path: '/uploadtranscript',
      name: 'uploadtranscript',
      component: uploadtranscript
    },
   //  {
   //    path: '/user',
   //    name: 'userupload',
   //    component: User_upload
   //  },
    {
      path: '/professor/:id',
      name: 'Prof_profile',
      component: Prof_profile
    },
    {
      path: '/course/:id',
      name: 'Course_profile',
      component: Course_profile
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/class',
      redirect: '/class/department/All/ge/All/credits/All/page/1',
      
    },
    {
      path: '/class/department/:department/ge/:generaleducation/credits/:credits/page/:page',
      name: 'Class',
      component: Class
    },
    {
      path: '/Mydata',
      name: 'Mydata',
      component: Mydata
    },

    
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
  ]
})
