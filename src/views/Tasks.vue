<template>
        <div class="affairs">
                <div class="affairs__body">
                    <div class="affairs__items">
                        <div class="affairs__topic">Мои дела ( {{doneTasksLength}} / {{allCurrentTasksLength}} )</div>
                        <div 
                            v-if="allCurrentTodoTasks && allCurrentTodoTasks.length === 0"
                            class="affairs__nothing"
                        >
                            Здесь пока ничего нет</div>
                        <ul v-else>
                            <li
                            v-for="(task, idx) in allCurrentTodoTasks"
                            :key="task.id"
                            >
                                <TaskItem :task="task" :index="idx + 1" @deleteTaskItem="onDeleteTask" @toggleTaskItem="toggleTaskItem" />
                            </li>
                        </ul>
                        
                    </div>
                    <div class="affairs__addition">
                        <AddForm
                            placeholderText="Краткое описание задачи"
                            @addNewItem="addTaskItem"
                        >
                            <input 
                            @click="isUrgent = !isUrgent"
                            type="checkbox"
                            name="toggle"
                            v-model="isUrgent"
                            value=""
                            id="Urgent"
                            >
                                Срочное
                        </AddForm>
                    </div>
                </div>
        </div>
    <!-- </div> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskItem from '../components/TaskItem'
import AddForm from '../components/AddForm'


export default {
  name: "Tasks",
  components: {
    TaskItem,
    AddForm,
    // Loader,
  },

  computed: {
    ...mapGetters([
      'allCurrentTodoTasks',
      'allCurrentTasksLength',
      'doneTasks',
      'doneTasksLength',
      'currentTodo',
      'checkIfTasksCompleted'
    ]),
  },

  data() {
    return {
      isUrgent: false,
      // loading: false
    }
  },

  // beforeRouteEnter (to, from, next) {
  //   next(async vm => {
  //     await vm.fetchCurrentTodo(Number(to.params.id))
  //     await vm.fetchTasks(Number(to.params.id))
  //     vm.loading = false
  //   })
  // },

  // beforeRouteUpdate (to, from, next) {
  //   this.fetchCurrentTodo(Number(to.params.id))
  //   this.fetchTasks(Number(to.params.id))
  //   next()
  //   this.loading = false
  // },

  async created() {
    // this.loading = true
    await this.fetchCurrentTodo(Number(this.$route.params.id))
    await this.fetchTasks(Number(this.$route.params.id))
    // this.loading = false
  },
  
  methods: {
    ...mapActions(['fetchTasks', 'fetchCurrentTodo', 'addTask', 'deleteTask', 'toggleTaskCompletion', 'todoListCompleted', 
    'addTaskToList', 'deleteTaskFromList'
    ]),

    addTaskItem(name) {
      if (name) {
        let newTaskObj = {
          id: Date.now(),
          list_id: Number(this.currentTodo.id),
          name: name.trim(),
          is_completed: false,
          urgency: this.isUrgent,
          created_at: Date.now()
        }

        let modalObject = {
          header: 'Дело добавлено',
          body: `Дело '${name}' добавлено в '${this.currentTodo.name}'`,
          footerButtons: [
            {
              title: 'OK',
              type: 'OK',
              method: async () => {
                await this.addTask(newTaskObj)
                await this.addTaskToList({
                  todo: this.currentTodo,
                  countTasks: this.currentTodo.count_tasks + 1, 
                  completedSetTo: this.checkIfTasksCompleted
                })
              }
            }
          ]
        }

        this.$emit('populateModal', modalObject)
      }
    },

    onDeleteTask(taskItem) {
      let modalObject = {
        header: 'Удалить дело',
        body: `Удалить дело '${taskItem.name}' из списка '${this.currentTodo.name}'?`,
        footerButtons: [
          {
            title: 'Отмена',
            type: 'Cancel'
          },
          {
            title: 'OK',
            type: 'OK',
            method: async () => {
              await this.deleteTask(taskItem.id)
              await this.deleteTaskFromList({
                todo: this.currentTodo,
                countTasks: this.currentTodo.count_tasks - 1,
                completedSetTo: this.checkIfTasksCompleted
              })
            }
          }
        ]
      }

      this.$emit('populateModal', modalObject)
    },

    toggleTaskItem(task) {
      this.toggleTaskCompletion(task)
      this.todoListCompleted({todo: this.currentTodo, setTo: this.checkIfTasksCompleted})
    },
  }
}
</script>

<style>

</style>