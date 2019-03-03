<template>
   <div>
      <div v-if= "goog_id=='a'">
         <h1>Please sign in to upload your transcript!!</h1>
      </div>
      <br/>
      <div v-if = "goog_id != 'a'"class="custom-file">
         <input @change="onFilePicked" type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
         <label class="custom-file-label" for="inputGroupFile01">Choose file</label>

      </div>
      <div>
            <!-- {{transcriptData}} -->
            <h3>
               <div v-if='transcriptData.length>=1'>
                  <h3>Parsed transcript</h3>
                  <table class="table">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Course</th>
                            <th scope="col">Grade</th>
                            <th scope="col">Year</th>
                            <th scope="col">Quarter</th>
                            <th scope="col">Grade Float</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="k in transcriptData">
                            <th scope="row">{{k.course_str}}</th>
                            <td>{{k.grade_str}}</td>
                            <td>{{k.latestYear}}</td>
                            <td>{{k.latestQuarter}}</td>
                            <td>{{k.grade_float}}</td>
                          </tr>
   
                        </tbody>
                      </table>
               </div>
            </h3>
            <br/>
         </div>
      
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   data () {
      return {
      imageUrl: '',

      image: null,

      }
   },
   methods:{
      onFilePicked (event) {
            const files = event.target.files
            let filename = files[0].name

            console.log(filename)

            if (filename.lastIndexOf('.') <= 0) {
              return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]

            if(this.image != null){
               this.$store.state.labels = []
             this.$store.state.progressBar = true

            const imageData = {
               title: new Date().toLocaleString(),
              image: this.image,
            }

               this.$store.state.loading = true

               this.$store.dispatch('mlImage',imageData)
            }

          }

   },
   computed: {
      ...mapState([
         'transcriptData','goog_id'
      ])
   }
}
</script>