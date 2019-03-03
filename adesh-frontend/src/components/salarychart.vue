<template>
    <div >
    <canvas id="salaryChart"></canvas>

    </div>
 </template>
 
 <script>
import axios from 'axios'

 export default {
    name: 'salarychart',
    data() {
        return {
            profId: '',
            salaries: []
        }

    },
    created() {
            this.initialize(this.$route)
    },
    methods: {
        async initialize(theRoute) {
            this.profId = this.$store.state.profId;
            await this.getSalary()
            await this.createChart();
        },
        async createChart() {
            var ctxc = document.getElementById('salaryChart').getContext('2d');
            var maxSalary = 0;
            // console.log("Salaries should be displayed")
            // console.log(this.salaries)
            const yearsArr = []
            const totalpayArr = []
            const basepayArr = []
            const otherpayArr = []
            const overtimepayArr = []
            for(const each in this.salaries) {
                yearsArr.push(this.salaries[each].year)
                totalpayArr.push(this.salaries[each].total_pay)
                if(this.salaries[each].total_pay >= maxSalary) {maxSalary = this.salaries[each].total_pay; }
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
                datasets: [{
                    label: 'Base Salary',
                    data: basepayArr,
                    backgroundColor: 'rgba(0, 0, 255, 0.3)',
                }, {
                    label: 'Other Pay',
                    data: otherpayArr,
                    backgroundColor: 'cyan'
                }, {
                    label: 'Overtime Pay',
                    data: overtimepayArr,
                    backgroundColor: '#5080ff'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                    stacked: true,
                    ticks: {
                    beginAtZero: true,
                    suggestedMax: maxSalary*1.06,
                    callback: function(value, index, values) {
                        return value.toLocaleString("en-US",{style:"currency", currency:"USD",minimumFractionDigits: 0});
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
                    display: function(ctx) {
                    return ctx.datasetIndex === ctx.chart.$totalizer.utmost
                    }
                    }
                },
                tooltips: {
                // callbacks: {
                //       label: function(tooltipItem, data) {
                //          var indice = tooltipItem.index; 
                //          return data.datasets[tooltipItem.tooltipItem.index].label+ ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '€';
                //       }
                // }
            }
            },
            plugins: [totalizer]
            });
        },

        async getSalary() {
            const response = await axios.get('https://faceclass-221a7.appspot.com/professorsalary/' + this.profId)
            const allData = response.data
            for (const each in allData) {
                allData[each].total_pay = allData[each].base_pay + allData[each].other_pay + allData[each].overtime_pay
            }
            this.salaries = allData
               
        }

    }
 }
 
 </script>