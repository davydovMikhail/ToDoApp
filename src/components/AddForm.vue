<template>
        <form
        :class="propsClasses"
        >
            <hr>
            <input 
            type="text" 
            v-model="name"
            :placeholder="placeholderText"
            >
            <button
            class="add"
            type="submit"
            @click.prevent="submitForm"
            >
            Добавить список
            </button>
            <slot></slot>
        </form>
</template>

<script>
export default {
  name: 'addForm',
  props: {
    propsClasses: String,
    placeholderText: String,
    value: String
  },
  data() {
    return {
      name: ''
    }
  },

  methods: {
    submitForm() {
      this.name ? 
        this.$emit('addNewItem', this.name) : 
        this.$vToastify.error('', `Введите ${this.placeholderText.toLowerCase()}`)

      this.name = ''
    }
  }
}
</script>

<style>

</style>