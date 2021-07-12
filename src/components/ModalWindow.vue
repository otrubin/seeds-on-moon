<template>
  <div class="modal-wrap" @click="onModalClick" :style="modalWrapStyle">
    <div class="modal-window">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * Компонент ModalWindow отвечает за показ модального окна
 * содержимое окна вставляется через слот по умолчанию
 */

export default {
  name: "ModalWindow",
  data() {
    return {
      isVisible: false,
    }
  },
  computed: {
    modalWrapStyle() {
      return this.isVisible ? { display: "flex" } : "";
    },
  },
  methods: {
    onModalClick(event) {
      if(event.target === event.currentTarget) {
        this.hide();
      }
    },
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.modal-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  width: 100%;
  height: 100%;
  overflow: auto;
  outline: 0;
  transition: display 0.5s linear;
  background-color: rgba(0, 0, 0, 0.4);
  display: none;
  justify-content: center;
  align-items: center;
}
.modal-window {
  position: relative;
  width: 100%;
  max-width: 600px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 2000;
}
</style>
