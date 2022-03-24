import './styles.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import Studentform from "./Studentform";
import Home from "./Home";
import Update from "./Update";

 function App() {

  return (
  <div className="App">
   <Router>
    <Routes>
     <Route path="/" element={<Login />}></Route>
     <Route path="/create" element={<Studentform />}></Route>
     <Route path="/home" element={<Home />}></Route>
     <Route path="/update/:id" element={<Update/>}></Route>
    </Routes>
   </Router>
  </div>
  )
 }

 export default App;