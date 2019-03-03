<template>
        <div class="about">
              <br>


<!-- Team Section -->
<div class="container space-2 space-3--lg">

   
      <!-- <span style="display: block;">
          Hello world
      </span> -->



                <div class="row mb-8 center-block">
                  <div class="col-lg-3 col-md-4 col-sm-6 mt-3 d-flex">
                    <!-- Team -->


                    <div class="text-center" >
                        <a style="color:inherit;text-decoration: none;"href="https://linkedin.com/in/rafi-haque-b45718b8/">
                      <img class="u-lg-avatar shadow-lg rounded-circle mx-auto mb-4"  :src="rafi" alt="Image Description" width="200px" height="200px">
                      <h4 class="h5">Rafi Haque</h4>
                      <span class="d-block text-primary">CEO, Co-Founder</span>
                      <hr>
                      <a class="text-secondary font-size-14" href="#">mrhaque@ucsc.edu</a>
                    </a>
                    </div>
                    <!-- End Team -->
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 mt-3 d-flex">
                        <!-- Team -->
                        <div class="text-center">
                          <img class="u-lg-avatar shadow-lg rounded-circle mx-auto mb-4" :src="shafi" alt="Image Description" width="200px" height="200px">
                          <h4 class="h5">Shafi Haque</h4>
                          <span class="d-block text-primary">CTO, Co-Founder</span>
                          <hr>
                          <a class="text-secondary font-size-14" href="#">mdshaque@ucsc.edu</a>
                        </div>
                        <!-- End Team -->
                      </div>
              
                  <div class="col-lg-3 col-md-4 col-sm-6 mt-3 d-flex">
                    <!-- Team -->
                    <div class="text-center">
                      <img class="u-lg-avatar shadow-lg rounded-circle mx-auto mb-4"  :src="arthur" alt="Image Description" width="200px" height="200px">
                      <h4 class="h5">Arthurlot Li</h4>
                      <span class="d-block text-primary">Backend Developer</span>
                      <hr>
                      <a class="text-secondary font-size-14" href="#">ali64@ucsc.edu</a>
                    </div>
                    <!-- End Team -->
                  </div>
              
                  

                  <div class="col-lg-3 col-md-4 col-sm-6 mt-3 d-flex">
                    <!-- Team -->
                    <div class="text-center">
                      <img class="u-lg-avatar shadow-lg rounded-circle mx-auto mb-4" :src="adesh" alt="Image Description" width="200px" height="200px">
                      <h4 class="h5">Adesh Kumar</h4>
                      <span class="d-block text-primary">Product Manager/Frontend Developer</span>
                      <hr>
                      <a class="text-secondary font-size-14" href="#">akumar25@ucsc.edu</a>
                    </div>
                    <!-- End Team -->
                  </div>
              
                  <div class="col-lg-3 col-md-4 col-sm-6 mt-3 d-flex">
                    <!-- Team -->
                    <div class="text-center">
                      <img class="u-lg-avatar shadow-lg rounded-circle mx-auto mb-4" :src="anish" alt="Image Description" width="200px" height="200px">
                      <h4 class="h5">Anish Parasrampuria</h4>
                      <span class="d-block text-primary">Developer</span>
                      <hr>
                      <a class="text-secondary font-size-14" href="#">aparasra@ucsc.edu</a>
                    </div>
                    <!-- End Team -->
                  </div>
                </div>
              </div>
              <!-- End Team Section -->

<br>

        </div>
</template>

<script>
    import rafi from '@/assets/rafi.jpg'
    import shafi from '@/assets/shafi.jpg'
    import arthur from '@/assets/arthur.jpg'
    import adesh from '@/assets/adesh.png'
    import anish from '@/assets/anish.jpg'
    // import image from '@/assets/home.jpg'

export default {
        name: 'about',
        data() {
                return {
                        title: 'about',
                        rafi: rafi,
                        shafi: shafi,
                        arthur: arthur,
                        adesh: adesh,
                        anish: anish

                }
        }
        
}
</script>

<style scoped>
</style>
