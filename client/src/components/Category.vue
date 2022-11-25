<template>
  <div class="flex-row col-3">
    <div
      class="rounded category"
      :style="{'background-color': tipe, 'border-bottom': borderBottom }"
    >
      <div class="rounded content-box text-dark d-flex flex-column contain mt-3">
        <div class="title">
          <h5 class="text-center mt-2">{{category}}</h5>
        </div>
        <div class="contain">
          <draggable :list="filterByCategory" :move="dragMe" group="task" :category="category" @end="dragUpdate">
            <Card v-for="task in filterByCategory" :key="task.id" :task="task" :id="task.id"></Card>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import draggable from "vuedraggable";
import axios from "axios";
// const url = 'http://localhost:4000'
const url = 'https://kanbanoogle.herokuapp.com'
export default {
  name: "Category",
  props: ["category", "tasks"],
  components: {
    Card,
    draggable
  },
  data() {
    return {
      selectedTask: null,
      selectedId: null,
      selectedCategory: null,
      selectedEmail: null
    };
  },
  computed: {
    tipe() {
      if (this.category == "Backlog") {
        return "crimson";
      } else if (this.category == "Todo") {
        return "rgb(206, 206, 7)";
      } else if (this.category == "Doing") {
        return "#3ab12f";
      } else if (this.category == "Completed") {
        return "royalblue";
      }
    },
    borderBottom() {
      if (this.category == "Backlog") {
        return "6px solid rgb(163, 18, 47)";
      } else if (this.category == "Todo") {
        return "6px solid #bebe08";
      } else if (this.category == "Doing") {
        return "6px solid #2e8d26";
      } else if (this.category == "Completed") {
        return "6px solid #3e4baf";
      }
    },
    filterByCategory() {
      let result = [];
      this.tasks.forEach(task => {
        if (task.category == this.category) result.push(task);
      });
      return result;
    }
  },
  methods: {
    dragMe(e) {
      this.selectedTask = e.draggedContext.element;
      this.selectedId = e.draggedContext.element.id;
      this.selectedCategory = e.relatedContext.component.$attrs.category;
      this.selectedEmail = e.draggedContext.element.User.email;
    },
    dragUpdate() {
      if (localStorage.email !== this.selectedEmail) {
        Swal.fire("Wait!", "This is not your task!", "warning");
      } else {
        axios({
          url: `${url}/tasks/${this.selectedId}`,
          method: "PUT",
          data: {
            category: this.selectedCategory
          },
          headers: { access_token: localStorage.access_token }
        })
        .then(response => {
          this.$parent.getKanban();
        }).catch(err => {
          Swal.fire("Wait!", "This is not your task!", "warning");
        });
      }
    }
  }
};
</script>

<style>
</style>
