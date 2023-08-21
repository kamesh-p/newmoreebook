import React, { useState } from "react";

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

import StarIcon from "@mui/icons-material/Star";

import StarHalfIcon from "@mui/icons-material/StarHalf";

import "./bookdetail.css";

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),

  margin: theme.spacing(4),

  display: "flex",

  flexDirection: "column",

  alignItems: "center",
}));

const Media = styled(CardMedia)(({ theme }) => ({
  height: 400,

  width: 350,

  position: "relative",

  transition: "transform 0.2s ease-in-out",

  "&:hover": {
    transform: "scale(0.9)",
  },
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

  // Calculate star width based on rating

  const starRating = parseFloat(book.Rating.$numberDecimal) || 0;

  const fullStars = Math.floor(starRating);

  const remainingStars = starRating - fullStars;

  const hasHalfStar = remainingStars >= 0.25 && remainingStars < 0.75;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book details
      </Typography>

      <Container className="bookdetails-card-componenet">
        <Card className="bookdetails-card-full-container">
          <div className="bookdetails-card-componenet">
            <div className="bimg">
              <Media image={book.imagelink} title={book.title} />
            </div>

            <div className="cardcontent-main-div">
              <CardContent className="cardcontent-book-details">
                <Typography className="booktit" variant="h5" gutterBottom>
                  {book.title}
                </Typography>

                <Typography
                  className="autitle"
                  variant="subtitle1"
                  gutterBottom
                >
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

                <div className="rating">
                  {starRating.toFixed(1)}:
                  {Array.from({ length: fullStars }, (_, index) => (
                    <StarIcon key={index} className="staric" />
                  ))}
                  {hasHalfStar && <StarHalfIcon className="staric" />}
                </div>

                <div className="price">
                  <Typography variant="h6" color="primary">
                    Rs: {book.price}
                  </Typography>
                </div>

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
