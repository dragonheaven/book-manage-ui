<template>
  <v-container>
    <div class="books-table">
      <!-- Header section with title and create button -->
      <div class="header">
        <h3>Manage Books</h3>
        <v-btn color="primary" @click="openCreateDialog()"> Create </v-btn>
      </div>
      <!-- Table to display books -->
      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th class="text-left w-50">Title</th>
            <th class="text-left">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through books and display each book in a row -->
          <tr v-for="book in books" :key="book.id">
            <td class="text-left">{{ book.id }}</td>
            <td class="w-50 text-left">{{ book.title }}</td>
            <td class="text-left">
              <v-chip label :color="getColor(book.status)">
                {{ book.status }}
              </v-chip>
            </td>
            <td class="text-left">
              <div class="d-flex">
                <!-- Edit and Delete buttons for each book -->
                <v-btn
                  color="primary"
                  variant="text"
                  @click="openEditDialog(book)"
                  >Edit</v-btn
                >
                <div class="divider" />
                <v-btn
                  variant="text"
                  color="primary"
                  @click="openDeleteDialog(book)"
                  >Delete</v-btn
                >
              </div>
            </td>
          </tr>
          <tr v-if="!books.length">
            <td colspan="4" class="text-center py-10">No Books</td>
          </tr>
        </tbody>
      </v-table>
      <!-- Edit dialog -->
      <v-dialog v-model="isOpen" width="auto">
        <edit-dialog-form
          @close="isOpen = false"
          @create="onCreate($event)"
          @update="onUpdate($event)"
          :book="selectedBook"
        ></edit-dialog-form>
      </v-dialog>
      <!-- Delete confirmation dialog -->
      <v-dialog v-model="deleteOpen" width="auto">
        <delete-confirm
          @delete="onDelete()"
          @close="deleteOpen = false"
        ></delete-confirm>
      </v-dialog>
    </div>
    <!-- Snackbar for success messages -->
    <v-snackbar
      :timeout="2000"
      color="success"
      variant="outlined"
      v-model="showSnackBar"
      class="snackbar"
      location="top right"
    >
      {{ alertMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditDialogForm from "@/components/EditDialogForm.vue";
import { BookStatus } from "@/interfaces/books";
import DeleteConfirm from "@/components/DeleteConfirm.vue";

export default {
  name: "BooksList",
  components: { DeleteConfirm, EditDialogForm },
  data() {
    return {
      isOpen: false, // controls if the edit dialog is open
      selectedBook: undefined, // the currently selected book
      showSnackBar: false, // controls if the snackbar is visible
      alertMessage: "", // the message to show in the snackbar
      deleteOpen: false, // controls if the delete confirmation dialog is open
    };
  },
  computed: {
    ...mapGetters({
      books: "books/getAllBooks", // getter to retrieve all books
    }),
  },
  methods: {
    ...mapActions({
      createBook: "books/createBook", // action to create a book
      updateBook: "books/updateBook", // action to update a book
      removeBook: "books/removeBook", // action to remove a book
    }),
    // methods to handle create, update and delete actions
    onCreate(book) {
      this.createBook(book);
      this.showSnackBar = true;
      this.alertMessage = "Book is created successfully";
    },
    onUpdate(book) {
      this.updateBook(book);
      this.showSnackBar = true;
      this.alertMessage = "Book is updated successfully";
    },
    onDelete() {
      this.removeBook(this.selectedBook);
      this.showSnackBar = true;
      this.alertMessage = "Book is deleted successfully";
      this.selectedBook = undefined;
      this.deleteOpen = false;
    },
    // methods to open the create, edit and delete dialogs
    openCreateDialog() {
      this.isOpen = true;
      this.selectedBook = undefined;
    },
    openEditDialog(book) {
      this.isOpen = true;
      this.selectedBook = book;
    },
    openDeleteDialog(book) {
      this.deleteOpen = true;
      this.selectedBook = book;
    },
    // method to get the color for the status chip
    getColor(status) {
      if (status === BookStatus.pending) {
        return "red";
      }
      if (status === BookStatus.published) {
        return "green";
      }
      return "secondary";
    },
  },
};
</script>
<style lang="scss" scoped>
.books-table {
  border: 1px solid #e5e7eb;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }
  table {
    th {
      background-color: #f8f8f8;
    }
    td,
    th {
      border-bottom: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
    }
    .divider {
      width: 1px;
      border-left: 1px solid #e5e7eb;
      margin: 0 4px;
    }
  }
  .snackbar {
    background-color: white;
  }
}
</style>
