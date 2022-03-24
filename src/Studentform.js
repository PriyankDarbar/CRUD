import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import db from "./firebase-config";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Studentform=()=>{
    
    const [checkedState,setCheckedState]= useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [userstudent,setUserStudent]=useState({
       firstname: "",
       lastname: "",
       enrollment: "",
       mobile: "",
       email: "",
       password: "",
       gender: "",
       hobbies: [],
       country: "",
       bio: ""
    });

    const cbHandler = (e) => {
        if (e.target.checked) {
            let hob = [...checkedState];
            hob.push(e.target.value);
            console.log("check", hob);
            setCheckedState(hob);
          } else {
            let hob = [...checkedState];
            let index= hob.indexOf(e.target.value);
            hob.splice(index,1)
            console.log("uncheck", hob);
            setCheckedState(hob);
          }
        //  setCheckedState([...checkedState, e.target.value]);
      };
   
    const eventHandler = (e) => {
        const newStudent = { ...userstudent };
        newStudent[e.target.name] = e.target.value;
        console.log("data",newStudent)
        setUserStudent(newStudent);
      };

    const validate = () => {
       let isValid = true;
       let error = {};
       let input = userstudent;
       if(!input['firstname']){
           isValid = false;
           error['firstname'] = "Please Enter First Name"
        }
        if(!input['lastname']){
            isValid = false;
            error['lastname'] = "Please Enter Last Name"
        }
        if(!input['enrollment']){
            isValid = false;
            error['enrollment'] = "Please Enter Enrollment"
        }
        if(!input['mobile']){
            isValid = false;
            error['mobile'] = "Please Enter Mobile No."
        }
        if(input['mobile'].length < 10 || input['mobile'].length > 10){
            isValid = false;
            error['mobile'] = "Mobile No. should be only of 10 digits"
        }
        if(!input['email']){
            isValid = false;
            error['email'] = "Please Enter Email ID"
        }
        if(!input['password']){
            isValid = false;
            error['password'] = "Please Enter Password"
        }
        if(!input['gender']){
            isValid = false;
            error['gender'] = "Please Select Any Gender"
        }
        if(checkedState.length === 0){
            isValid = false;
            error['hobbies'] = "Please Select Atleast One Hobbie "
        }
        if(!input['country']){
            isValid = false;
            error['country'] = "Please Select Any Country"
        }
        if(!input['bio']){
            isValid = false;
            error['bio'] = "Please Enter Bio"
        }
       setErrors(error);
       return isValid ;
    }
    
    const submithandler = (e) => {
        e.preventDefault();
       if (validate()){
           db.collection("User-Student").add({
               firstname: userstudent.firstname,
               lastname: userstudent.lastname,
               enrollment: userstudent.enrollment,
               mobile: userstudent.mobile,
               email: userstudent.email,
               password: userstudent.password,
               gender: userstudent.gender,
               hobbies: checkedState,
               country: userstudent.country,
               bio: userstudent.bio
           })
           toast.success("The data is successfully inserted to the firebase");
            setTimeout(() => {
                navigate('/')
            }, 3000)
      } 
    }
    return (
    <>
    <ToastContainer/>
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
            <div className="wrapper wrapper--w680">
                <div className="card card-4">
                    <div className="card-body">
                        <h2 className="title">Student Form</h2>
                        <form onSubmit={ (e) => submithandler(e)}>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">FirstName</label>
                                    <input className="input--style-4" type="text" id="firstname" name="firstname" onChange={eventHandler} />
                                    <div className="errors">{errors.firstname}</div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">LastName</label>
                                    <input className="input--style-4" type="text" id="lastname" name="lastname"  onChange={eventHandler} />
                                    <div className="errors">{errors.lastname}</div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label  className="label">Enrollment No. </label>
                                    <input type="string" id="enrollment" name="enrollment" className="input--style-4" onChange={eventHandler} />
                                    <div className="errors">{errors.enrollment}</div>
                                </div>
                                
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Mobile No.</label>
                                    <input className="input--style-4" type="text" id="mobile" name="mobile"  onChange={eventHandler} maxLength="10" pattern="\d{10}" />
                                    <div className="errors">{errors.mobile}</div>
                                </div>
                            </div>
                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email ID</label>
                                    <input className="input--style-4" type="email" id="email" name="email"  onChange={eventHandler} />
                                    <div className="errors">{errors.email}</div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Password</label>
                                    <input className="input--style-4" type="password" id="password" name="password"  onChange={eventHandler} />
                                    <div className="errors">{errors.password}</div>
                                </div>
                            </div>
                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Gender</label>
                                    <div className="p-t-10">
                                        <label className="radio-container m-r-45">Male
                                            <input type="radio" name="gender" value="Male" onChange={eventHandler} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="radio-container">Female
                                            <input type="radio" name="gender" value="Female" onChange={eventHandler} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="errors">{errors.gender}</div>
                                </div>
                            </div>

                        <div className="col-2">
                             <div className="input-group">
                                <label className="label">Hobbies</label>
                                <div className="p-t-10">
                                    <label className="checkbox-container" >Music
                                        <input type="checkbox" name="hobbies" value="Music" onChange={cbHandler} checked={checkedState.includes("Music")} />
                                        <span className="check"></span>
                                    </label>
                                    <label className="checkbox-container" >Sports
                                        <input type="checkbox" name="hobbies" value="Sports" onChange={cbHandler} checked={checkedState.includes("Sports")} />
                                        <span className="check"></span>
                                    </label>
                                    <label className="checkbox-container" >Travel
                                        <input type="checkbox" name="hobbies" value="Travel" onChange={cbHandler} checked={checkedState.includes("Travel")} />
                                        <span className="check"></span>
                                    </label>
                                </div>
                                <div className="errors">{errors.hobbies}</div>
                             </div>
                        </div>

                    </div>
                    <div className="row row-space">
                        <div className="col-2">
                            <div className="input-group">
                                <label className="label">Country</label>
                                <div className="rs-select2 js-select-simple select--no-search">
                                    <select name="country" onChange={eventHandler} >
                                        <option value="Choose Country">Choose Country</option>
                                        <option value="American Samoa">American Samoa</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Costa Rica">Costa Rica</option>
                                        <option value="France">France</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Greenland">Greenland</option>
                                        <option value="India">India</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                    </select>
                                    <div className="select-dropdown"></div>
                                    <div className="errors">{errors.country}</div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-2">
                            <div className="input-group">
                                <label className="label"> Upload Profile Picture(png,jpeg)</label>
                                <input type="file" id="file" name="file" size="70" accept="image/png,image/jpeg"/>
                            </div>
                        </div> */}
                    </div>

                    <div className="row row-space">
                        <div className="p-t-8">
                            <label className="label"> Bio </label>
                            <textarea id="bio" name="bio" rows="4" cols="50" onChange={eventHandler} ></textarea>
                        <div className="errors">{errors.bio}</div>
                        </div>
                    </div>
                    <br />
                        <div className="p-t-20">
                            <button className="btn btn--radius-2 btn--blue" type="submit" style={{marginLeft: "170px"}}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Studentform
