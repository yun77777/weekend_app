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
import Login from "./login";
import SignUp from "./register";

const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<SignUp />} />
       <Route path="/login" element={<Login />} />
     </Routes>
   </div>
 );
};
 
export default App;