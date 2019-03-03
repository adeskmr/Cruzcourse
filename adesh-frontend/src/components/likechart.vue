<template>
    <div >
        <div class="container">
            <div class="row">
                <div class="col-sm">

                    <canvas id="myChart"></canvas>
                </div>
            </div>
            <div class = "row">

                    {{profInfo['Round(AVG(like_int) ,2)'] * 100}}% of the students({{profInfo['Count(like_int)']}}) like this professor 
            </div>
        </div>
            <!-- {{profInfo}} -->

    </div>
 </template>
 
 <script>
import axios from 'axios'
import datalabels from 'chartjs-plugin-datalabels'
import { mapState, mapMutations, mapActions } from 'vuex'

 export default {
    name: 'likechart',
    data() {
        return {

   
        }

    },
    watch: {
        profInfo() {
            if(this.profInfo['FirstName']) {
                this.createChart();
            }
        }
    },
    created() {
        this.initialize()
    },
    
    methods: {
        async initialize() {
            // await this.something();
            // await this.createChart();
    

        },
        async something() {
            console.log("Create Chart is being initialized")
        },

        async createChart() {

            const likeNum = this.profInfo['Round(AVG(like_int) ,2)']
            const dislikeNum = Number.parseFloat(1-likeNum).toPrecision(2);
            // console.log(likeNum)
            const totalStudents = this.profInfo['Count(like_int)']
            var ctx = document.getElementById('myChart').getContext('2d');
        // Chart.defaults.global.legend.display = false;

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'horizontalBar',

            // The data for our dataset
            data: {
                datasets: [
                {
                    label: 'Like' + ' (' +(likeNum * 100) + '%)',
                    data: [Math.round(likeNum * totalStudents)],
                    backgroundColor: '#D6E9C6' // green
                },
                {
                    label: 'Dislike' + ' (' +(dislikeNum * 100) + '%)',
                    data: [Math.round(dislikeNum * totalStudents)],
                    backgroundColor: '#EBCCD1' // yellow
                }
                // ,
                // {
                //     label: 'High',
                //     data: [11.4],
                //     backgroundColor: '#EBCCD1' // red
                // }
                ]
            },

            // Configuration options go here
            options: {
                scales: {
    xAxes: [{ stacked: true }],
    yAxes: [{ stacked: true }]
  },
                legend: {
                    display: false
                }
            }
        });



        }


    },
    computed: {
        ...mapState([
      'profInfo',
    ]),

    },
    mounted() {




        

    }
 }
 
 </script>