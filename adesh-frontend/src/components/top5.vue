<template>
   <div>

      <div class="container">

         <!-- Page Heading -->
         <h1 class="my-4">Top 5 Highest Rated
            <small>Professors</small>
         </h1>

         <div class="row">

            <div v-for="k in qualityRanking" class="col portfolio-item" @click="gotoroute(k.ID)">

               <div class="card h-100">
                  <a href="#">
                     <img v-if="!k.pic_link" class="card-img-top" src="http://placehold.it/700x400">
                     <img v-else class="card-img-top" :src="k.pic_link">

                  </a>
                  <div class="card-body">
                     <h4 class="card-title">
                        <a href="#">{{k.FirstName}} {{k.LastName}}</a>
                     </h4>
                     <!-- <p class="card-text">{{k.theVal}}</p> -->
                     <span v-for="k in Math.round(k.theVal)" class="text-warning">&#9733;</span> {{k.theVal}} ({{k.count}})
                     <!-- <p>{{k.count}} people rated</p> -->
                  </div>
               </div>
            </div>



         </div>
      </div>


      <div v-for = 'easygeranking in easiestGeRankings'class="container">
         <!-- Page Heading -->
         <h1 class="my-4">Easiest {{easygeranking.title}}
            <small> courses offered in Spring Quarter</small>
         </h1>
         <div class="row">

               <div style="cursor: pointer" class="col-lg-3 col-md-4 col-sm-6 mt-3 d-flex" v-for="Class in easygeranking.ranking" @click="gotoroutecourse(Class.course_id)">
   
                     <div class="card text-left btn-link" role="button" style="width: 18rem; fill: white">
         
         
                        <svg>
                           <rect width="300" height="300" class="card-img-top" alt="Card image cap" :style='{fill: randomColor(Class.course_id)}' />
                        </svg>
                        <div class="card-body">
         
                           <h5 class="card-title">
         
                                 {{ Class.name}}
                           </h5>
         
         
         
                           <h6 class="card-subtitle mb-2 text-muted">{{ Class.generaleducation}}</h6>
                           <p class="card-text">
                              {{ Class.department}} {{ Class.number}}{{Class.suffix}}
                           </p>
                           <p>
                              <!-- <b>Difficulty: </b>{{Class['Round(AVG(Grades.difficulty),2)']}} ({{Class['count(Grades.course_id)']}}) -->

                                           <button v-if ="Class['Round(AVG(Grades.difficulty),2)'] <=2.0" @mouseover="mouseOver(Class.course_id)" :id="Class.course_id" type="button" class="btn btn-success btn-sm btn-default" style="width: 70px !important" data-toggle="tooltip" data-placement="top" :title="(Class['Round(AVG(Grades.difficulty),2)']).toString() +(' (').toString()+ (Class['count(Grades.course_id)']).toString() +(')').toString() ">
                                 Easy
                           </button>
                           <button v-else-if ="Class['Round(AVG(Grades.difficulty),2)'] <=4.0" @mouseover="mouseOver(Class.course_id)" :id="Class.course_id" type="button" class="btn btn-warning btn-sm btn-default" style="width: 70px !important" data-toggle="tooltip" data-placement="top" :title="(Class['Round(AVG(Grades.difficulty),2)']).toString() +(' (').toString()+ (Class['count(Grades.course_id)']).toString() +(')').toString() ">
                                 Medium
                           </button>
                           <button v-else @mouseover="mouseOver(Class.course_id)" :id="Class.course_id" type="button" class="btn btn-danger btn-sm btn-default" style="width: 70px !important" data-toggle="tooltip" data-placement="top" :title="(Class['Round(AVG(Grades.difficulty),2)']).toString() +(' (').toString()+ (Class['count(Grades.course_id)']).toString() +(')').toString() ">
                                 Hard
                           </button>
                           </p>
                           
                        </div>
                     </div>
                  </div>

         </div>
      </div>



      <!-- <div class="container">
         
         <h1 class="my-4">Top 5 Highest Paid
           <small>Professors</small>
         </h1>
   
         <div class="row">
           <div v-for="k in salaryRanking" class="col portfolio-item">
             <div class="card h-100">
               <a href="#">
                   <img v-if="!k.pic_link" class="card-img-top" src="http://placehold.it/700x400">
                   <img v-else class="card-img-top" :src="k.pic_link">
                 
                 </a>
               <div class="card-body">
                 <h4 class="card-title">
                 <router-link :to="{ name: 'Prof_profile', params: { id: k.prof_id }}">
             
                     <a href="#">{{k.FirstName}} {{k.LastName}}</a>
                 </router-link>
                 </h4>
                 <p class="card-text">{{k.theVal}}</p>
                 <p>{{k.count}} people rated</p>
               </div>
             </div>
           </div>
         </div>
       </div> -->





         
   </div>
</template>

<script>
   import axios from 'axios'

   export default {
      name: 'top5',
      data() {
         return {
            qualityRanking: [],
            salaryRanking: [],
            easiestGeRankings: [],
            colorCache: {},

         }

      },
      created() {
         this.initialize()
      },
      methods: {
         gotoroute(prof_id) {
            this.$router.push({ name: 'Prof_profile', params: { id: prof_id } })
         },
         gotoroutecourse(course_id) {
            this.$router.push({ name: 'Course_profile', params: { id: course_id } })
         },
         async initialize() {
            await this.getQualityRanking()
            // await this.getSalaryRanking()
            await this.getEasiestGes()
         },
         async getQualityRanking() {
            const response = await axios.get('https://faceclass-221a7.appspot.com/qualityranking')
            this.qualityRanking = response.data
         },
         async getSalaryRanking() {
            const response = await axios.get('https://faceclass-221a7.appspot.com/salaryranking')
            this.salaryRanking = response.data
            // console.log(this.salaryRanking)
         },
         async getEasiestGes() {
            const response = await axios.get('https://us-central1-faceclass-221a7.cloudfunctions.net/nodecruz/topge')
            this.easiestGeRankings = response.data

         },
         mouseOver(courseindex){
            //console.log(courseindex)
            // console.log("hovered")
            $('#'+courseindex).tooltip('show')

         },
         randomColor(course_id) {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
               color += letters[Math.floor(Math.random() * 16)];
            }
            return this.colorCache[course_id] || (this.colorCache[course_id] = `${color}`);
         }
      }
   }

</script>

