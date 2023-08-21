import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function Sell() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [classification, setClassification] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    description: "",
    classification: "",
    price: "",
  });

  const handleConfirmDialogOpen = () => {
    if (validateForm()) {
      setConfirmDialogOpen(true);
    } else {
      toast.error("All fields are mandatory...", {
        autoClose: 1000,
        position: "top-right",
      });
    }
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title) newErrors.title = "Title is required";
    if (!author) newErrors.author = "Author is required";
    if (!description) newErrors.description = "Description is required";
    if (!classification)
      newErrors.classification = "Classification is required";
    if (!price) newErrors.price = "Price is required";
    else if (isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    clearError("title");
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    clearError("author");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    clearError("description");
  };

  const handleClassificationChange = (event) => {
    setClassification(event.target.value);
    clearError("classification");
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    clearError("price");
  };

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const sellingData = {
      user: user,
      author: author,
      title: title,
      description: description,
      price: price,
      classification: classification,
    };

    try {
      await axios.post(
        "http://localhost:4000/selling/create-user",
        sellingData
      );
      console.log("Selling data sent successfully!");
    } catch (error) {
      console.error("Error sending selling data:", error);
    }
    toast.success("Book posted successfully...", {
      autoClose: 1000,
      position: "top-right",
    });
    setTitle("");
    setPrice("");
    setDescription("");
    setAuthor("");
    setClassification("");
    handleConfirmDialogClose();
  };
  const handleformformat = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Container style={{ marginTop: "50px" }}>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            textAlign: "center",
            background: "#F6635C",
          }}
        >
          <h2>Instructions</h2>

          <ul
            style={{
              textAlign: "left",
              margin: "10px 0",
              paddingLeft: "20px",

              fontWeight: "bolder",
            }}
          >
            <li>
              Start by providing accurate details about your book.
              <ul>
                <li>
                  Select the book's language from available options such as
                  English, Tamil, Hindi, and French.
                </li>

                <li>
                  Choose the appropriate category for your book, including
                  educational (engineering, medicine), fiction, or non-fiction.
                </li>
              </ul>
            </li>

            <li>
              Prepare to sell your book by filling out the form accurately.
            </li>

            <li>
              Fill in your book's title, author, description, classification,
              and price in the form.
            </li>

            <li>Write a clear and captivating description of your book.</li>

            <li>
              Include high-quality images of your book's cover and any relevant
              pages.
            </li>

            <li>
              After entering the details, click the "Post Book" button to
              proceed with listing your book for sale.
            </li>

            <li>
              A confirmation dialog will appear; make sure to confirm your
              action to proceed with selling your book.
            </li>

            <li>
              Our team will review your listing and reach out to you. Thank you
              for using the Book Selling Portal!
            </li>
          </ul>
        </Paper>
      </Container>
      <Container>
        <Paper
          elevation={3}
          className="selling-page"
          style={{ width: "50%", padding: "20px", margin: "100px 300px" }}
        >
          <h2>Sell your Book</h2>

          <form className="form-field" onSubmit={handleformformat}>
            <TextField
              label="Title"
              value={title}
              error={!!errors.title}
              helperText={errors.title}
              style={{ width: "100%", marginTop: "10px" }}
              onChange={handleTitleChange}
              margin="normal"
            />

            <TextField
              label="Author"
              style={{ width: "100%", marginTop: "10px" }}
              value={author}
              error={!!errors.author}
              helperText={errors.author}
              onChange={handleAuthorChange}
              margin="normal"
            />

            <TextField
              rowsMin={4}
              label="Description"
              style={{ width: "100%", marginTop: "10px" }}
              value={description}
              error={!!errors.description}
              helperText={errors.description}
              onChange={handleDescriptionChange}
            />

            <TextField
              label="Classification"
              style={{ width: "100%", marginTop: "10px" }}
              value={classification}
              error={!!errors.classification}
              helperText={errors.classification}
              onChange={handleClassificationChange}
              margin="normal"
            />

            <TextField
              label="Price in Rs."
              type="number"
              style={{ width: "100%", marginTop: "10px" }}
              value={price}
              error={!!errors.price}
              helperText={errors.price}
              onChange={handlePriceChange}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="error"
              onClick={handleConfirmDialogOpen}
            >
              Post Book
            </Button>
          </form>
        </Paper>

        <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to sell your book? Our team will examine it
              and reach out to you.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConfirmDialogClose}
              variant="outlined"
              color="error"
            >
              Close
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="success">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Sell;
