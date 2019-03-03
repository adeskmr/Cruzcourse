


<template>
    <div >
    
        <!-- <p>
            <span class = "col-sm" v-for="i in Object.keys(classinstances).length">

                <button v-on:click="changeExpanded(Object.keys(classinstances)[i-1])" class="btn btn-primary">
                    <span >{{Object.keys(classinstances)[i-1]}}</span>
                  
                </button>
           
            </span>
          </p> -->

          
          <!-- <div class="collapse" id="collapseExample"> -->
            <br/>
            <h1>Prof course instance is loaded</h1>
            <span v-if="classinstances">{{classinstances}}</span>
            <!-- <div class="card card-body">
                <div class = "container">


                <div class = "row">
                    <div class = "col">

                        <h5>{{classinstances.expanded}} Schedule</h5>
                    </div>

                    <div class = "col">
                            <div class="btn-group float-right pb-2">
                                    <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{classinstances.expanded}}
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

       
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Course</th>
                                <th scope="col">Type</th>
                                <th scope="col">Location</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="i in classinstances[expanded].length"> 
                                <th scope="row">{{classinstances[expanded][i-1]['department']}} {{classinstances[expanded][0]['number']}}{{classinstances[expanded][0]['suffix']}}</th>
                                <td>{{classinstances[expanded][i-1]['type']}}</td>
                                <td>{{classinstances[expanded][i-1]['location']}}</td>
                                <td>{{classinstances[expanded][i-1]['daytime']}}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                </div>
            </div>

 

            </div> -->
          <!-- </div> -->

    </div>
 </template>
 
 <script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
 export default {
    name: 'profcourseinstance',
    data() {
        return {
   
        }

    },
    watch: {
        profInfo() {
            // if(this.profInfo['FirstName']) {
            //     this.getProfcourseinstance()
                
            // }

                
        }
    },
    mounted(){
        // let vm = this;
        // this.$root.$on('loadprofcourseinstance', () =>{
        //     console.log("root emitted")

        //         vm.getProfcourseinstance()
                

        // })

    },
    created() {
        this.initialize()
    },
    methods: {
        async initialize() {
      
        },
        // async getProfcourseinstance() {
        //     const response = await axios.get('https://faceclass-221a7.appspot.com/getprofcourseInstance/' + this.profInfo['ID'])
        //     // this.classinstances = response.data
        //     this.classinstances = response.data
        //     console.log(this.classinstances)
        //     this.expanded = Object.keys(this.classinstances)[0]
        //     // console.log(this.expanded)
        // },

        changeExpanded(quarteryearstring){
            this.classinstances.expanded = quarteryearstring;
        }

    },
    computed: {
        ...mapState([
      'profInfo',
    ]),
    classinstances: function () {
        return this.profInfo.classinstances
    }
    
    }
 }
 
 </script>