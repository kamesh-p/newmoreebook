import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function AdminDashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books from the server when the component mounts

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
  console.log("rented books", books);

  return (
    <Container>
      <Paper
        elevation={3}
        style={{ padding: "20px", margin: "100px auto", width: "80%" }}
      >
        <Typography variant="h4" gutterBottom>
          Requested Rented books
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Start Dates</TableCell>
                <TableCell>End Dates</TableCell>

                <TableCell>Days</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Cancel</TableCell>
                <TableCell>Confirm</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.startDate}</TableCell>
                  <TableCell>{book.endDate}</TableCell>
                  <TableCell>{book.days}</TableCell>

                  <TableCell>{book.price} Rs.</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="error">
                      Reject
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="success">
                      Confirm
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default AdminDashboard;
