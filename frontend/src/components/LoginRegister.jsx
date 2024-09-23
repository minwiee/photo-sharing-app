import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Input,
    FormControl,
    InputLabel,
    Grid,
    Typography
} from '@material-ui/core';
import fetchModels from '../lib/fetchModelData';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { Dialog, Box, IconButton, TextField, FormLabel } from '@mui/material';

const LoginRegister = (userid) => {
    const [userId, setUserId] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const [state, setState] = useState({
        loginName: '',
        loginPassword: '',
        first_name: '',
        last_name: '',
        location: '',
        description: '',
        occupation: ""
    });
    const navigate = useNavigate();
    // console.log(response.cookies.userId);
    // const [state, setState] = useState({ loginName: '', loginPassword: '' });
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const user = await fetchModels.fetchLogin(state.loginName, state.loginPassword);
    //         console.log(user);
    //         setUser(user);
    //     };

    //     fetchUser();
    // }, [state.loginName, state.loginPassword]);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const res = await fetchModels.fetchRegister(state.first_name, state.last_name, state.loginName, state.loginPassword, state.occupation, state.location, state.description);
            console.log(res);
            if (res._id) {
                sessionStorage.setItem('userId', res._id);
                setUserId(res._id);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            console.log(state.loginName, state.loginPassword)
            const res = await fetchModels.fetchLogin(state.loginName, state.loginPassword);
            // console.log(res);
            // console.log("truoc1: ",console.log(res._id));
            // console.log("truoc2: ", console.log(res));
            sessionStorage.setItem('userId', res._id);
            setUserId(res._id);

            const resUser = await fetchModels.fetchUserModel(res._id);
            console.log(resUser);
            console.log(sessionStorage);
            navigate(`/users/${res._id}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    useEffect(() => {
        const getUserId = sessionStorage.getItem('userId');
        setUserId(getUserId);
        if (getUserId) {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }

    }, [userId]);
    return (<>
        <form onSubmit={handleLogin}>
            <label>
                Login Name:
                <input type="text" name="loginName" value={state.loginName} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="loginPassword" value={state.loginPassword} onChange={handleChange} />
            </label>
            <button type="submit">Log In</button>
        </form>
        <form onSubmit={handleRegister}>
            <label>
                Login Name:
                <input type="text" name="loginName" value={state.loginName} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="loginPassword" value={state.loginPassword} onChange={handleChange} />
            </label>

            <label>
                First Name:
                <input type="text" name="first_name" value={state.first_name} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name" value={state.last_name} onChange={handleChange} />
            </label>
            <label>
                Occupation:
                <input type="text" name="occupation" value={state.occupation} onChange={handleChange} />
            </label>
            <label>
                Location:
                <input type="text" name="location" value={state.location} onChange={handleChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={state.description} onChange={handleChange} />
            </label>
            <button type="submit">Register</button>
        </form>
    </>

        // <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
        //     <Typography variant="h4" textAlign={"center"}>
        //         {userId ? "Login" : "Register"}
        //     </Typography>
        //     <form onSubmit={(userId) ? handleLogin : handleRegister}>
        //         <Box
        //             padding={6} display={"flex"} justifyContent={"center"} flexDirection={"column"} width={400} margin={"auto"} alignContent={"center"}>
        //             <FormLabel  >LoginName</FormLabel>
        //             <TextField value={state.loginName} onChange={handleChange} margin="normal" variant="standard" type={"loginName"} name="loginName"></TextField>
        //             <FormLabel  >Password</FormLabel>
        //             <TextField value={state.loginPassword} onChange={handleChange} margin="normal" variant="standard" type={"loginPassword"} name="loginPassword"></TextField>
        //             {!userId && (
        //                 <>
        //                     {""}
        //                     <FormLabel  >First Name</FormLabel>
        //                     <TextField value={state.first_name} onChange={handleChange} margin="normal" variant="standard" type={"text"} name="first_name"></TextField>
        //                     <FormLabel >Last Name</FormLabel>
        //                     <TextField value={state.last_name} onChange={handleChange} margin="normal" variant="standard" type={"text"} name="last_name"></TextField>
        //                     <FormLabel >Location</FormLabel>
        //                     <TextField value={state.location} onChange={handleChange} margin="normal" variant="standard" type={"text"} name="location"></TextField>

        //                     <FormLabel >Description</FormLabel>
        //                     <TextField value={state.description} onChange={handleChange} margin="normal" variant="standard" type={"text"} name="description"></TextField>

        //                     <FormLabel >Occupation</FormLabel>
        //                     <TextField value={state.occupation} onChange={handleChange} margin="normal" variant="standard" type={"text"} name="occupation"></TextField>
        //                 </>
        //             )}
        //             <Button sx={{ mt: 2, borderRadius: 50 }} type="submit" fullWidth variant="contained">{userId ? "Login":"Sign up"  }</Button>
        //             {!userid &&
        //                 <Button
        //                     onClick={() => setIsSignUp(!isSignUp)} sx={{ mt: 2, borderRadius: 50 }} fullWidth >
        //                     Switch to {userId ? "Login" : "Sign up"}
        //                 </Button>
        //             }

        //         </Box>
        //     </form>
        // </Dialog>

    );

}
export default LoginRegister;