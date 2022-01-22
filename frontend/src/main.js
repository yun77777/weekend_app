import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

import NavigationBar from './NavigationBar';

const theme = createTheme();

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;


export default function Login() {

const [emailError, setEmailError] = useState('');
const [passwordState, setPasswordState] = useState('');
const [passwordError, setPasswordError] = useState('');
const [LoginError, setLoginError] = useState('');
// const history = useHistory();


const onhandlePost = async (data) => {
  const { email, password } = data;
  const postData = { email, password};

  console.log('data:',data);


  await axios
    .post('http://localhost:5000/user/login', postData)
    .then(function (response) {
      console.log(response, 'logged in successfully');
      // history.push('/login');
      
    })
    .catch(function (err) {
      console.log(err);
      setLoginError('failed to log in. check it again');
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const joinData = {
        email: data.get('email'),
        password: data.get('password')
    };
    
    const { email, password } = joinData;

    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if(!emailRegex.test(email))
        setEmailError('check your email');
    else
        setEmailError('');

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if(!passwordRegex.test(password))
        setPasswordState('make your password with the combination of numbers and alpabets and special characters more than 8 letters')
    else
        setPasswordState('');


      
    if(
      emailRegex.test(email) &&
      passwordRegex.test(password)
    ) {
      onhandlePost(joinData);
    }
};


  return (
    <div className="App">
        <div className="app__body">
          <NavigationBar />
        </div>
      </div>
  );
}