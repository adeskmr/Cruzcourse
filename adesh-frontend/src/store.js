import Vue from 'vue'
import Vuex from 'vuex'
import { fstorage, fauth, provider } from './main'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    fb_id: -1,
    goog_id: 'a',
    transcriptData: [],
    profInfo: {},
    databaselock: false,
    topstatus: '',

  },
  getters: {
   getgoog_id: state => {
      return state.goog_id
   }
  },
  mutations: {
   CHANGE_ID(state,theID) {
      state.goog_id = theID
   },

   SET_TRANSCRIPT_DATA(state,data) {
      state.transcriptData = data
      state.loading = false
   },
   SIGNOUT(state) {
      state.goog_id = 'a'
   }

  },
  actions: {

   signin({commit}){
      fauth.signInWithPopup(provider).then(function(result) {
         // This gives you a Google Access Token. You can use it to access the Google API.
         var token = result.credential.accessToken;
         // The signed-in user info.
         var user = result.user;
         // console.log(user.email)
         // console.log(user.displayName)
         // console.log(user.uid)
         // $store.state.goog_id = user.uid
         commit('CHANGE_ID',user.uid)
         // ...
       }).catch(function(error) {
         // Handle Errors here.
         console.log(error)
         var errorCode = error.code;
         var errorMessage = error.message;
         // The email of the user's account used.
         var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
         var credential = error.credential;
         // ...
       });
      

   },
   signout({commit}){
      fauth.signOut().then(function() {

         commit('SIGNOUT')
         
         // Sign-out successful.
       }).catch(function(error) {
         // An error happened.
       });
      

   },




   mlImage({ commit, getters }, payload) {
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      fstorage.ref('transcript/' + payload.title + ext).put(payload.image)
         .then((snapshot) => {
            var filePath = snapshot.metadata.fullPath
            return fstorage.ref(filePath).getDownloadURL()
         })
         .then((transcriptUrl) => {
            console.log(transcriptUrl)

            // var bodyFormData = new FormData();
            // bodyFormData.set('url', transcriptUrl);
            var bodyFormData = new FormData();
            bodyFormData.append('url',transcriptUrl)
            bodyFormData.append('goog_id', getters.getgoog_id)
            // bodyFormData.set('url', transcriptUrl);
            return axios({
               method: 'post', //http://localhost:8080
               url: 'https://faceclass-221a7.appspot.com/processtranscript', //https://faceclass-221a7.appspot.com/processtranscript
               data: bodyFormData,
               config: { headers: {'Content-Type': 'multipart/form-data' }}
               })
               
          
         })
         .then(function (response) {
            //handle success
            commit('SET_TRANSCRIPT_DATA',response.data)

            // console.log(response);
        })
         
        .catch(function (response) {
            //handle error
            console.log(response);
        });
         
      // Reach out to firebase and store it
   },
   

  }
})
