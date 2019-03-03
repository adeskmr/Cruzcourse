<template>

    <div>

         <!-- <div v-if = "goog_id != 'a' && requiredCoursesStr" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
               <strong>You have not met the requirements</strong> You need to take {{requiredCoursesStr}}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div> -->

  

      <div class="row">
   
         <!-- Post Content Column -->
         <div class="col-lg-8">

            <!-- Title -->
            <h1 class="mt-4">{{courseInfo.department }} {{courseInfo.number}}{{courseInfo.suffix}}</h1>
            <h5>{{ courseInfo.name }}</h5>
            <hr>
            
            
            <h6>General Education: {{ courseInfo.generaleducation }}</h6>
            <h6>Credits: {{ courseInfo.credits }}</h6>
            
     
            <h6>Overall Quality: {{ courseInfo['Round(AVG(quality),2)']}} ({{courseInfo['count(quality)']}})</h6>
            <h6>Overall Difficulty: {{ courseInfo['Round(AVG(difficulty),2)']}} ({{courseInfo['count(difficulty)']}})</h6>
            <h6>Average Grade: {{ courseInfo.average_grade_str }} ({{courseInfo['count(grade_float)']}})</h6>
            
            <br/>
            <div v-if="expandedclassinstance">
               <br/>
                        <div class="card card-body">
                <div class = "container">


                <div class = "row">
                    <div class = "col">

                        <h5>{{expandedclassinstance}} Schedule</h5>
                    </div>

                    <div class = "col">
                            <div class="btn-group float-right pb-2">
                                    <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{expandedclassinstance}}
                                    </button>
                                    <div class="dropdown-menu">
 
                                        <div v-for="i in Object.keys(classinstances).length">

                                            <a v-on:click="changeExpanded(Object.keys(classinstances)[i-1])" class="dropdown-item">{{Object.keys(classinstances)[i-1]}}</a>
                                        </div>
                                    </div>
                                  </div>
                    </div>

                </div>
                <div class = "row">
                    <div class="col">

                    

                
                     
                     <!-- {{classinstances[expandedclassinstance]}} -->
       
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Professor</th>
                                <th scope="col">Location</th>
                                <th scope="col">Time</th>
                                <th scope="col">Class number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="i in classinstances[expandedclassinstance].length"> 
                                <th v-if ="classinstances[expandedclassinstance][i-1]['FirstName']" scope="row"> <a href = "javascript:void(0)" @click="gotoroute(classinstances[expandedclassinstance][i-1]['prof_id'])">{{classinstances[expandedclassinstance][i-1]['FirstName']}} {{classinstances[expandedclassinstance][i-1]['LastName']}} </a></th>
                                <th v-else scope="row">{{classinstances[expandedclassinstance][i-1]['professor_name']}}</th>
                                <td>{{classinstances[expandedclassinstance][i-1]['location']}}</td>
                                <td>{{classinstances[expandedclassinstance][i-1]['daytime']}}</td>
                                <td>{{classinstances[expandedclassinstance][i-1]['classnumber']}} <span @mouseover="mouseOverClipboard(classinstances[expandedclassinstance][i-1]['classnumber'])" :id="classinstances[expandedclassinstance][i-1]['classnumber']" data-toggle="tooltip" data-placement="right" title="Click to copy class number" @click = "copyNumber(classinstances[expandedclassinstance][i-1]['classnumber'])"><i class = "far fa-copy"></i></span></td>
                            </tr>
                            
                        </tbody>
                    </table>
                  </div>
                </div>
                </div>
            </div>

 

            </div>
            <br/>
            <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Average Grade</th>
                      <th scope="col">Average Difficulty</th>
                      <th scope="col">Quality</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(p,index) in courseProfessors" :key="index">
                
                      <router-link :to="{ name: 'Prof_profile', params: { id: p.prof_id }}">
                    
                           <td>{{p.FirstName}} {{p.LastName}}</td>
                            
                          </router-link>


                      <td v-if = "p['avg_grade_letter']">{{p['avg_grade_letter']}} ({{p['COUNT(Grades.grade_float)']}})</td>
                      <td v-else>N/A</td>
                      
                      <td v-if = "p['Round(AVG(Grades.difficulty),2)']">
                           <button v-if ="p['Round(AVG(Grades.difficulty),2)'] <=2.0" @mouseover="mouseOver(index)" :id="index" type="button" class="btn btn-success btn-sm btn-default" style="width: 70px !important" data-toggle="tooltip" data-placement="top" :title="(p['Round(AVG(Grades.difficulty),2)']).toString() +(' (').toString()+ (p['COUNT(Grades.difficulty)']).toString() +(')').toString() ">
                                 Easy
                           </button>
                           <button v-else-if ="p['Round(AVG(Grades.difficulty),2)'] <=4.0" @mouseover="mouseOver(index)" :id="index" type="button" class="btn btn-warning btn-sm btn-default" style="width: 70px !important" data-toggle="tooltip" data-placement="top" :title="(p['Round(AVG(Grades.difficulty),2)']).toString() +(' (').toString()+ (p['COUNT(Grades.difficulty)']).toString() +(')').toString() ">
                                 Medium
                           </button>
                           <button v-else @mouseover="mouseOver(index)" :id="index" type="button" class="btn btn-danger btn-sm btn-default" style="width: 70px !important" data-toggle="tooltip" data-placement="top" :title="(p['Round(AVG(Grades.difficulty),2)']).toString() +(' (').toString()+ (p['COUNT(Grades.difficulty)']).toString() +(')').toString() ">
                              Hard
                           </button>
                        
                        <!-- {{p['Round(AVG(Grades.difficulty),2)']}} ({{p['COUNT(Grades.difficulty)']}}) -->
                     
                     
                     </td>
                      <td v-else>N/A</td>   
                      <td>
                           <span v-for="k in Math.round(p['Round(AVG(Grades.quality),2)'])" class="text-warning">&#9733;</span>
                           {{p['Round(AVG(Grades.quality),2)']}} ({{p['COUNT(Grades.quality)']}})
                        </td>

                           
                        
                        <!-- {{c['ROUND(avg(Grades.quality),1)']}} ({{c['count(Grades.quality)']}}) -->
                     
                     </td>
                    </tr>
                    
                  </tbody>
                </table>

               <hr/>
               <br/>
                <h6>{{ courseInfo['Requiredcourses.description']}}</h6>

                <small>{{courseInfo['description']}}</small>

            <hr>

            <!-- Comments Form -->
            <!-- <div class="card my-4">
               <h5 class="card-header">Leave a Comment:</h5>
               <div class="card-body">
                  <form>
                     <div class="form-group">
                        <textarea class="form-control" rows="3"></textarea>
                     </div>
                     <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
               </div>
            </div> -->

            <!-- Single Comment -->
            <!-- <div v-for="(comment,index) in comments" :key="index" class="media mb-4">
               <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
               <div class="media-body">
                  <h5 class="mt-0">{{ comment.course_str }}</h5>
                  <h6 class="ml-2">Grade Received: {{comment.grade_str}}</h6>
                  <h6 class="ml-2">Overall Quality: {{comment.quality}} </h6>
                  <h6 class="ml-2">Difficulty Level: {{comment.difficulty}}</h6>
                  
                  {{comment.comment}}
               </div>
            </div> -->

            <!-- Comment with nested comments -->
           

         </div>

         <!-- Sidebar Widgets Column -->
         <div class="col-lg-4">

            <!-- Side Widget -->
           
         </div>

      </div>
    </div>
 
 </template>
 
 <script>
    import axios from 'axios'

   import { mapState } from 'vuex'


    export default {
       name: 'Course_profile',
       components: {
       },
       data() {
          return {
             title: 'Course_profile',
             courseId: '',
             courseInfo: {},
             courseProfessors: [],
             requiredCoursesStr: '',
             loadingProfcourseinstance: false,
             classinstances: {},
             expandedclassinstance: ''
          }
       },
       watch: {
         goog_id() {
            this.requiredCoursesStr = ''
            // this.getCourserequirements()
         }

       },
       beforeRouteUpdate(to, from, next) {
          this.initialize(to)
          next()
       },
       created() {
          this.initialize(this.$route)
       },
    
       methods: {
         gotoroute(prof_id) {
            this.$router.push({ name: 'Prof_profile', params: { id: prof_id } })
         },
         mouseOver(courseindex){
               console.log(courseindex)
               // console.log("hovered")
               $('#'+courseindex).tooltip('show')

            },

            mouseOverClipboard(num){

               $('#'+num).tooltip('show')

            },
          async initialize(theRoute) {
             this.courseId = theRoute.params.id
             await this.getCourseinfo()
             await this.getCourseprofessors()
             await this.getCourseclassinstance()
            //  await this.getCourserequirements()

          },
         copyNumber(num){
            console.log(num)
            var inp =document.createElement('input');
            document.body.appendChild(inp)
            inp.value =num
            inp.select();
            document.execCommand('copy',false);
            this.$store.state.topstatus = num + " has been copied"
            inp.remove();
          },
          
          async getCourseinfo() {
                  // console.log("calling courseinfo now")
                  const response = await axios.get('https://faceclass-221a7.appspot.com/courseinfo/' + this.courseId)
                  const allData = response.data[0]
                  this.courseInfo = allData
               // console.log(allData)
            },

            async getCourseprofessors( ) {
               const response = await axios.get('https://faceclass-221a7.appspot.com/courseprofessors/' + this.courseId)
               const allData = response.data
               this.courseProfessors = allData  
               // console.log(this.courseProfessors)

            },
            async getCourseclassinstance() {
               
               const response = await axios.get('https://faceclass-221a7.appspot.com/getcourseClassInstance/' + this.courseId)
               // this.classinstances = response.data
               // this.profInfo['classinstances'] = response.data
               this.classinstances = response.data
               // console.log(this.profInfo['classinstances'])


               // console.log(this.classinstances)
               // this.profInfo.classinstances.expanded = Object.keys(this.profInfo.classinstances)[0]

               this.expandedclassinstance = Object.keys(this.classinstances)[0];

            },
            changeExpanded(quarteryearstring){
            this.expandedclassinstance = quarteryearstring;
        },

            async getCourserequirements() {
               console.log("The right goog id is "+ this.goog_id)

               var bodyFormData = new FormData();
               bodyFormData.set('goog_id', this.goog_id);
               bodyFormData.set('course_id',this.courseId )

               var vm = this

               axios({
                  method: 'post',
                  url: 'https://faceclass-221a7.appspot.com/getcourserequirements',
                  data: bodyFormData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
                  })
                  .then(function (response) {
                     //handle success
                     // console.log(response.data);
                     const req_courses = response.data['req_courses']
                     vm.requiredCoursesStr += req_courses[0]

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
 </style>