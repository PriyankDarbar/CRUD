import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseConfig, firebase } from "./firebase-config";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const inputEvent = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordShown,setPasswordShown] = useState(false);

  const handlePassword = (e) => {
    if (e.target.checked){
      setPasswordShown(true)
    }else{
      setPasswordShown(false)
    }
  }
  const handleLogin = (e) => {
    e.preventDefault();
    firebaseConfig.auth().signInWithEmailAndPassword(email,password).then((user) => {
      toast.success("Logged In successfully!");
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    }).catch((error) => {
      toast.error("Email or password is not recognised!");
      setTimeout(() => {
      }, 2000)
    });
    setLoading(true);
  }

  const handleSignup = (e) => {
    e.preventDefault();
    firebaseConfig.auth().createUserWithEmailAndPassword(email,password).then((user) => {
      toast.success("Sign Up successfully!");
      setTimeout(() => {
        navigate('/create')
    }, 2000)
    }).catch((error) => {
      toast.error("Email or password is not registered! ");
      setTimeout(() => {
      }, 2000)
    });
  }

  const Googlehandler = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result)=>{
      console.log(result);
      if(result !== null){
      toast.success("Sign In With Google is successfully!");
      setTimeout(() => {
        navigate('/home')
      }, 2000)}
    }).catch((err) =>{
      console.log(err);
    });
  }

  return (
    <>
    <ToastContainer />
    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
            <div className="wrapper wrapper--w680">
                <div className="card card-4">
                    <div className="card-body">
                        <h2 className="title">Login Form</h2>
                        <form>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <input className="input--style-4" type="email" name="email" onChange={inputEvent} />
                                </div>
                            </div>
                            <div className="col-2">    
                                <div className="input-group">
                                    <label className="label">Password</label>
                                    <input className="input--style-4" type={ passwordShown ? "text" : "password"} name="password" onChange={inputEvent} />
                                    <div className="show">
                                      <input type="checkbox" onChange={handlePassword}/><p>Show Password</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn--blue" type="submit" style={{marginRight:"220px"}} onClick={(e) => handleSignup(e)} disabled={loading} >Sign Up</button>
                            <button className="btn btn--radius-2 btn--blue" type="submit" onClick={(e) => handleLogin(e)} >Log In</button>
                        </div>
                        <div className="p-t-20">
                            <button className="btn btn--radius-2 btn--black" type="submit" style={{marginLeft: "170px",marginTop: "10px"}} onClick={(e) => Googlehandler(e)} >Sign In With Google</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};
export default Login;
