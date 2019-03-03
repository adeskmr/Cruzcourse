import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
let Bootstrap = require('bootstrap')
import jQuery from 'jquery'
global.$ = jQuery

import popper from 'popper.js'
import 'bootstrap/dist/css/bootstrap.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import firebaseConfig from './firebaseConfig'
Vue.config.productionTip = false


firebase.initializeApp(firebaseConfig)

export const fstorage = firebase.storage()
export const provider = new firebase.auth.GoogleAuthProvider();
export const fauth = firebase.auth()

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         console.log(user)
         this.$store.state.goog_id = user.uid
      }
    })

  }
}).$mount('#app')
