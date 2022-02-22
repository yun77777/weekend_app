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


export default function SignUp() {
    
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

const [emailError, setEmailError] = useState('');
const [passwordState, setPasswordState] = useState('');
const [passwordError, setPasswordError] = useState('');
const [nameError, setNameError] = useState('');
const [agreementError, setagreementError] = useState('');
const [checked, setChecked] = useState(false);
const [registerError, setRegisterError] = useState('');
// const history = useHistory();

const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

const onhandlePost = async (data) => {
  const { email, firstName, lastName, password } = data;
  const name = firstName + ' ' +lastName;
  const postData = { email, name, password};

  // await fetch("http://localhost:5000/record/add", {
  console.log('data:',data);

  await fetch("http://localhost:5000/user/join", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(postData),
   })
   .then(res => res.json())
   .then(res => {
     if(res.success){
      res.redirect('/');
     }
   })
   .catch(error => {
     window.alert(error);
     return;
   });

  await axios
    .post('http://localhost:5000/user/join', postData)
    .then(function (response) {
      console.log(response, 'joined successfully');
      // history.push('/login');
      // response.redirect("/login");
      // var redir = { redirect: "/" };
      // return res.json(redir);


      // response.data.redirect = '/login';
      window.location = "/login";

      
      // return response.json({ redirect: "/" });

    })
    .catch(function (err) {
      console.log(err);
      setRegisterError('failed to join. check it again');
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const joinData = {
        email: data.get('email'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        password: data.get('password'),
        rePassword: data.get('rePassword'),
        checked: data.get('checked')
    };
    
    const { email, firstName, lastName, password, rePassword } = joinData;

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

    if(password !== rePassword)
        setPasswordError('password is not correct');
    else
        setPasswordError('');

    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if(!nameRegex.test(firstName))
        setNameError('check your name');
    else
        setNameError('');

    if(!nameRegex.test(lastName))
        setNameError('check your name');
    else
        setNameError('');
    if(!checked)
        setagreementError('accept the condition & terms')
    else
        setagreementError('');
      
    if(
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(firstName) &&
      nameRegex.test(lastName) &&
      checked
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" variant="standard">

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <FormHelperTexts>{nameError}</FormHelperTexts>

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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="rePassword"
                  label="rePassword"
                  type="password"
                  id="rePassword"
                  autoComplete="new-password"
                  error={passwordError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{passwordError}</FormHelperTexts>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox onChange={handleAgree} value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
              <FormHelperTexts>{agreementError}</FormHelperTexts>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}