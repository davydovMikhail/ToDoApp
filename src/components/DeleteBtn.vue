<template>
    <span
      class="delete"
      @click="$emit('handleDeleteBtnClick')"
      :class="propsClasses"
    >
      &times;
    </span>
</template>

<script>
export default {
  name: "deleteBtn",
  props: {
    propsClasses: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>

</style>
