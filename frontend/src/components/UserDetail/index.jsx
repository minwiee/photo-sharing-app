import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
/**
 * Define UserDetail, a React component of Project 4.
 */
import { useEffect } from "react";
import { useState } from "react";
import fetchModels from "../../lib/fetchModelData";
function UserDetail() {
  const { userId } = useParams();
  // console.log(userId)
  // const user = models.userModel(userId);
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchModels.fetchUserModel(userId);
        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);
  // console.log(user);
  return (
    <>
      <Typography variant="h4">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">ID: {user._id}</Typography>
      <Typography variant="body1">First Name: {user.first_name}</Typography>
      <Typography variant="body1">Last Name: {user.last_name}</Typography>
      <Typography variant="body1">Location: {user.location}</Typography>
      <Typography variant="body1">Description:: {user.description}</Typography>
      <Typography variant="body1">Occupation: {user.occupation}</Typography>
      <Link to={`/photos/${userId}`}>View Photos</Link>
    </>
  );
}

export default UserDetail;
