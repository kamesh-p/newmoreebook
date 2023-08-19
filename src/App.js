import "./App.css";
import React, { useState, useEffect } from "react";
// import Example from "./Example";
import Cart from "./component/Cart";
import About from "./component/About";
import "bootstrap/dist/css/bootstrap.css";
import BookDetailsPage from "./component/Bookdetails";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./component/Shop";
import Sell from "./component/Sell";
import Library from "./component/Library";
import Login from "./component/Login";
import SignupPage from "./component/Signup";

import DialogBox from "./component/Genre";
import AdminDashboard from "./component/AdminDash";
import SellDetails from "./component/SellDetails";
import History from "./component/History";
import Profile from "./component/Tabs";
import Footer from "./component/Footer";
import Sidebar from "./component/Cartslide";
function App() {
  let name = "Kamesh";
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState(cartItems);
  const [books, setBooks] = useState([]);
  const [booksState, setBooksState] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
  const handleAddToCartandRent = (book, isRented = false) => {
    setBooksState((prevBooks) =>
      prevBooks.map((prevBook) =>
        prevBook.id === book.id
          ? { ...prevBook, addedToCart: true, rented: isRented }
          : prevBook
      )
    );

    if (isRented) {
      setRentedBooks((prevRentedBooks) => [...prevRentedBooks, book]);
    } else {
      addToCart(book);
    }
  };

  useEffect(() => {
    // Fetch books data from the backend API

    fetch("http://localhost:4000/books")
      .then((response) => response.json())

      .then((data) => setBooks(data))

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addToCart = (book) => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...book, quantity: 1 },
    ]);
  };
  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };
  const handleDeleteBook = (bookId) => {
    // Create a confirmation dialog before deleting the book
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (isConfirmed) {
      // Remove the book from the rentedBooks array
      setRentedBooks((prevRentedBooks) =>
        prevRentedBooks.filter((book) => book._id !== bookId)
      );
    }
  };

  let length = cartItems.length;
  let rentcount = rentedBooks.length;
  return (
    <Router>
      <div className="App">
        <Header length={length} count={rentcount} />

        <Routes>
          <Route
            path="/about"
            element={
              <About
                name={name}
                addToCart={addToCart}
                cartItems={cartItems}
                books={books}
                handleAddToCartrent={handleAddToCartandRent}
              />
            }
          />

          <Route
            path="/Library"
            element={
              <Library
                rentedBooks={rentedBooks}
                onDeleteBook={handleDeleteBook}
              />
            }
          />
          <Route
            path="/Buy"
            element={
              <Shop
                books={books}
                addToCart={addToCart}
                handleAddToCartrent={handleAddToCartandRent}
                rentedBooks={rentedBooks}
              />
            }
          />
          {/* <Route
            path="/Cart"
            element={
              // <Cart cartItems={cartItems} handleRemoveItem={handleRemoveItem} />
              <Cart />
            }
          /> */}

          <Route path="/Sell" element={<Sell books={books} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Genre" element={<DialogBox />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/book/:bookId"
            element={
              <BookDetailsPage
                books={books}
                handleAddToCartrent={handleAddToCartandRent}
              />
            }
          />
          <Route path="/sell-admin" element={<SellDetails />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/Cart"
            element={
              <Profile
                cartItems={cartItems}
                handleRemoveItem={handleRemoveItem}
                rentedBooks={rentedBooks}
                onDeleteBook={handleDeleteBook}
              />
            }
          />
          {/* <Route path="/Cartslide" element={<Sidebar />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
