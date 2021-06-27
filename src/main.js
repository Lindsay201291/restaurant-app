import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import VueRouter from 'vue-router'

import Home from './components/Home'
import Buyers from './components/Buyers'
import BuyerInformation from './components/BuyerInformation'
import TransactionsOfTheDay from './components/TransactionsOfTheDay'

import './assets/styles.css';

Vue.component('Home', Home)
Vue.component('Buyers', Buyers)
Vue.component('BuyerInformation', BuyerInformation)
Vue.component('TransactionsOfTheDay', TransactionsOfTheDay)

Vue.use(VueRouter)

const routes = [
  {path:'/', component:Home},
  {path:'/home', component:Home},
  {path:'/buyers', component:Buyers},
  {path:'/buyer-information/:uid', name:'BuyerInformation', component:BuyerInformation},
  {path:'/transactions-of-the-day', component:TransactionsOfTheDay},
]

const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
