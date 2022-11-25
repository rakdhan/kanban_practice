<template>
  <div> 

   <div class="mb-0">
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-light rounded-t rounded-b p-3 m-3 flex flex-col justify-between leading-normal">
          <div>
            <p class="text-sm text-gray-600 flex items-center">
              <img v-if="authorized" class="mr-1" src="../assets/lock2.svg" style="height:14px">
              <svg v-if="unauthorized" class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/>
              </svg> Task #{{task.id}}
              <button style="margin-right: 0;" class=" btn btn-outline-light btn-sm">Drag Me Up!</button>
            </p>
            <div class="text-gray-900 font-bold text-lg mb-2">{{task.title}}</div>
            <p class="text-gray-700 text-sm">{{ubah}}</p>
          </div>
          <div class="actionbuttons">
            <button @click.prevent="backKanban(task)" v-if="leftCorner" class="fa fa-caret-left btn btn-light"></button>
            <button @click.prevent="deleteKanban(task)" class="fa fa-trash btn btn-light"></button>
            <button @click.prevent="updateKanban(task)" class="fa fa-pencil btn btn-light" data-toggle="modal" data-target="#exampleModal"></button>
            <button @click.prevent="nextKanban(task)" v-if="rightCorner" class="fa fa-caret-right btn btn-light"></button>
          </div>
          <div class="flex items-center">
            <img class="w-10 h-10 rounded-full mr-2 mb-2" :src="foto"/>
            <div class="text-sm mb-2">
              <small class="text-gray-900 leading-none flex">{{task.User.email}}</small>
              <small class="text-gray-600">{{task.User.organization}}</small>
            </div>
          </div>
        </div>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import moment from 'moment';
// const url = 'http://localhost:4000'
const url = 'https://kanbanoogle.herokuapp.com'
export default {
  name: "Card",
  props: ["task"],
  data() {
      return{
          ubah: '',
          leftCorner: this.task.category == 'Backlog' ? false : true,
          rightCorner: this.task.category == 'Completed' ? false : true,
          authorized: localStorage.email !== this.task.User.email ? false : true,
          unauthorized: localStorage.email == this.task.User.email ? false : true,
          foto: (!localStorage.pict || localStorage.email !== this.task.User.email) ? 'https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png' : localStorage.pict
          // foto:'https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png'
      }
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
        this.ubah = moment(this.task.createdAt).format("MMM Do YYYY")
    },
    updateKanban(task) {
        this.$parent.$parent.$parent.UpdateKanban = true;
        this.$parent.$parent.$parent.currentEditTask = { ...task };
    },
    deleteKanban(task) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.value) {
              axios({
                method: "DELETE",
                    url: `${url}/tasks/${task.id}`,
                    headers: { access_token: localStorage.getItem("access_token") }
                })
                .then(data => {
                    this.$parent.$parent.$parent.getKanban();
                    Swal.fire('Deleted!', 'Your todo has been deleted.', 'success')
                })
                .catch(err => {
                  Swal.fire('Wait!', 'You are not authorized.', 'error')
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) { }
        }).catch( ()=> {console.log('Swal Failed.')})
    },
    nextKanban(task) {
        if (localStorage.email !== task.User.email) {
            Swal.fire("Wait!", "This is not your task!", 'warning');
        } else {
            if (task.category === "Backlog") {
            task.category = "Todo";
            } else if (task.category === "Todo") {
            task.category = "Doing";
            } else if (task.category === "Doing") {
            task.category = "Completed";
            }
            axios({
                url: `${url}/tasks/${task.id}`,
              method: "PUT",
              data: task,
              headers: { access_token: localStorage.getItem("access_token") }
            })
              .then(response => {
                this.$parent.$parent.$parent.getKanban();
              })
              .catch(err => {
                Swal.fire("Wait!", "This is not your task!", "warning");
              });
        }
    },
    backKanban(task) {
        if (localStorage.email !== task.User.email) {
            Swal.fire("Wait!", "This is not your task!", 'warning');
        } else {
            if (task.category === "Completed") {
              task.category = "Doing";
            } else if (task.category === "Doing") {
              task.category = "Todo";
            } else if (task.category === "Todo") {
              task.category = "Backlog";
            }
            axios({
              method: "PUT",
              url: `${url}/tasks/${task.id}`,
              data: task,
              headers: { access_token: localStorage.getItem("access_token") }
            })
              .then(response => {
                this.$parent.$parent.$parent.getKanban();
              })
              .catch(err => {
                Swal.fire('Wait!', 'This is not your task!', 'warning');
              });
        }
    }
  }
};
</script>

<style>
.actionbuttons {
  width: 100%;
  margin-top: 0;
  display: flex;
  justify-content: space-around;
}
</style>