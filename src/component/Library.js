import React, { useState } from "react";
import "./Library.css";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useSelector } from "react-redux";

const Library = ({ rentedBooks, onDeleteBook }) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [dialogOpen, setDialogOpen] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [confirmedRentals, setConfirmedRentals] = useState([]);
  const [rentdetails, setRentDetails] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const handleOpenDialog = (bookId) => {
    setSelectedBookId(bookId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedBookId(null);
    setDialogOpen(false);
  };
  const handleDateChange = (bookId, dateType, event) => {
    const selectedDate = event.target.value;
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [bookId]: {
        ...prevDates[bookId],
        [dateType]: selectedDate,
      },
    }));
  };

  const calculatePrice = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.round(Math.abs((start - end) / oneDay)) + 1;
    let price = 100 + (days - 30) * 5;
    price = Math.max(100, price);
    return { days, price };
  };

  const getMinStartDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Set to tomorrow
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getMinEndDate = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30); // Start from 30 days after start date
    const year = endDate.getFullYear();
    const month = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const day = endDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleProceed = (bookId) => {
    const book = rentedBooks.find((book) => book._id === bookId);
    const confirmedRental = {
      users: user,
      title: book.title,
      startDate: selectedDates[bookId]?.startDate,
      endDate: selectedDates[bookId]?.endDate,
      days: calculatePrice(
        selectedDates[bookId]?.startDate,
        selectedDates[bookId]?.endDate
      ).days,
      price: calculatePrice(
        selectedDates[bookId]?.startDate,
        selectedDates[bookId]?.endDate
      ).price,
    };
    setConfirmedRentals((prevRentals) => [...prevRentals, confirmedRental]);
    handleCloseDialog();
    setRentDetails(confirmedRental);
    console.log("confirmation", confirmedRental);
    console.log("confirmationtotal", rentdetails);

    axios.post("http://localhost:4000/library/create-user", confirmedRental);
  };
  return (
    <div className="library-container-library">
      <h2>Your Rented Books</h2>
      <ul className="book-list-library">
        {rentedBooks.map((book) => (
          <li key={book._id} className="book-item-library">
            <img
              src={book.imagelink}
              alt={book.title}
              className="book-image-library"
            />
            <div className="book-details-library">
              <h3>{book.title}</h3>
              <p>
                Author: {book.author} | Price: {book.price}
              </p>
              <label htmlFor={`startDate-${book._id}`}>Start Date: </label>
              <input
                type="date"
                id={`startDate-${book._id}`}
                min={getMinStartDate()} // Set min attribute
                value={selectedDates[book._id]?.startDate || ""}
                onChange={(e) => handleDateChange(book._id, "startDate", e)}
              />
              <br />
              <label htmlFor={`endDate-${book._id}`}>End Date: </label>
              <input
                type="date"
                id={`endDate-${book._id}`}
                disabled={!selectedDates[book._id]?.startDate} // Disable if no start date
                min={
                  selectedDates[book._id]?.startDate
                    ? getMinEndDate(selectedDates[book._id]?.startDate)
                    : ""
                }
                value={selectedDates[book._id]?.endDate || ""}
                onChange={(e) => handleDateChange(book._id, "endDate", e)}
              />
              <br />
              {selectedDates[book._id]?.startDate &&
                selectedDates[book._id]?.endDate && (
                  <p>
                    Number of days:{" "}
                    {
                      calculatePrice(
                        selectedDates[book._id]?.startDate,
                        selectedDates[book._id]?.endDate
                      ).days
                    }
                    <br />
                    Price: ₹
                    {
                      calculatePrice(
                        selectedDates[book._id]?.startDate,
                        selectedDates[book._id]?.endDate
                      ).price
                    }
                  </p>
                )}
            </div>
            <div className="rent-button-details">
              <Button
                className="btn-lib-delete"
                color="error"
                onClick={() => onDeleteBook(book._id)}
              >
                Delete
              </Button>
              <Button
                className="btn-lib-delete"
                color="success"
                onClick={() => handleOpenDialog(book._id)} // Open dialog for the clicked book
              >
                Confirm
              </Button>
            </div>
            <Dialog
              open={dialogOpen && selectedBookId === book._id} // Only open for the selected book
              onClose={handleCloseDialog}
            >
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to Rent the book "{book.title}"
                </DialogContentText>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>Start Date: {selectedDates[book._id]?.startDate}</p>
                <p>End Date: {selectedDates[book._id]?.endDate}</p>
                <p>
                  Total Days:{" "}
                  {
                    calculatePrice(
                      selectedDates[book._id]?.startDate,
                      selectedDates[book._id]?.endDate
                    ).days
                  }
                </p>
                <p>
                  Total Price:{" "}
                  {
                    calculatePrice(
                      selectedDates[book._id]?.startDate,
                      selectedDates[book._id]?.endDate
                    ).price
                  }
                </p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={() => handleProceed(book._id)} color="success">
                  Proceed
                </Button>
              </DialogActions>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
