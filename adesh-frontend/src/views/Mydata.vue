<template>

    <div>

    
      <br/>

      <div v-if = "goog_id=='a'">
         
            <div class="alert alert-warning" role="alert">
                  You need to sign in to access this page
                </div>      
         </div>

          <div v-if = "goog_id != 'a' && myDataArr.length==0" class="alert alert-danger" role="alert">
               <h4 class="alert-heading">You need to upload your transcript silly!</h4>
               <p>After you upload your transcript, this page will be populated!</p>
               <hr>

               <router-link :to="{ name: 'uploadtranscript', params: {  }}">
                     
                     <p class="mb-0">CLICK HERE to upload your transcript</p>
                 </router-link>
             </div>
             <div v-if = "myDataArr.length!=0">





               <!-- On rows -->
               <table class="table table-hover">
                     <thead>
                       <tr>
                         <th scope="col">Course</th>
                         <th scope="col">Credits Earned</th>
                         <th scope="col">Grade Received</th>
                         <th scope="col">My Rating</th>
                         <th scope="col">Time</th>
                         
                       </tr>
                     </thead>
                     <tbody>
                       <tr v-for="(c,index) in myDataArr" :key="index">
                         <th scope="row"><a href="javascript:void(0)"><span @click="gotoroute(c.course_id)">{{c.course_str}}</span></a></th>
                         <td>{{c.earned}}</td>
                         <td>{{c.grade_str}}</td>
                         <td>

                          <div class = "container">
                           <div class = "row">
                           <!-- {{c.quality}} -->
                           <span v-show="c.like_int == null" @click="changeRating(index,c.ID,1)"><i  class = "far fa-thumbs-up fa-2x"></i></span>
                           <span v-show="c.like_int == 1" @click="changeRating(index,c.ID,-1)"><i  class="fas fa-thumbs-up fa-2x"  @click="console.log(3)"></i></span>
                           <span v-show="c.like_int == null"  @click="changeRating(index,c.ID,0)"><i class = "far fa-thumbs-down fa-2x"></i></span>
                           <span v-show= "c.like_int == 0"  @click="changeRating(index,c.ID,-1)"><i  class="fas fa-thumbs-down fa-2x" ></i></span>
                           <div v-show="c.loading == true"class="loadersmall">Loading...</div>
                          </div>
                          </div>
                         </td>
                         <td>{{c.quarter}} {{c.year}}</td>
            
                       </tr>
                     </tbody>
                   </table>
                <!-- {{myDataArr}} -->
               </div>
 
    </div>
 
 </template>
 
 <script>
    import axios from 'axios'

   import { mapState } from 'vuex'

    export default {
       name: 'Mydata',
       components: {
       },
       data() {
          return {
             title: 'mydata',
             myDataArr: [],

          }
       },
       watch: {
         goog_id() {
            this.getMyData()
         }
      },
       created() {
          this.initialize()
       },
    
       methods: {
           async initialize() {
             await this.getMyData()
          }, 
          gotoroute(course_id){
            this.$router.push({name:'Course_profile',params:{id:course_id}})

           },  

          getMyData() { //https://faceclass-221a7.appspot.com    http://localhost:8080
            var bodyFormData = new FormData();
            bodyFormData.set('goog_id', this.$store.state.goog_id);
            this.$store.state.loading = true
            var vm = this
            axios({
              method: 'post',
              url: 'https://faceclass-221a7.appspot.com/getmydatanew',
              data: bodyFormData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                vm.myDataArr = response.data
                vm.$store.state.loading = false
                console.log(response.data)
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
              });
         },
         changeRating(index,gradeID, type_int){
           console.log(gradeID + ' ' + type_int)
           var bodyFormData = new FormData();
            bodyFormData.append('goog_id', this.$store.state.goog_id);
            bodyFormData.append('grade_id', gradeID);
            bodyFormData.append('type_int', type_int)
            // this.$store.state.loading = true
            this.myDataArr[index].loading = true;
            var vm = this
            axios({
              method: 'post',  //http://localhost:8080  https://faceclass-221a7.appspot.com
              url: 'https://faceclass-221a7.appspot.com/changerating',
              data: bodyFormData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                // vm.$store.state.loading = false
                vm.myDataArr[index].loading = false;
                // vm.getMyData()

                if (type_int == -1) {
                  vm.myDataArr[index].like_int = null;
                } else {
                vm.myDataArr[index].like_int = type_int;
                }
                
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
              });





         }

       },
       computed: {
         ...mapState([
         'goog_id'
      ])
       },
       mounted() {
       }
    }
 </script>
 
 <style scoped>
   .loadersmall,
.loadersmall:before,
.loadersmall:after {
  border-radius: 20%;
  width: 1.5em;
  height: 1.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loadersmall {
  color: #4c83b8;
  font-size: 8px;
  margin: 10px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loadersmall:before,
.loadersmall:after {
  content: '';
  position: absolute;
  top: 0;
}
.loadersmall:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loadersmall:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

 </style>