import React,{useState, useEffect} from "react";
import db from "./firebase-config";
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Update=()=>{

  const update_id = useParams();
  const navigate= useNavigate();

  const [updateData, setUpdateData] = useState({});
  const [errors,setErrors] = useState({});
  const [hobbies, setHobbies] = useState([]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if(validate()){    db.collection("User-Student").doc(update_id.id).update({
      firstname: updateData.firstname,
      lastname: updateData.lastname,
      email: updateData.email,
      enrollment: updateData.enrollment,
      password: updateData.password,
      gender: updateData.gender,
      country: updateData.country,
      bio: updateData.bio
    });
    toast.success("The data is successfully altered to the firebase");
    setTimeout(() => {
        navigate('/home')
    }, 3000)

  }
};

  const handleChange = (e) => {
    const newData = { ...updateData };
    console.log("1",newData);
    newData[e.target.name] = e.target.value;
    console.log("2",newData);
    setUpdateData(newData);
  };

//   const handleCheckValue = (e) => {
//     if (e.target.checked) {
//       let hob = [...hobbies];
//       hob.push(e.target.value);
//       console.log("check", hob);
//       setHobbies(hob);
//     } else {
//       let hob = [...hobbies];
//       let index= hob.indexOf(e.target.value);
//       hob.splice(index,1)
//       console.log("uncheck", hob);
//       setHobbies(hob);
//     }
//   };

const validate = () => {
    let isValid = true;
    let error = {};
    let input = updateData;
    if(!input['firstname']){
        isValid = false;
        error['firstname'] = "Please Enter First Name"
     }
     if(!input['lastname']){
         isValid = false;
         error['lastname'] = "Please Enter Last Name"
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
     if(!input['gender']){
         isValid = false;
         error['gender'] = "Please Select Any Gender"
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

  const getUpdateData = () => {
      db.collection("User-Student")
        .doc(update_id.id)
        .get()
        .then((document) => {
          setUpdateData(document.data());
        //   console.log(document.data());
          setHobbies(document.data().hobbies);
        });
  };

  useEffect(() => {
    getUpdateData();
  }, []);

  return (
      <>
      <ToastContainer/>
              <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
                  <div className="wrapper wrapper--w680">
                      <div className="card card-4">
                          <div className="card-body">
                              <h2 className="title">Update Form</h2>
                              <form onSubmit={ (e) => handleUpdate(e)}>
                              <div className="row row-space">
                                  <div className="col-2">
                                      <div className="input-group">
                                          <label className="label">FirstName</label>
                                          <input className="input--style-4" type="text" id="firstname" name="firstname" placeholder="Enter your firstname" onChange={handleChange} value={updateData.firstname}/>
                                         <div className="errors">{errors.firstname}</div>
                                      </div>
                                  </div>
                                  <div className="col-2">
                                      <div className="input-group">
                                          <label className="label">LastName</label>
                                          <input className="input--style-4" type="text" id="lastname" name="lastname" placeholder="Enter your lastname " onChange={handleChange} value={updateData.lastname}/>
                                          <div className="errors">{errors.lastname}</div>
                                      </div>
                                  </div>
                              </div>

                               <div className="row row-space">
                                  <div className="col-2">
                                      <div className="input-group">
                                          <label className="label">Email ID</label>
                                          <input className="input--style-4" type="email" id="email" name="email" placeholder="Enter your email id" onChange={handleChange} value={updateData.email}/>
                                          <div className="errors">{errors.email}</div>
                                      </div>
                                  </div>
                                  <div className="col-2">
                                      <div className="input-group">
                                          <label className="label">Mobile No.</label>
                                          <input className="input--style-4" type="string" id="mobile" name="mobile" placeholder="Enter new mobile number" onChange={handleChange} value={updateData.mobile}/>
                                          <div className="errors">{errors.mobile}</div>
                                      </div>
                                  </div>
                              </div>
                                    
                              <div className="row row-space">
                                  <div className="col-2">
                                      <div className="input-group">
                                          <label className="label">Gender</label>
                                          <div className="p-t-10">
                                              <label className="radio-container m-r-45">Male
                                                  <input type="radio" name="gender" value="Male" onChange={handleChange} checked={updateData.gender === "Male"}/>
                                                  <span className="checkmark"></span>
                                              </label>
                                              <label className="radio-container">Female
                                                  <input type="radio" name="gender" value="Female" onChange={handleChange} checked={updateData.gender === "Female"}/>
                                                  <span className="checkmark"></span>
                                              </label>
                                          </div>
                                          <div className="errors">{errors.gender}</div>
                                      </div>
                                  </div>
                                  <div className="col-2">
                                  <div className="input-group">
                                      <label className="label">Country</label>
                                      <div className="rs-select2 js-select-simple select--no-search">
                                          <select name="country" onChange={handleChange} value={updateData.country}>
                                              <option disabled="disabled" >Choose Country</option>
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
                          </div>
                                  {/* <div className="col-2">
                                        <div className="input-group">
                                            <label className="label">Hobbies</label>
                                            <div className="p-t-10">
                                                <label className="checkbox-container" >Music
                                                    <input type="checkbox" name="hobbies" value="Music" onChange={handleCheckValue} checked={hobbies.includes('Music')} />
                                                    <span className="check"></span>
                                                </label>
                                                <label className="checkbox-container" >Sports
                                                    <input type="checkbox" name="hobbies" value="Sports" onChange={handleCheckValue} checked={hobbies.includes("Sports")} />
                                                    <span className="check"></span>
                                                </label>
                                                <label className="checkbox-container" >Travel
                                                    <input type="checkbox" name="hobbies" value="Travel" onChange={handleCheckValue} checked={hobbies.includes("Travel")} />
                                                    <span className="check"></span>
                                                </label>
                                            </div>
                                            <div className="errors">{errors.hobbies}</div>
                                        </div>
                                    </div> */}
                          
                          <div className="row row-space">
                          <div className="p-t-8">
                                <label className="label"> Bio </label>
                                <textarea id="bio" name="bio" rows="4" cols="50" onChange={handleChange} value={updateData.bio} ></textarea>
                                <div className="errors">{errors.bio}</div>
                         </div>
                                </div> 
                              <div className="p-t-20">
                                  <center>
                                  <button className="btn btn--radius-2 btn--blue" type="submit">Update</button>
                                  </center>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          </>
  )
}

export default Update;