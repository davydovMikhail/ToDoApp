<template>
  <div class="main">
    <div class="list">
      <div class="list__body">
        <div class="list__items">
          <FilterSelect
            :filterOptions="filterTodoOptions"
            :initOption="filterTodoOptions[0]"
          />
          <hr />
          <div v-if="loading" class="affairs__nothing">
            Подождите, идет загрузка
          </div>
          <div v-else-if="allTodos.length === 0" class="affairs__nothing">
            Здесь пока ничего нет
          </div>
          <div
            v-else
            v-for="item in allFilteredTodos"
            :key="item.id"
            @click="toggleSidebar"
          >
            <TodoItem :item="item" @deleteTodoItem="onDeleteTodo" />
          </div>
        </div>
        <div class="list__addition">
          <AddForm
            placeholderText="Название списка"
            @addNewItem="addTodoList"
          />
        </div>
      </div>
    </div>
    <router-view
      name="tasks"
      :key="$route.fullPath"
      @populateModal="(e) => $emit('populateModal', e)"
    ></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoItem from "../components/TodoItem";
import AddForm from "../components/AddForm";
import FilterSelect from "../components/FilterSelect";

export default {
  name: "Todo",
  components: {
    TodoItem,
    AddForm,
    FilterSelect,
  },
  computed: {
    ...mapGetters(["allTodos", "allFilteredTodos", "todosError"]),
  },

  data() {
    return {
      loading: false,
      isSidebarOpen: true,
      filterValue: "",
      filterTodoOptions: [
        {
          name: "not_completed",
          value: "Неисполненные",
        },
        {
          name: "completed",
          value: "Исполненные",
        },
        {
          name: "all",
          value: "Все",
        },
      ],
    };
  },


  async created() {
    this.loading = true;
    await this.fetchTodos();
    this.loading = false;
  },

  methods: {
    ...mapActions(["addTodo", "fetchTodos", "fetchTasks", "deleteTodo"]),

    addTodoList(name) {
      let newTodoObj = {
        name: name.trim(),
        count_tasks: 0,
        is_completed: false,
        created_at: Date.now(),
      };

      if (name) {
        let modalObject = {
          header: "Список добавлен",
          body: `Список дел '${name}' добавлен`,
          footerButtons: [
            {
              title: "ОК",
              type: "OK",
              method: () => this.addTodo(newTodoObj),
            },
          ],
        };

        this.$emit("populateModal", modalObject);
      }
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },

    onDeleteTodo(todoItem) {
      let modalObject = {
        header: "Удалить список дел",
        body: `Удалить список дел '${todoItem.name}'?`,
        footerButtons: [
          {
            title: "Отмена",
            type: "Cancel",
          },
          {
            title: "Удалить",
            type: "OK",
            method: () => {
              this.deleteTodo(todoItem.id);
              if (this.$route.params.id === todoItem.id) {
                this.$router.push("/");
              }
            },
          },
        ],
      };

      this.$emit("populateModal", modalObject);
    },
  },
};
</script>

<style>

</style>