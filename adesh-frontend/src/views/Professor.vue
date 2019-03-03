<template>
   <div class="professor">
      <div class="text-center">
         <!-- <h1>{{title}}</h1> -->
         <!-- <div class="search-wrapper">
            <input type="text" v-model="search" placeholder="Search title.." />
         </div> -->
      </div>

      <br/>

      <ul class="pagination justify-content-end">
         <li v-bind:class="[{disabled: currentPage==1}]" class="page-item">
            <a class="page-link" @click="previousPage" href="javascript:void(0)">Previous</a>
         </li>

         <li class="page-item disabled">
            <a class="page-link text-dark" href="#">Page {{ currentPage }} of {{ totalPage }}</a>
         </li>

         <li v-bind:class="[{disabled: currentPage==totalPage}]" class="page-item">
            <a class="page-link" @click="nextPage" href="javascript:void(0)">Next</a>
         </li>
      </ul>

      <!-- <div class="dropdown text-right mt-2 mb-2">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
               Department
            </button>
            <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton" role="menu" >
               <label class="dropdown-item">
                  <input type="radio" v-model="selectedDepartment" value="All" /> All</label>
               <li v-for="Class in departments" :value="Class">
                  <label class="dropdown-item">
                     <input type="radio" v-model="selectedDepartment" :value="Class.department" /> {{ Class.department}}</label>
               </li>
            </div>
         </div> -->
      <div class="input-group mb-3 mt-3">

         <input v-on:keyup.enter="onEnter" v-model="shafiSearched" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Enter Professor Name">

         <a v-for="(result,index) in results" :key="index" class="dropdown-item" @click="changeto(index)" href="#">{{result.FirstName}} {{result.LastName}}</a>

         <div class="input-group-append">


            <!-- <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Department</button>
            <div class="dropdown-menu scrollable-menu">
                  <a v-for="department in departments" class="dropdown-item" href="#">{{department.department}}</a>
                  
                </div> -->


            <div class="dropdown text-right">
               <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  Department
               </button>
               <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton" role="menu" style="height: auto;max-height: 400px; overflow-x: hidden;">
                  <label class="dropdown-item">
                     <input type="radio" v-model="selectedDepartment" value="All" @click="changeDepartment('All')"/> All</label>
                  <li v-for="Class in departments" :value="Class" >
                     <label class="dropdown-item" >
                        <input type="radio" @click="changeDepartment(Class.department)" v-model="selectedDepartment" :value="Class.department" /> {{ Class.department}}</label>
                  </li>
               </div>
            </div>




         </div>
      </div>









      <div class="row text-center mx-auto">

         <div class="col-lg-4 col-sm-6 text-center mb-4" v-for="professor in professors"  style="cursor: pointer;">
             <router-link :to="{ name: 'Prof_profile', params: { id: professor.ID }}" >
               <!-- This a tag is used for ctrl + click -->
            <a > 
            <!-- <div class="mb-4" style="width: 22rem;"> -->
            <img class="rounded-circle mx-auto" :src="professor.pic_link" alt="Card image cap" width="200" height="220">
            <!-- <img class="card-img-top" :src="professor.pic_link" alt="Card image cap"> -->
            <div class="card-body">
               <h5 class="card-title">{{professor.FirstName}} {{professor.LastName}}</h5>
               <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
               <span v-for="k in Math.round(professor.quality)" class="text-warning">&#9733; </span> {{ professor.quality}} ({{professor.count}})
               <!-- <router-link :to="{ name: 'Prof_profile', params: { id: professor.ID }}" class="btn btn-primary">look into -->
               <span class="sr-only">(current)</span>
               <!-- </router-link> -->
            </div>
            <!-- </div> -->

            </a>
         </router-link>



         </div>



      </div>
      <ul class="pagination justify-content-center">
         <li v-bind:class="[{disabled: currentPage==1}]" class="page-item">
            <a class="page-link" @click="previousPage" href="javascript:void(0)">Previous</a>
         </li>

         <li class="page-item disabled">
            <a class="page-link text-dark" href="#">Page {{ currentPage }} of {{ totalPage }}</a>
         </li>

         <li v-bind:class="[{disabled: currentPage==totalPage}]" class="page-item">
            <a class="page-link" @click="nextPage" href="javascript:void(0)">Next</a>
         </li>
      </ul>
   </div>
</template>

<script>
   import axios from 'axios'
   export default {
      name: 'professor',
      data() {
         return {
            search: '',
            title: 'professor',
            professors: [],
            currentPage: 1,
            totalPage: 1,
            shafiSearched: '',
            shafiFound: 'None',
            results: [],
            filtering: {},
            departments: [],
            selectedDepartment: 'All'

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
         async initialize(theRoute) {
            this.currentPage = parseInt(theRoute.params.page)
            this.selectedDepartment = theRoute.params.department
            await this.getData()

         },
         goto(prof_id) {
            this.$router.push({ name: 'Prof_profile', params: { id: prof_id } })
         },
         onEnter() {
            this.professors = this.results
            this.results = []
         },
         changeto(index) {
            // console.log(index)
            this.shafiSearched = (this.results[index]).FirstName + " " + (this.results[index]).LastName
            this.shafiFound = this.shafiSearched
            var changedArray = []

            var smap = this.results[index]

            mixpanel.track("Searched prof " + this.shafiSearched)

            changedArray.push(smap)
            // console.log(changedArray)
            // console.log(this.professors)
            this.professors = changedArray


         },
         async getData() {
            this.$store.state.loading = true
            // const response = await axios.get('https://faceclass-221a7.appspot.com/getprofessors/page/' + this.currentPage)
            this.filtering['page'] = this.currentPage

            if (this.selectedDepartment == 'All') {
               delete this.filtering['department']
            }
            else {
               this.filtering['department'] = this.selectedDepartment
            }

            // const response = await axios.get('https://us-central1-faceclass-221a7.cloudfunctions.net/nodecruz/getprofessors?page=' + this.currentPage)

            const response = await axios({
               method: 'GET',
               url: 'https://us-central1-faceclass-221a7.cloudfunctions.net/nodecruz/getprofessors',
               params: this.filtering
            })

            const allData = response.data.data

            this.professors = allData
            this.totalPage = response.data.pages
            this.$store.state.loading = false
            this.$nextTick(() => {
               window.scrollTo(0, 1)
               window.scrollTo(0, 0)
            })
            // console.log(response.data)
            this.loadFilters()
         },
         async loadFilters() {
            const response = await axios.get('https://us-central1-faceclass-221a7.cloudfunctions.net/nodecruz/professorsfilters')
            this.departments = response.data


         },
         nextPage() {
            this.currentPage += 1
            this.$router.push({ name: 'professor', params: { department: this.selectedDepartment, page: this.currentPage } })
            // this.getData(this.currentPage)
         },
         previousPage() {
            this.currentPage -= 1
            this.$router.push({ name: 'professor', params: { department: this.selectedDepartment, page: this.currentPage } })

            // this.getData(this.currentPage)
         },
         async searchthis() {
            const response = await axios.get('https://faceclass-221a7.appspot.com/searchprofessors?name=' + this.shafiSearched)
            const allData = response.data
            // console.log(allData)
            this.results = allData

         },
         changeDepartment(inputdepartment){
          
            this.$router.push({ name: 'professor', params: { department: inputdepartment, page: 1 } })

            
         }
      },

      mounted() {
      },
      watch: {


         shafiSearched() {
            if (this.shafiSearched == '' && this.shafiSearched != this.shafiFound) {
               this.getData()
            }
            else if (this.shafiSearched == '' || this.shafiSearched == this.shafiFound) {
               this.results = []
            }

            else {

               this.searchthis()
            }

         }
      }

   }
</script>
