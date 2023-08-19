import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Container, Paper, Grid } from "@mui/material";
import "./Selldetails.css";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../store/authSlice";

const SellDetails = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  console.log("bookk_reeddux", books);
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
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Sell Details
      </Typography>
      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={1} style={{ padding: "10px", margin: "10px 0" }}>
              <div className="selldetails-details">
                <Typography className="selldetails-title" variant="h6">
                  Titles: {book.title}
                </Typography>
                <Typography variant="body1">
                  Description: {book.description}
                </Typography>
                <Typography variant="body1">Price: {book.price}</Typography>
              </div>
              <div className="selldetails-btns">
                <Button color="error">Cancel</Button>
                <Button
                  onClick={() => handleConfirm(book)}
                  variant="contained"
                  size="small"
                  color="success"
                >
                  Confirm
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SellDetails;
