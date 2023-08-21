import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import "./BookHistrory.css"; // Import your custom CSS for styling

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const isLoading = history.length === 0;

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const user = useSelector((state) => state.auth.user);
  const filteredBooks = history.filter(
    (book) => book.user.Users.name === user.Users.name
  );

  console.log("filteredBooks", filteredBooks);

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
                <div className="payment-history-item">
                  <div className="item-details">
                    {book.items.map((item, itemIndex) => (
                      <Typography key={itemIndex}>{item.title}</Typography>
                    ))}
                  </div>
                  <div className="total-price">
                    <Typography>Total Price: {book.totalPrice}</Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BookingHistory;
