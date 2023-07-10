<template>
  <div class="home">
    <books></books>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Books from "@/components/Books.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Books,
  },
});
</script>

<style>
.home {
  padding-top: 100px;
}
</style>
