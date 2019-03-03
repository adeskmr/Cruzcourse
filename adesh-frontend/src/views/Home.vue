<template>

  <!-- This is just testing -->
 <div>
    <link class="circular"  :style="{ 'background-image': 'url(' + image + ')' }">

          <top5></top5>

           <br>
<div class=" row">
              <div class="text-center col-md-3" >
                  <img class="rounded-circle mx-auto" :src="sign" alt="Card image cap" width="275px" height="275px">
                  <div class="card-body">
                    <p class="card-text ">Sign in or Sign up with Google</p>
                  </div>
                </div>
                <br>
                <div class="text-center col-md-3" >
                    <img class="rounded-circle mx-auto" :src="trans" alt="Card image cap" width="275px" height="275px">
                    <div class="card-body">
                      <p class="card-text">Upload your Unofficial transcript and view your data</p>
                    </div>
                  </div>
                  <br>
                  <div class="text-center col-md-3" >
                      <img class="rounded-circle mx-auto" :src="prof" alt="Card image cap" width="275px" height="275px">
                      <div class="card-body">
                        <p class="card-text">View the professors teaching a course</p>
                      </div>
                    </div>
                    <br>
                    <div class="text-center col-md-3" >
                        <img class="rounded-circle mx-auto" :src="cours" alt="Card image cap" width="275px" height="275px">
                        <div class="card-body">
                          <p class="card-text">View the courses you want, find the average grade, and the requirements for that course</p>
                        </div>
                      </div>
                    </div>

            </div>  
  </template>

 
  <script>
    import image from '@/assets/home.jpg'
    import sign from '@/assets/Signin.png'
    import trans from '@/assets/Trans.png'
    import cours from '@/assets/Courses.png'
    import prof from '@/assets/Proff.png'
    import top5 from '@/components/top5.vue'
  export default {
    name: 'home',
    name: 'circular',
    components: {
      top5,
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        image: image,
        sign: sign,
        trans: trans,
        cours: cours,
        prof: prof,
      }
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
 .circular{
  width: display-width;
  height: display-height;
  background-position: center center;
	background-repeat:  no-repeat;
  background-size: cover;

}
  </style>