import React, { useEffect } from "react";
import axios from "axios";
import { Typography, Container, Paper, Grid, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../store/authSlice";
import "./Selldetails.css";

const SellDetails = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleConfirm = async (book) => {
    try {
      // Make an API request to post the book to the database
      const response = await axios.post(
        "http://localhost:4000/books/create-user",
        book
      );

      // Handle success, you might want to show a success message or update the state
      console.log("Book confirmed and posted:", response.data);
    } catch (error) {
      // Handle error, show an error message or log the error
      console.error("Error posting book:", error);
    }
  };

  return (
    <div className="selldetails-full-container">
      <Container maxWidth="lg" className="container-selldetails-box">
        <Typography variant="h4" component="h1" className="title">
          Sell Details
        </Typography>
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={0} className="book-card-selldetails">
                <div className="book-details">
                  <Typography className="book-title" variant="h6">
                    {book.title}
                  </Typography>
                  <Typography className="book-description" variant="body1">
                    {book.description}
                  </Typography>
                  <Typography className="book-price" variant="h6">
                    ₹{book.price}
                  </Typography>
                </div>
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="error"
                    // className="button cancel-button"
                    onClick={() => console.log("Cancel")}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    // className="button confirm-button"
                    onClick={() => handleConfirm(book)}
                  >
                    Confirm
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SellDetails;
