<template>
  <v-card width="640" class="book-edit-form">
    <v-btn icon dark class="close-button" @click="$emit('close')">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-title>
      {{ book ? "Edit Book" : "Create Book" }}
    </v-card-title>
    <div class="px-3 mt-4">
      <v-form @submit.prevent="submit">
        <v-text-field
          class="mb-4"
          v-model="title.value.value"
          :error-messages="title.errorMessage.value"
          label="Title"
          test-id="title-input"
        ></v-text-field>
        <v-select
          label="Status"
          :items="['draft', 'published', 'pending']"
          v-model="status.value.value"
          :error-messages="status.errorMessage.value"
        ></v-select>
        <div class="d-flex justify-end">
          <v-btn type="submit" color="primary" class="mt-2"> Save </v-btn>
        </div>
      </v-form>
    </div>
  </v-card>
</template>
<script setup>
import { useField, useForm } from "vee-validate";
import { onMounted, defineProps, defineEmits } from "vue";
// Define props and emits
const props = defineProps(["book"]);
const emit = defineEmits(["update", "create", "close"]);
// Initialize form validation
const { handleSubmit } = useForm({
  validationSchema: {
    title(value) {
      if (value) return true;
      return "Title is required.";
    },
    status(value) {
      if (value) return true;
      return "Status is required.";
    },
  },
});
// Initialize form fields
const title = useField("title");
const status = useField("status");
// Populate form fields with book data on mounted
onMounted(() => {
  if (props.book) {
    title.value.value = props.book.title;
    status.value.value = props.book.status;
  }
});
// Handle form submission
const submit = handleSubmit((values) => {
  if (props.book) {
    emit("update", { ...props.book, ...values });
  } else {
    emit("create", values);
  }
  emit("close");
});
</script>
<style scoped>
.book-edit-form {
  padding: 32px 24px;
  .close-button {
    position: absolute;
    right: 32px;
    top: 32px;
    width: 40px;
    height: 40px;
  }
}
</style>
