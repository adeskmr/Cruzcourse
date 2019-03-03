<template>
   <div >
      <facebook-login class="button"
      appId="1072038756295047"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
   </div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs'
export default {
   components: {
      facebookLogin
   },
   methods: {
      getUserData(){
         this.FB.api('/me', 'GET', { fields: 'id,name,email'},
            userInformation => {
               console.warn("data api", userInformation)
               this.$store.state.fb_id = userInformation.id;
               this.personalID = userInformation.id
               this.email = userInformation.email
               this.name = userInformation.name
            }
         
         )

      },
      sdkLoaded(payload) {
         this.isConnected = payload.isConnected
         this.FB = payload.FB
         if (this.isConnected) this.getUserData()
      },
      onLogin(){
         this.isConnected = true
         this.getUserData()
      },
      onLogout(){
         this.isConnected = false
      }
      
   }
}

</script>