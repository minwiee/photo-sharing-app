import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import fetchModels from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     console.log(userId);
  //     if (userId) {
  //       const data = await fetchModels.fetchUserModel(userId);
  //       console.log(data);
  //       setUser(data);
  //     }
  //   };
  //   fetchUser();
  // }, [userId]); // Empty dependency array means this effect runs once on mount
  console.log(user)
  const logout = async () => {
    try {
      await fetchModels.fetchLogout(); // Call fetchLogout
      // sessionStorage.removeItem('userid'); // Remove userid from session storage
      sessionStorage.removeItem('userId'); // Remove userid from session storage
      // sessionStorage.removeItem('user')

      setUser(null); // Clear user state
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          {console.log(user)}
          {user ? `Welcome, ${user.first_name}` : 'Please Login'}
          {user && <button onClick={logout}>Logout</button>} {/* Logout button */}

        </Typography> 
        {(
          <Button color="inherit" component={Link} to="login-register">
            Login
          </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
