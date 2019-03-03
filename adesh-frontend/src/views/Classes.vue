<template>

   <div class="Class ">
         <div class="mt-4">
               <input v-on:keyup.enter="onEnter" v-model="shafiSearched" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Class Name">
               <a v-for="(result,index) in results" :key="index" class="dropdown-item"  @click="changeto(index)"  href="#">{{result.department}} {{result.number}}{{result.suffix}}</a>
                  </div>





      <div class="row mt-4">
         <div class="col">
            <div class="row mx-auto">

               <div class="dropdown pr-2 text-left">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                     aria-expanded="false">
                     Department
                  </button>
                  <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton" role="menu" style="height: auto;max-height: 400px; overflow-x: hidden;">
                     <label class="dropdown-item">
                        <input type="radio" v-model="selectedDepartment" value="All" /> All</label>
                     <li v-for="Class in uifilter['department']" :value="Class">
                        <label class="dropdown-item">
                           <input type="radio" v-model="selectedDepartment" :value="Class.department" /> {{ Class.department}}</label>
                     </li>
                  </div>
               </div>

               <div class="dropdown pr-2 text-left">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                     aria-expanded="false">
                     General Education
                  </button>
                  <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton" role="menu" style="height: auto;max-height: 400px; overflow-x: hidden;">
                     <label class="dropdown-item">
                        <input type="radio" v-model="selectedgeneraleducation" value="All" /> All</label>
                     <li v-for="Class in uifilter['generaleducation']" :value="Class">
                        <label class="dropdown-item">
                           <input type="radio" class="remove(generaleducation)" v-model="selectedgeneraleducation" :value="Class.generaleducation" /> {{ Class.generaleducation}}</label>
                     </li>
                  </div>
               </div>

               <div class="dropdown text-left">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                     aria-expanded="false">
                     credits
                  </button>
                  <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton" role="menu" style="height: auto;max-height: 400px; overflow-x: hidden;">
                     <label class="dropdown-item">
                        <input type="radio" v-model="selectedcredits" value="All" /> All</label>
                     <li v-for="Class in uifilter['credits']" :value="Class">
                        <label class="dropdown-item">
                           <input type="radio" v-model="selectedcredits" :value="Class.credits" /> {{ Class.credits}}</label>
                     </li>
                  </div>
               </div>
            </div>
         </div>

         <div class="col">
            <ul class="pagination justify-content-end">
               <li v-bind:class="[{disabled: currentPage==1}]" class="page-item">
                  <a class="page-link" @click="previousPage" href="javascript:void(0)" >Previous</a>
               </li>

               <li class="page-item disabled">
                  <a class="page-link text-dark" href="#">Page {{ currentPage }} of {{ totalPage }}</a>
               </li>

               <li v-bind:class="[{disabled: currentPage==totalPage}]" class="page-item">
                  <a class="page-link" @click="nextPage" href="javascript:void(0)" >Next</a>
               </li>
            </ul>
         </div>




      </div>




      <div class="row ">


            <div style="cursor: pointer" class="col-lg-3 col-md-4 col-sm-6 mt-3 d-flex" v-for="Class in classList" @click="goTo(Class.course_id)">
   
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
   
                  </div>
               </div>
            </div>
         </div>

               <ul class="pagination justify-content-center mt-4">
                  <li v-bind:class="[{disabled: currentPage==1}]" class="page-item">
                     <a class="page-link" @click="previousPage" href="javascript:void(0)" >Previous</a>
                  </li>
   
                  <li class="page-item disabled">
                     <a class="page-link text-dark" href="#">Page {{ currentPage }} of {{ totalPage }}</a>
                  </li>
   
                  <li v-bind:class="[{disabled: currentPage==totalPage}]" class="page-item">
                     <a class="page-link" @click="nextPage" href="javascript:void(0)" >Next</a>
                  </li>
               </ul>
   
      </div>

</template>

<script>
   import axios from 'axios'
   export default {
      name: 'Class',
      data() {
         return {
            search: '',
            title: 'Class',
            classes: [],
            selectedgeneraleducation: "All",
            selectedDepartment: "All",
            commmageneraleducation: ", ",
            colorCache: {},
            selectedcredits: "All",
            filtering: {},
            uifilter: {},
            currentPage: 1,
            totalPage: 1,
            results: [],
            shafiSearched: ''
         }
      },
      beforeRouteUpdate(to, from, next) {
            this.initialize(to)
            next()
         },
      async created() {
         this.initialize(this.$route)

         

         // console.log("before")
         // console.log(this.$route)
         // console.log("after")
      },
      methods: {

         async initialize(theRoute){
            var rargs = theRoute.params
            console.log(rargs)
            this.selectedDepartment = rargs.department
            this.selectedgeneraleducation = rargs.generaleducation
            this.selectedcredits = rargs.credits
            this.currentPage = parseInt(rargs.page)


            await this.getData()
         await this.getFilteringData()

         },


         onEnter(){
            this.classes = this.results
            this.results = []

         },
         goTo(course_id){
   
            this.$router.push({name:'Course_profile',params:{id:course_id}})



         },
         async searchthis(){
            const response = await axios.get('https://faceclass-221a7.appspot.com/searchcourses?name=' + this.shafiSearched)
               const allData = response.data
               // console.log(allData)
               this.results = allData
         },
         changeto(index) {
            this.shafiSearched = (this.results[index]).department + " " + (this.results[index]).number +(this.results[index]).suffix
               this.shafiFound = this.shafiSearched
               var changedArray = []
               changedArray.push(this.results[index])
               this.classes = changedArray

         },
         nextPage() {
            this.currentPage += 1
            this.$router.push({name:'Class',params:{department:this.selectedDepartment, generaleducation: this.selectedgeneraleducation, credits: this.selectedcredits, page: this.currentPage}})
         },
         previousPage() {
            this.currentPage -= 1
            this.$router.push({name:'Class',params:{department:this.selectedDepartment, generaleducation: this.selectedgeneraleducation, credits: this.selectedcredits, page: this.currentPage}})
         },
         async getFilteringData() {
            const response = await axios({
               method: 'GET',
               url: 'https://faceclass-221a7.appspot.com/classuniquefilters',
            })

            const allData = response.data
            // console.log(allData)
            this.uifilter = allData
         },
         async getData() {
            this.$store.state.loading = true

            this.filtering['page'] = this.currentPage

            const response = await axios({
               method: 'GET',
               url: 'https://faceclass-221a7.appspot.com/getcourses',
               params: this.filtering
            })
            // console.log(this.filtering)
            this.classes = response.data.data
            this.totalPage = response.data.pages
            // console.log(this.classes)
            this.$store.state.loading = false
            this.$nextTick(() => {
                  window.scrollTo(0, 1)
                  window.scrollTo(0, 0)
            })
         },
         randomColor(course_id) {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
               color += letters[Math.floor(Math.random() * 16)];
            }
            return this.colorCache[course_id] || (this.colorCache[course_id] = `${color}`);
         }
      },
      computed: {
         classList: function () {
            var generaleducation = this.selectedgeneraleducation;
            var department = this.selectedDepartment;
            var credits = this.selectedcredits;
            if (generaleducation === "All" && department === "All" && credits === "All") {
               delete this.filtering['generaleducation']
               delete this.filtering['department']
               delete this.filtering['credits']
               return this.classes;
            } else {
               if (generaleducation != 'All') {
                  this.filtering['generaleducation'] = generaleducation
               }
               else {
                  delete this.filtering['generaleducation']
               }
               if (department != 'All') {
                  this.filtering['department'] = department
               }
               else {
                  delete this.filtering['department']
               }
               if (credits != 'All') {
                  this.filtering['credits'] = credits

               }
               else {
                  delete this.filtering['credits']
               }
               return this.classes

            }
         },
         // generaleducation: function () {
         //    // return this.uifilter['department']
         // },
         // department: function () {
         //    return [...new Set(this.classes.map(j => j.department))]
         //    // return ['All','AMS','CMPS']
         // },
         // credits: function () {
         //    return [...new Set(this.classes.map(j => j.credits))]
         // },
      },
      watch: {

         selectedDepartment() {
            this.$router.push({name:'Class',params:{department:this.selectedDepartment, generaleducation: this.selectedgeneraleducation, credits: this.selectedcredits, page: this.currentPage}})

            // this.getData()
         },
         selectedgeneraleducation() {
            this.$router.push({name:'Class',params:{department:this.selectedDepartment, generaleducation: this.selectedgeneraleducation, credits: this.selectedcredits, page: this.currentPage}})

            // this.getData()
         },
         selectedcredits() {
            this.$router.push({name:'Class',params:{department:this.selectedDepartment, generaleducation: this.selectedgeneraleducation, credits: this.selectedcredits, page: this.currentPage}})

            // this.getData()
         },
         shafiSearched() {
               if (this.shafiSearched == '' && this.shafiSearched!=this.shafiFound){
                  this.getData()
               }
               else if (this.shafiSearched == '' || this.shafiSearched==this.shafiFound){
                  this.results = []
               }
               
               else{
               
                  this.searchthis()
               }
               
            }
      }
   }
</script>

<style scoped>
   /* Styles for wrapping the search box */

.main {
    width: 50%;
    margin: 50px auto;
}

/* Bootstrap 4 text input with search icon */

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}
</style>