<template>

   <div>
      <div class="row">

         <!-- Post Content Column -->
         <div class="col-lg-8">

            <!-- Title -->
            <h1 class="mt-4">{{profInfo.FirstName }} {{profInfo.LastName}}</h1>


            <hr>

            <center>

               <div class="container">
                  <div class="row">
                     <div class="col-sm">
                        <img class="img-fluid rounded" :src="profInfo.pic_link" alt="" style="max-height: 500px;">
                     </div>
                  </div>
               </div>
            </center>





            <hr>

            <!-- Post Content -->


            <div class="container">
               <div class="row">
                  <div class="col-sm">
                     <div v-if="avgQuality!=-1">
                        <h5>Overall Quality:
                           <span v-for="k in Math.round(avgQuality)" class="text-warning">&#9733; </span>{{ avgQuality }}
                           <span>({{profInfo['Count(quality)']}})</span>
                        </h5>

                     </div>
                     <h5>Overall Difficulty: {{ avgDifficulty }}
                        <span>({{profInfo['Count(difficulty)']}})</span>
                     </h5>
                     <br/>
                     <h6>The difficulty and quality are out of 5</h6>
                     <h6>5 in quality means really good</h6>
                     <h6>5 in difficulty means really hard</h6>
                  </div>
                  <div class="col-sm">
                     <likechart></likechart>
                  </div>
               </div>
            </div>
            <!-- <hr> -->
            <!-- <profcourseinstance></profcourseinstance> -->
            <!-- <component v-if="loadingProfcourseinstance==true"is="profcourseinstance" > </component> -->


            <!-- Profcourseinstance will be here without componentizing -->
            <!-- {{profInfo['classinstances']}} -->
            <!-- {{classinstances}} -->
            <div v-if="expandedclassinstance">
               <br/>
               <div class="card card-body">
                  <div class="container">


                     <div class="row">
                        <div class="col">

                           <h5>{{expandedclassinstance}} Schedule</h5>
                        </div>

                        <div class="col">
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
                     <div class="row">
                        <div class="col">






                           <!-- {{classinstances[expandedclassinstance]}} -->

                           <table class="table table-sm">
                              <thead>
                                 <tr>
                                    <th scope="col">Course</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Classnumber</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr v-for="i in classinstances[expandedclassinstance].length">
                                    <th scope="row">
                                       <a href="javascript:void(0)" @click="gotoroutecourse(classinstances[expandedclassinstance][i-1]['course_id'])">{{classinstances[expandedclassinstance][i-1]['department']}} {{classinstances[expandedclassinstance][i-1]['number']}}{{classinstances[expandedclassinstance][i-1]['suffix']}}
                                          </a>
                                    </th>
                                    <td>{{classinstances[expandedclassinstance][i-1]['type']}}</td>
                                    <td>{{classinstances[expandedclassinstance][i-1]['location']}}</td>
                                    <td>{{classinstances[expandedclassinstance][i-1]['daytime']}}</td>
                                    <td>{{classinstances[expandedclassinstance][i-1]['classnumber']}}</td>
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
                     <th scope="col">Classes</th>
                     <th scope="col">Average Grade</th>
                     <th scope="col">Average Difficulty</th>
                     <th scope="col">Average Quality</th>
                     <th scope="col">Like/Dislike</th>
                  </tr>
               </thead>
               <tbody>

                  <tr v-for="(c,index) in profInfo.classes" :key="index">

                     <router-link :to="{ name: 'Course_profile', params: { id: c.course_id }}">

                        <td>{{c.course_name}}</td>

                     </router-link>
                     <th scope="row" v-if="c['Grades.grade_letter'] != null">{{c['Grades.grade_letter']}} ({{c['count(Grades.grade_float)']}})</th>
                     <td v-if="c['Grades.grade_letter'] == null">N/A</td>
                     <td>
                        <!-- <span v-if ="c['ROUND(avg(Grades.difficulty),1)'] <=2.0" class="badge badge-success">Easy</span> {{c['ROUND(avg(Grades.difficulty),1)']}} ({{c['count(Grades.difficulty)']}}) -->
                        <button v-if="c['ROUND(avg(Grades.difficulty),1)'] <=2.0" @mouseover="mouseOver(index)" :id="index" type="button" class="btn btn-success btn-sm btn-default"
                           style="width: 70px !important" data-toggle="tooltip" data-placement="top" :title="(c['ROUND(avg(Grades.difficulty),1)']).toString() +(' (').toString()+ (c['count(Grades.difficulty)']).toString() +(')').toString() ">
                           Easy
                        </button>
                        <button v-else-if="c['ROUND(avg(Grades.difficulty),1)'] <=4.0" @mouseover="mouseOver(index)" :id="index" type="button" class="btn btn-warning btn-sm btn-default"
                           data-toggle="tooltip" style="width: 70px !important" data-placement="top" :title="(c['ROUND(avg(Grades.difficulty),1)']).toString() +(' (').toString()+ (c['count(Grades.difficulty)']).toString() +(')').toString() ">
                           Medium
                        </button>
                        <button v-else @mouseover="mouseOver(index)" :id="index" type="button" class="btn btn-danger btn-sm btn-default" style="width: 70px !important"
                           data-toggle="tooltip" data-placement="top" :title="(c['ROUND(avg(Grades.difficulty),1)']).toString() +(' (').toString()+ (c['count(Grades.difficulty)']).toString() +(')').toString() ">
                           Hard
                        </button>


                     </td>
                     <td>
                        <span v-for="k in Math.round(c['ROUND(avg(Grades.quality),1)'])" class="text-warning">&#9733;</span>

                        {{c['ROUND(avg(Grades.quality),1)']}} ({{c['count(Grades.quality)']}})

                     </td>
                     <td>
                        <span v-if="c['count(Grades.like_int)'] > 0">{{c['Round(avg(Grades.like_int),2)'] * 100}}% ({{c['count(Grades.like_int)']}})</span>
                        <span v-else>N/A</span>
                     </td>
                  </tr>

               </tbody>
            </table>

            <div v-if="salaries.length>0">

               <h3>Benefits has been disabled by default</h3>
               <canvas id="salaryChart"></canvas>
               <h1>Professors Salary</h1>

               <!-- <Salarychart v-if="profId != '' && profInfo "></Salarychart> -->

               <table class="table">
                  <thead class="thead-dark">
                     <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Base Pay</th>
                        <th scope="col">Other Pay</th>
                        <th scope="col">Overtime Pay</th>
                        <th scope="col">Benefits</th>
                        <th scope="col">Total Pay(with benefits)</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="k in salaries">
                        <th scope="row">{{k.year}}</th>
                        <td>{{convertToMoney(k.base_pay)}}</td>
                        <td>{{convertToMoney(k.other_pay)}}</td>
                        <td>{{convertToMoney(k.overtime_pay)}}</td>
                        <td>{{convertToMoney(k.benefits)}}</td>
                        <td>{{convertToMoney(k.total_pay)}}</td>
                     </tr>

                  </tbody>
               </table>

            </div>

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

            <h5 class="card-header">Related Professors</h5>
            <div class="card-body">



               <div v-for="prof in relatedprofs" class="card h-100 mb-4" @click="clickrelated(prof.prof_id)">
                  <a href="#">
                     <img class="card-img-top" :src="prof.pic_link" alt="">
                  </a>
                  <div class="card-body">
                     <h4 class="card-title">
                        <!-- <router-link :to="{ name: 'Prof_profile', params: { id: prof.prof_id }}" class="btn btn-primary">look into -->

                        <a href="#">{{prof.FirstName}} {{prof.LastName}}</a>
                        <!-- </router-link> -->
                     </h4>
                  </div>
               </div>
            </div>

         </div>

      </div>

   </div>
   <!-- /.row -->

   </div>

</template>

<script>
   import axios from 'axios'
   import datalabels from 'chartjs-plugin-datalabels'
   import likechart from '@/components/likechart.vue'
   // const profcourseinstance = () => import('@/components/profcourseinstance.vue')

   export default {
      name: 'Prof_profile',
      components: {
         likechart,
         // 'profcourseinstance' : () => import('@/components/profcourseinstance.vue')
      },
      data() {
         return {
            title: 'Prof_profile',
            profId: '',
            comments: [],
            profInfo: {},
            profName: '',
            pic_link: '',
            salaries: [],
            avgQuality: -1,
            avgDifficulty: -1,
            relatedprofs: [],
            salariesStyled: [],
            loadingProfcourseinstance: false,
            classinstances: {},
            expandedclassinstance: ''

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
         gotoroutecourse(course_id) {
            this.$router.push({ name: 'Course_profile', params: { id: course_id } })
         },
         mouseOver(courseindex) {
            console.log(courseindex)
            // console.log("hovered")
            $('#' + courseindex).tooltip('show')

         },
         async initialize(theRoute) {
            this.profId = theRoute.params.id
            this.$store.state.profId = theRoute.params.id
            // console.log(this.$store.state.profId)
            await this.getData()
            await this.computation()
            await this.getSalary()
            await this.getProfcourseinstance()
            if (this.salaries.length > 0) { await this.createChart() }


            // this.$root.$emit('loadprofcourseinstance')

         },
         clickrelated(prof_id) {
            this.$router.push({ name: 'Prof_profile', params: { id: prof_id } })

         },
         async computation() {
            this.avgQuality = this.profInfo.Quality.toFixed(2)
            this.avgDifficulty = this.profInfo.Difficulty.toFixed(2)

         },
         async getData() {
            const response = await axios.get('https://faceclass-221a7.appspot.com/professorinfo/' + this.profId)
            const allData = response.data
            this.profName = allData.FirstName + ' ' + allData.LastName
            mixpanel.track("Professor " + this.profName)

            this.pic_link = allData.pic_link;
            this.profInfo = allData;

            this.$store.state.profInfo = allData;
            const response2 = await axios.get('https://faceclass-221a7.appspot.com/relatedprofessors/' + this.profId)
            this.relatedprofs = response2.data

         },
         convertToMoney(value) {
            return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
         },

         async getSalary() {
            const response = await axios.get('https://faceclass-221a7.appspot.com/professorsalary/' + this.profId)
            const allData = response.data
            for (const each in allData) {
               allData[each].total_pay = allData[each].base_pay + allData[each].other_pay + allData[each].overtime_pay + allData[each].benefits
            }
            this.salaries = allData


         },
         async getProfcourseinstance() {

            const response = await axios.get('https://faceclass-221a7.appspot.com/getprofcourseInstance/' + this.profId)
            // this.classinstances = response.data
            // this.profInfo['classinstances'] = response.data
            this.classinstances = response.data
            // console.log(this.profInfo['classinstances'])


            // console.log(this.classinstances)
            // this.profInfo.classinstances.expanded = Object.keys(this.profInfo.classinstances)[0]

            this.expandedclassinstance = Object.keys(this.classinstances)[0];

         },
         changeExpanded(quarteryearstring) {
            this.expandedclassinstance = quarteryearstring;
         },
         async createChart() {
            var ctxc = document.getElementById('salaryChart').getContext('2d');
            var maxSalary = 0;
            const yearsArr = []
            const totalpayArr = []
            const basepayArr = []
            const otherpayArr = []
            const overtimepayArr = []
            const benefitsArr = []
            for (const each in this.salaries) {
               benefitsArr.push(this.salaries[each].benefits)
               yearsArr.push(this.salaries[each].year)
               totalpayArr.push(this.salaries[each].total_pay)
               if (this.salaries[each].total_pay >= maxSalary) { maxSalary = this.salaries[each].total_pay; }
               basepayArr.push(this.salaries[each].base_pay)
               otherpayArr.push(this.salaries[each].other_pay)
               overtimepayArr.push(this.salaries[each].overtime_pay)
            }
            const totalizer = {
               id: 'totalizer',

               beforeUpdate: chart => {
                  let totals = {}
                  let utmost = 0

                  chart.data.datasets.forEach((dataset, datasetIndex) => {
                     if (chart.isDatasetVisible(datasetIndex)) {
                        utmost = datasetIndex
                        dataset.data.forEach((value, index) => {
                           totals[index] = (totals[index] || 0) + value
                        })
                     }
                  })

                  chart.$totalizer = {
                     totals: totals,
                     utmost: utmost
                  }
               }
            }

            new Chart(ctxc, {
               type: 'horizontalBar',
               data: {
                  labels: yearsArr,
                  datasets: [
                     {
                        label: 'Base Salary',
                        data: basepayArr,
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                     },
                     {
                        label: 'Other Pay',
                        data: otherpayArr,
                        backgroundColor: 'cyan'
                     },
                     {
                        label: 'Benefits',
                        data: benefitsArr,
                        backgroundColor: '#dbe7f9',
                        hidden: true,
                     },
                     {
                        label: 'Overtime Pay',
                        data: overtimepayArr,
                        backgroundColor: '#5080ff'
                     },

                  ]
               },
               options: {
                  scales: {
                     xAxes: [{
                        stacked: true,
                        ticks: {
                           beginAtZero: true,
                           suggestedMax: maxSalary * 1.06,
                           callback: function (value, index, values) {
                              return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
                           }
                        }
                     }],
                     yAxes: [{
                        stacked: true
                     }]
                  },
                  plugins: {
                     datalabels: {
                        formatter: (value, ctx) => {
                           const total = ctx.chart.$totalizer.totals[ctx.dataIndex]
                           return total.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,

                           })
                        },
                        align: 'end',
                        anchor: 'end',
                        display: function (ctx) {
                           return ctx.datasetIndex === ctx.chart.$totalizer.utmost
                        }
                     }
                  },
                  tooltips: {
                  }
               },
               plugins: [totalizer]
            });
         },

      },
      mounted() {
         // $('#test1').tooltip('show')
         // $('[data-toggle="tooltip"]').tooltip()

      }
   }
</script>

<style scoped>
</style>