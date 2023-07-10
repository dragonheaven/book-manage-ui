import { IBook } from "@/interfaces/books";
import { Commit } from "vuex";
// Define the interface for the book state
export interface IBookState {
  books: IBook[];
  maxId: number;
}
// Define the initial state
const initialState = (): IBookState => ({
  books: [],
  maxId: 1,
});
// Export the default object
export default {
  namespaced: true,
  state: initialState(),
  getters: {
    // Get all books from the state
    getAllBooks: (state: IBookState) => state.books,
  },
  actions: {
    // Create a book
    createBook: ({ commit }: { commit: Commit }, payload: IBook) => {
      commit("CREATE_BOOK", payload);
      return payload;
    },
    updateBook: ({ commit }: { commit: Commit }, payload: IBook) => {
      commit("UPDATE_BOOK", payload);
      return payload;
    },
    removeBook: ({ commit }: { commit: Commit }, payload: IBook) => {
      commit("REMOVE_BOOK", payload);
      return payload;
    },
  },
  mutations: {
    // Create a book mutation
    CREATE_BOOK: (state: IBookState, book: IBook) => {
      state.books = [...state.books, { ...book, id: state.maxId }];
      state.maxId = state.maxId + 1;
    },
    // Update a book mutation
    UPDATE_BOOK: (state: IBookState, book: IBook) => {
      state.books = state.books.map((item) =>
        item.id === book.id ? book : item
      );
    },
    // Remove a book mutation
    REMOVE_BOOK: (state: IBookState, book: IBook) => {
      state.books = state.books.filter((item) => item.id !== book.id);
    },
  },
};
