import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { booksReducer } from "./authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
});

export default store;
