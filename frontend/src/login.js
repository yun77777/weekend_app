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

const theme = createTheme();

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/user/login',
//   timeeout: 1000,
//   headers: {'Autorization': 'Bearer ' +token}
// });

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
      console.log(response.data.accessToken, ' accessToken');
      
      // history.push('/login');
      // window.location = "/mypage";

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" variant="standard">

            

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{emailError}</FormHelperTexts>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{passwordState}</FormHelperTexts>
              

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            </FormControl>
            <FormHelperTexts>{LoginError}</FormHelperTexts>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  You don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}