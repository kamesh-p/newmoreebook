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
    <Container>
      <Typography variant="h4" gutterBottom>
        History
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : filteredBooks.length === 0 ? (
        <Typography>No history available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredBooks.map((book, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h6">{book.title}</Typography>

                <Typography variant="body1">Price: {book.price} Rs.</Typography>

                <Typography variant="body1">
                  End Date: {book.endDate}
                </Typography>

                <Typography variant="body1">
                  Start Date: {book.startDate}
                </Typography>

                <Typography variant="body1">Days: {book.days}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default History;
