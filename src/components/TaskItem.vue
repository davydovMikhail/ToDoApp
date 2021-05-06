<template>
        <div class="affairs__item">      
            <input 
            type="checkbox"
            name="Urgent"
            v-model="task.is_completed"
            @change="toggleTaskComplete(task)"    
            >
            <div class="affairs__inner">
                <div class="affairs__inner_indicator"
                :class="{'hidden': !task.urgency}"
                >!</div>
                <p
                :class="[task.is_completed ? 'affairs__inner_line' : 'affairs__inner_text' ]"
                >{{task.name}}</p>
                <div class="affairs__inner_date">
                    <p>{{ getTaskDate }} | {{ getTaskTime }}</p>
                </div>
                <DeleteBtn @handleDeleteBtnClick="deleteTask(task)" />  
            </div>                        
        </div>
</template>

<script>
import DeleteBtn from '../components/DeleteBtn'

export default {
  name: 'taskitem',

  props: {
    task: Object,
    index: Number
  },

  components: {
    DeleteBtn
  },

  computed: {
    getTaskDate() {
      let date = new Date(this.task.created_at)
      return date.toLocaleDateString('ru-RU')
    },

    getTaskTime() {
      let time = new Date(this.task.created_at)
      return time.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
  methods: {
    deleteTask(task) {
      this.$emit('deleteTaskItem', task)
    },

    toggleTaskComplete(task) {
      this.$emit('toggleTaskItem', task)
    }
  }
}
</script>

<style>

</style>