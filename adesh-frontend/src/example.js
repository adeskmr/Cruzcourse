
var bodyFormData = new FormData();
bodyFormData.set('url', 'Fred');
axios({
   method: 'post',
   url: 'http://localhost:8080/processtranscript',
   data: bodyFormData,
   config: { headers: {'Content-Type': 'multipart/form-data' }}
   })
   .then(function (response) {
       //handle success
       console.log(response);
   })
   .catch(function (response) {
       //handle error
       console.log(response);
   });






   return axios({
    method: 'post', //http://localhost:8080
    url: 'https://faceclass-221a7.appspot.com/processtranscript', //https://faceclass-221a7.appspot.com/processtranscript
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    


            //   async getMyData() { //https://faceclass-221a7.appspot.com    http://localhost:8080
        //     this.$store.state.loading = true
        //     const response = await axios.post("https://faceclass-221a7.appspot.com/getmydata?id='"+this.$store.state.goog_id+"'");
        //     this.myDataArr = response.data
        //     // console.log(this.myDataArr)
        //     this.$store.state.loading = false
        //  },