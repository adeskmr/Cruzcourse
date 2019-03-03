<template>
   <h1 @click="signin" >Foo</h1>
   </template>


<script>
export default {
         name: 'signin',
         data() {
            return {
                  title: 'signi'
            }
         },
         methods:{
            signin(){
               // console.log("fdfd")
               this.$store.dispatch('signin')

            }
         }
         
}
</script>