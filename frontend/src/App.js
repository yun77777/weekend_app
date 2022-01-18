// import Register from './register';

// function App() {
//   return (
//     <div >
//       <Register/>
//     </div>
//   );
// }

// export default App;


import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import SignUp from "./register";
import Login from "./login";
import Sample from "./sample";

const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<SignUp />} />
       <Route path="/login" element={<Login />} />
       <Route path="/sample" element={<Sample />} />
     </Routes>
   </div>
 );
};
 
export default App;