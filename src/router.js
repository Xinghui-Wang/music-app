import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'views/rank/rank'
import Recommend from 'views/recommend/recommend'
import Search from 'views/search/search'
import Singer from 'views/singer/singer'
import SingerDetail from 'views/singer-detail/singer-detail'
import Disc from 'views/disc/disc'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/rank',
      component: Rank
    }, {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
