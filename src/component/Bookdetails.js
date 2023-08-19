import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import "./bookdetail.css";
const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Media = styled(CardMedia)(({ theme }) => ({
  height: 400,
  width: 350,
}));

const BookDetailsPage = ({ books, handleAddToCartrent }) => {
  const { bookId } = useParams();

  const book = books.find((book) => book._id === bookId);

  if (!bookId) {
    return <div>Book ID not provided.</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book details
      </Typography>
      <Container className="bookdetails-card-componenet">
        <Card className="bookdetails-card-full-container">
          <div className="bookdetails-card-componenet">
            <div>
              <Media image={book.imagelink} title={book.title} />
            </div>
            <div>
              <CardContent className="cardcontent-book-details">
                <Typography variant="h5" gutterBottom>
                  Title: {book.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Author: {book.author}
                </Typography>
                <Typography
                  variant="subtitle1"
                  paragraph
                  sx={{ textAlign: "justify" }}
                  className="bookdetails-para"
                >
                  {book.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textAlign: "right" }}
                >
                  Price: {book.price}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textAlign: "left" }}
                >
                  {book.Rating.$numberDecimal}
                </Typography>
                <div className="btn-shop-book-book-details">
                  <Button
                    variant="contained"
                    color="error"
                    className="Btn-Buy-shop-book-details"
                    onClick={() => handleAddToCartrent(book)}
                  >
                    Buy
                  </Button>

                  <Button
                    className="Btn-Buy-rent-book-details"
                    variant="contained"
                    color="info"
                    onClick={() => handleAddToCartrent(book, true)}
                  >
                    Rent
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default BookDetailsPage;
