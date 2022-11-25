<template>
  <div >
        <div class="headerAdd">
            <button @click.prevent="showAdd()" class="btn btn-primary btn-block add-trigger">{{buttonName}}</button>
            <AddKanban v-if="showFormAdd" @emitAddCardKanban="addCardKanban" @emitCloseForm="closeAdd"></AddKanban>
        </div>

        <div class="d-flex" id="main">
            <Category v-for="(category, idx) in categories" :key="idx" :category="category" :tasks="tasks"></Category>
            <UpdateKanban v-if="UpdateKanban" :taskProp="currentEditTask" @emitTaskUpdated="closeEditForm"></UpdateKanban>
        </div>
        
        <div class="tradeM mt-4 mb-3" style="text-align: center;">© Kanbanoogle かんばんグーグル 2020. Hope all rights reserved. Theme By Dhaneswara.</div>
  </div>
</template>

<script>
import axios from "axios";
import Category from "../components/Category";
import UpdateKanban from "./UpdateKanban.vue";
import AddKanban from "./AddKanban.vue";
// import moment from 'moment';
// const url = 'http://localhost:4000'
const url = 'https://kanbanoogle.herokuapp.com'

export default {
  components: {
    Category,
    UpdateKanban,
    AddKanban
  },
  data() {
    return {
      tasks: [],
      categories: ['Backlog', 'Todo', 'Doing', 'Completed'],
      formatDate: '',
      kanban: {},
      showFormAdd: false,
      UpdateKanban: false,
      currentEditTask: {},
      buttonName: "Task+"
    };
  },
  created() {
    this.getKanban();
  },
  watch: {
    kanban() {
      console.log("Kanban changed confirmed.");
    }
  },
  methods: {
    getKanban() {
      axios({
        method: "GET",
        url: `${url}/tasks`,
        // testinggggg
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then((response) => {
          this.tasks = response.data
        })
        .catch(err => {
          console.log('Could Not Get Kanban Data', err);
        });
    },
    closeEditForm() {
      this.UpdateKanban = false;
      this.getKanban();
    },
    showAdd() {
      if (this.showFormAdd) {
        this.showFormAdd = false;
        this.buttonName = "Task+";
      } else {
        this.showFormAdd = true;
        this.buttonName = "Hide me!";
      }
    },
    closeAdd() {
      this.showFormAdd = false;
      this.buttonName = "Task+";
    },
    addCardKanban() {
      this.getKanban();
    },
  }
};
</script>

<style >
.headerAdd{
    height : auto;
    width : 100%;
    display : flex;
    flex-direction : column;
    align-items : center;
    padding : 15px;
    background-color: rgba(0, 0, 0, 0);
    color : black;
}

.actionbuttons{
    width : 100%;

    display: flex;
    align-self: flex-end;
    justify-content: space-around;

    padding : 10px;
}
.text-center{
    color : white;
}

.add-trigger{
  z-index: 1000;
  width: 90px;
  height: 90px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  transition: 0.5s;
  border-radius: 50%;
  padding: 0px;
  background-color: rgb(0, 94, 255);
  border: none;
  box-shadow: 1px 1px 8px rgb(45, 68, 183);
}
.add-trigger:hover {
  transform: scale(1.4);
  cursor: pointer;
}
</style>