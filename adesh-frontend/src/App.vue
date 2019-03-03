<template>
   <div id="app">

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
         <router-link to="/" class="navbar-brand" href="#">
            <img class=" mx-auto" :src="logo" width="40px" height="40px"> CruzCourse
         </router-link>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>

         <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
               <li class="nav-item" v-bind:class="[{active: selectedPage=='Home'}]" @click="changePage('Home')">
                  <router-link to="/" class="nav-link">Home
                     <span class="sr-only">(current)</span>
                  </router-link>
               </li>
               <li class="nav-item" v-bind:class="[{active: selectedPage=='Professor'}]" @click="changePage('Professor')">
                  <router-link to="/professor" class="nav-link">Professors
                     <span class="sr-only">(current)</span>
                  </router-link>
               </li>
               <li class="nav-item" v-bind:class="[{active: selectedPage=='Classes'}]" @click="changePage('Classes')">
                  <router-link to="/class" class="nav-link">Classes
                     <span class="sr-only">(current)</span>
                  </router-link>
               </li>
               <li class="nav-item" v-bind:class="[{active: selectedPage=='Mydata'}]" @click="changePage('Mydata')">
                  <router-link to="/Mydata" class="nav-link">Mydata
                     <span class="sr-only">(current)</span>
                  </router-link>
               </li>
               <li class="nav-item" v-bind:class="[{active: selectedPage=='About'}]" @click="changePage('About')">
                  <router-link to="/about" class="nav-link">About
                     <span class="sr-only">(current)</span>
                  </router-link>
               </li>
            </ul>
            <div class="form-inline my-2 my-lg-0 mr-3">
               <button v-if="signedin" @click="signout" class="btn btn-dark" type="submit">Sign Out</button>
               <!-- <user-signin></user-signin> -->
               <!-- <img :src="gsignin" style="width: 60%; height: 60%"></img> -->
               <img :src="gsignin" v-if="!signedin" style="cursor:click" @click="signin" height="50"></img>


            </div>

         </div>

         <!-- The top alert -->
         <div v-if = "topstatus" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
            <strong>{{topstatus}}</strong>  
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
   
      </nav>
      <div class="container">
         <router-view/>
      </div>
      <div v-if='loading' class="loader"></div>


      <footer class="bg-dark">
         <div class="container space-2">
            <div class="row justify-content-md-between">
               <div class="col-6 col-md-3 col-lg-2 order-lg-3 mb-7 mb-lg-0">
                  <br>
                  <h3 class="h6 text-white mb-3">©CruzCourse
                  </h3>
               </div>
            </div>
         </div>
      </footer>
   </div>
</template>
<script>
   // import userSignIn from './views/userupload'
   import gsignin from '@/assets/gsigninlogo.png'
   import logo from '@/assets/cruzcourse-01.png'

   export default {
      components: {
         // 'user-signin' :userSignIn

      },
      name: 'App',
      data() {
         return {
            selectedPage: 'Home',
            gsignin: gsignin,
            logo: logo
         }
      },

      methods: {
         signout() {
            console.log('Clicked sign out')
            this.$store.dispatch('signout')
         },
         changePage(page) {
            this.selectedPage = page
         },
         signin() {
            this.$store.dispatch('signin')
         },



      },
      computed: {
         loading() {
            return this.$store.state.loading
         },
         signedin() {
            return this.$store.state.goog_id != 'a'
         },
         topstatus() {
            return this.$store.state.topstatus
         }

      },
      watch: {
         '$route'() {
            $('.navbar-collapse').collapse('hide');
         },

         topstatus() {
            if(this.$store.state.topstatus) {

               var vm = this
               setTimeout(function(){
                   vm.$store.state.topstatus = ""
                   }, 1500);
            }
         }
      }
   }
</script>


<style>
   .loader {

      border: 16px solid #f3f3f3;
      /* Light grey */
      border-top: 16px solid #3498db;
      /* Blue */
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform: -webkit-translate(-50%, -50%);
      transform: -moz-translate(-50%, -50%);
      transform: -ms-translate(-50%, -50%);
   }

   @keyframes spin {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
</style>