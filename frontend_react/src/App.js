import React, {useEffect, useState} from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";


import './App.css';


// We import all the components we need in our app
import SignUp from "./register";
import Login from "./login"; 
import MyPage from "./mypage";
import Sample from "./sample";


// import Main from "./container/Main";
import Home from "./container/Home";


const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/mypage" element={<MyPage />} />
        
        {/* <Route path="/main" component={Main} /> */}
        <Route path="/home/:id" component={Home} />
      </Routes>
      
    </div>
  );
};

export default App;