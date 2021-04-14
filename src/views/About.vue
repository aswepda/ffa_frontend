<template>
  <div class="about">
    <v-container>
      <h1 class="text-h3 mt-3">Über ASWE<b>PDA</b></h1>
      <p class="subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut alias
        inventore dicta provident quasi accusantium quaerat veniam obcaecati!
        Fugiat id nulla natus distinctio voluptatem repellat pariatur architecto
        non esse explicabo.
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    morningRoutine: false,
  }),
  components: {  },
};
</script>

<style scoped>
.card-actions {
  position: absolute;
  bottom: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>