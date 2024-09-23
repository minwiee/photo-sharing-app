import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link as RouterLink } from "react-router-dom";
/**
 * Define UserList, a React component of Project 4.
 */

// import UserDetail from "../UserDetail";
import { useState, useEffect } from "react";
import fetchModels from "../../lib/fetchModelData";
function UserList({userId}) {
  // const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      console.log(userId);
      if (userId) {
        const data = await fetchModels.fetchUserModel(userId);
        console.log(data);
        setUser(data);
      }
    };
    fetchUser();
  }, [userId]); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    {
    const fetchUsers = async () => {
      try {
        const data = await fetchModels.fetchUserListModel();
        setUsers(data);
        // setUserId(sessionStorage.getItem('userId'));
        setLoading(false);
      } catch (error) {
      }
    };

    fetchUsers();
  }
    // console.log(userId)
  }, [user]); // This effect runs whenever userId changes

  console.log(users);
  return (
    user && users && (
      <div>
        <List component="nav">
          {users.map((item) => (
            <>
              <ListItem>
                {/* <ListItemText primary={item.first_name} /> */}
                <Link
                  key={item._id}
                  component={RouterLink}
                  to={`/users/${item._id}`}
                >
                  <ListItem>
                    <ListItemText
                      primary={item.first_name}
                    />
                  </ListItem>
                  <Divider />
                </Link>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <Typography variant="body1">
        </Typography>
      </div>
    )
  );
}

export default UserList;
