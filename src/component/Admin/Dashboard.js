import React, { useEffect, useState } from "react";
import {
  Typography,
  Tab,
  Tabs,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./Dashboard.css";
import RentedDashboard from "./RentedDashboard";
import CartDashboard from "./CartDashboard";
import BookingHistory from "../BookingHistrory";
import SellDetails from "../SellDetails";
const Dashboard = () => {
  const [carthistory, setCarthistory] = useState([]);
  const [rented, setrented] = useState([]);
  const [author, setauthor] = useState([]);
  const [activeTab, setActiveTab] = useState("Buy");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    fetch("http://localhost:4000/library")
      .then((response) => response.json())
      .then((data) => setrented(data))
      .catch((error) => console.error("Error fetching rented data:", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((response) => response.json())
      .then((data) => setCarthistory(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    // Calculate the frequency of each author in the carthistory array
    const authorFrequency = {};
    carthistory.forEach((order) => {
      order.items.forEach((item) => {
        const author = item.author;
        if (author in authorFrequency) {
          authorFrequency[author]++;
        } else {
          authorFrequency[author] = 1;
        }
      });
    });

    // Sort authors by frequency in descending order
    const sortedAuthors = Object.keys(authorFrequency).sort(
      (a, b) => authorFrequency[b] - authorFrequency[a]
    );

    // Get the top five authors
    const topAuthors = sortedAuthors.slice(0, 5);
    setauthor(topAuthors);
  }, [carthistory]);
  console.log("rented", rented);
  console.log("author", author);
  console.log("cart", carthistory);

  return (
    <div className="container-drawer-dashboard" style={{ display: "flex" }}>
      <Drawer
        className="drawer-slidebar-dashboard"
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <List className="list-dashboard-container">
          <ListItem>
            <ListItemText primary="Top Five Authors" />
          </ListItem>
          {author.map((author, index) => (
            <ListItem key={index}>
              <ListItemText primary={author} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="Profile Tabs"
          className="tab-full-box"
        >
          <Tab label="Buy" value="Buy" />
          <Tab label="Rent" value="Rent" />
          <Tab label="Sell" value="Sell" />
        </Tabs>

        {activeTab === "Buy" && <CartDashboard carthistory={carthistory} />}
        {activeTab === "Rent" && <RentedDashboard rented={rented} />}
        {activeTab === "Sell" && <SellDetails />}
      </div>
    </div>
  );
};

export default Dashboard;
