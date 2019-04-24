import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Quotation from '@/components/Quotation'
import HelloWorld from '@/components/HelloWorld'
import Details from '@/components/Details'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: Quotation
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/details',
      name:'details',
      component:Details
    }
  ]
})
