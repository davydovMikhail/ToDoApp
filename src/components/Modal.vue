<template>
        <div class="modal">
            <slot name="header">
                <!-- default header -->
            </slot>
            <span class="modal__delete" @click="$emit('close')">&times;</span>
            <hr class="modal__hr">
            <slot name="body">
                <!-- default body -->
            </slot>
            <div class="modal__buttons">
                <slot name="footer">
                    <!-- default footer -->
                </slot>               
            </div>
        </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'modal',
  props: {},
  data() {
    return {}
  },
  computed: 
    mapGetters([
      'isModalOpen'
    ]),
  methods: {
    ...mapActions(['openModal', 'closeModal']),
  }
}
</script>

<style>

</style>