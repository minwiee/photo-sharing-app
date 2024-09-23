import "./App.css";

import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import fetchModels from "./lib/fetchModelData";


const App = (props) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  // useEffect(() => {
  //   console.log('App component is rendering');
  // },[]);


  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar userId = {userId} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {/* <UserList userId = {userId}/> */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
