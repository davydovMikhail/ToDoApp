<template>
  <div id="app">
    <router-view @populateModal="populateModal"></router-view>
    <Modal v-if="isModalOpen" @close="closeModal">
      <p slot="header" class="modal__title">{{ modalContent.header }}</p>
      <p slot="body" class="modal__text">{{ modalContent.body }}</p>

      <button
        slot="footer"
        type="button"
        v-for="button in modalContent.footerButtons"
        :key="button.title"
        @click="handleBtnClick(button.method)"
        :class="[button.type === 'OK' ? 'btn_ok' : 'btn_action']"
        class="modal__buttons_button"
      >
        {{ button.title }}
      </button>

    </Modal>  
  </div>
</template>

<script>
import Modal from './components/Modal'

export default {
  name: 'App',
  components: {
    Modal,
  },
  data() { 
    return {
      isModalOpen: false,
      modalContent: {}
    }
  },

  methods: {
    populateModal(data) {
      this.modalContent = data
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
      this.modalContent = {}
    },

    handleBtnClick(actionFromBtn) {
      actionFromBtn ? actionFromBtn() : ""
      this.closeModal()
    }
  }
}
</script>
<style>
@import url("../style.css");
</style>
