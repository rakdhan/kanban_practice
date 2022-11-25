<template>
  <form action="" >
    <div class="modal fade show in" tabindex="-1" role="dialog" data-show="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content category" style="margin-top:200px;padding:15px;color:white;background-color: #3ab12f;border-bottom: 8px solid #2e8d26;">
            <div class="modal-header">
            <h5 class="modal-title">Edit task!</h5>
            <button type="button" class="close" v-on:click="cancelForm">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>

            <div class="modal-body">
                <div>
                    <form v-on:submit.prevent="updateData">
                    <div class="form-group" id="add">
                        <label for="exampleInputEmail1">Title</label>
                        <input
                        type="text"
                        v-model="taskProp.title"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary pressDown">Submit</button>
                    </form>
                </div>        
            </div>
        
        </div>
        </div>
    </div>
    
    <div class="modal-backdrop show fade in"></div>
    
  </form>
</template>

<script>
import axios from "axios";
// const url = 'http://localhost:4000'
const url = 'https://kanbanoogle.herokuapp.com'
export default {
  props:["taskProp"],
  components:{
  },
  data() {
    return {
      addTitle: ""
    };
  },
  mounted(){
    setTimeout(() => {
      console.log('Mounted setTimeout, 500:', this.taskProp)
    }, 500)
  },
  methods: {
    updateData() {
      axios({
         method:"PUT",
         url:`${url}/tasks/${this.taskProp.id}`,
         headers:{access_token:localStorage.access_token},
         data: this.taskProp
    })
        .then(response => {
          this.$emit("emitTaskUpdated")
        })
        .catch(err => {
            Swal.fire('Hey!', 'Mind your own task!', 'warning');
        });
    },
    cancelForm(){
        this.$emit("emitTaskUpdated")
    }

  }
};
</script>

<style scoped>
  .modal {
    display: block;
  }
</style>