import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

// Books Reducer
const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
const CANCEL_RENTAL_SUCCESS = "CANCEL_RENTAL_SUCCESS";

const initialState = {
  books: [],
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.payload };
    case CANCEL_RENTAL_SUCCESS:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
      };
    default:
      return state;
  }
};

export const fetchBooks = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/selling/");
    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

export const cancelRental = (bookId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/library/${bookId}`);
    dispatch({ type: CANCEL_RENTAL_SUCCESS, payload: bookId });
  } catch (error) {
    console.error("Error canceling rental:", error);
  }
};
