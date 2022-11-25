<template>
  <div style="width: 300px" >
    <form v-on:submit.prevent="addData">
      <div class="row">
        <div class="form-group" id="add" style="align-items: center;">
          <!-- <label for="exampleInputEmail1">Title</label> -->
          <input
            type="text"
            v-model="addTitle"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter title here"
          />
        </div>
        <div>
          <button type="submit" class="btn btn-success ml-2 pressDownAdd" style="align-items: center;">Submit</button>
        </div>
      </div>
     
    </form>
  </div>
</template>


<script>
import axios from "axios";
// const url = 'http://localhost:4000'
const url = 'https://kanbanoogle.herokuapp.com'
export default {
  data() {
    return {
      addTitle: ""
    };
  },
  methods: {
    addData() {
        if (this.addTitle){
            axios({
                method:'POST',
                url:`${url}/tasks`,
                data:{
                    title: this.addTitle
                },
                headers:{access_token:localStorage.getItem("access_token")}
            }).then(response=>{
              this.$emit("emitAddCardKanban")
              this.$emit("emitCloseForm")
          }).catch(err=>{
            console.log(err, 'Failed Post Add')
          })
        } else {
            console.log('Unable add Data.')
        }
    }
  }
};
</script>