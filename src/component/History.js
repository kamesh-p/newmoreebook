import React, { useState, useEffect } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";

const History = () => {
  const [books, setBooks] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const isLoading = books.length === 0;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/library/");

      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          No History Found
        </Typography>

        <Typography>Please log in to view your history.</Typography>
      </Container>
    );
  }

  // Filter books based on user's name

  const filteredBooks = books.filter(
    (book) => book.users.Users.name === user.Users.name
  );
  console.log("filtered", filteredBooks);
  return (
    <Container className="history-container">
      <Typography variant="h4" gutterBottom className="history-heading">
        Order History
      </Typography>
      {isLoading ? (
        <div className="spinner-container">
          <CircularProgress />
        </div>
      ) : filteredBooks.length === 0 ? (
        <Typography variant="body1" className="no-history-message">
          You have no order history.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} className="history-item">
                <Typography variant="h6" style={{ marginBottom: "8px" }}>
                  {book.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: {book.price} Rs.
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  End Date: {book.endDate}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Start Date: {book.startDate}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Days: {book.days}
                </Typography>
                <Typography variant="body2" className="order-id">
                  Order ID: {book.orderId}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default History;
