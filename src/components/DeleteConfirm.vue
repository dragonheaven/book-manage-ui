<template>
  <v-card width="640" class="book-edit-form">
    <!-- Close button -->
    <v-btn icon dark class="close-button" @click="$emit('close')">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <!-- Card title -->
    <v-card-title class="text-center font-weight-bold"
      >Delete Book</v-card-title
    >
    <!-- Confirmation message -->
    <p class="text-center mb-4">Are you sure you want to delete this book?</p>
    <!-- Action buttons -->
    <div class="d-flex justify-center">
      <v-btn
        class="me-4"
        color="error"
        variant="outlined"
        @click="$emit('close')"
        >Cancel</v-btn
      >
      <v-btn color="primary" @click="$emit('delete')">Confirm</v-btn>
    </div>
  </v-card>
</template>
<style scoped>
.book-edit-form {
  padding: 32px 24px;
}
.close-button {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 40px;
  height: 40px;
}
</style>
