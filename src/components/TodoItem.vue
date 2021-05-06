<template>
  <div class="list__item">
  <router-link
    :to="{ name: 'tasks', params: { id: item.id }}"                
  >
    <p class="list__item_text" :class="[ item.count_tasks === 0 ? 'absence' : item.is_completed ? 'done' : 'half-done']">
    {{item.name}}
    </p>
  </router-link>
  <DeleteBtn @handleDeleteBtnClick="deleteTodo(item)" />
  </div>
</template>

<script>
import DeleteBtn from '../components/DeleteBtn'

export default {
  name: "todoitem",
  props: {
    item: Object,
  },
  components: {
    DeleteBtn
  },
  methods: {
    deleteTodo(todoItem) {
      this.$emit('deleteTodoItem', todoItem)
    }
  }
}
</script>

<style scoped>
.router-link-exact-active.router-link-active {
  border-left: 45px solid #2ee59d;
}
</style>