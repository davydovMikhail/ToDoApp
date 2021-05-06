<template>
  <div>
    <button @click="toggleFilterSelect" @blur="selectOption(currentOption)" type="button" class="list__select">
        <span>
            {{ currentOption ? currentOption : initOption.value }}
        </span>
    </button>
    <div v-show="isFilterSelectOpen">
        <ul>
            <li 
            class="list__select_in"
            v-for="option in filterOptions"
            :key="option.name"
            @mousedown="selectOption(option)">
                {{option.value}}
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'filterSelect',
  props: {
    filterOptions: Array,
    initOption: Object
  },
  data() {
    return {
      isFilterSelectOpen: false,
      currentOption: ''
    }
  },


  methods: {
    ...mapActions(['filterTodos']),

    toggleFilterSelect() {
      this.isFilterSelectOpen = !this.isFilterSelectOpen
    },

    selectOption(option) {
      if (this.currentOption !== option) {
        this.currentOption = option.value
        this.filterTodos(option.name)
      }
      
      this.isFilterSelectOpen = false
    },
  }
}
</script>

<style>

</style>