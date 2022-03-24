import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {confirm} from "react-confirm-box"
import { firebase } from "./firebase-config";
import db from "./firebase-config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';

const Home = () => {
  const [userStudent, setUserStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }

  const navigate = useNavigate();

  const handleCreate = (e)=>{
    navigate('/create')
  };

  const handleLogout = (e) => {
    // e.preventDefault();
    firebase.auth().signOut();    
    navigate('/');
  }

  const handleDelete = async(id) => {
    const result = await confirm("Are you sure?", options);
    if (result) {
        db.collection("User-Student").doc(id).delete();
        getData();
        toast.success("User Delelted");
    }else{
        console.log("Document not found");
    }
  };

  const Searchhandle = (e) => {
    let search = e.target.value;
    let first= search.charAt(0).toUpperCase();
    let last= search.slice(1).toLowerCase();
    let final = first + last;
    if(search.length > 0){
      setLoading(true);
    db.collection("User-Student")
      .get()
      .then((document) => {
        let data = [];
        document.forEach((doc) => {
          let searchValue = doc.data().firstname;
          if(searchValue.includes(final) || searchValue.includes(search) || searchValue.includes(search.toUpperCase()) || searchValue.includes(search.toLowerCase())){
            data.push({ ...doc.data(), id: doc.id });
          }
        })
        setUserStudent(data);
        setLoading(false);
        })
      }else{
        getData();
      }

  }
  
  useEffect(() => {
    getData();
  }, []);

  // Representing the data from the firebase
  const getData = () => {
    db.collection("User-Student")
      .get()
      .then((document) => {
        if (document.docs.length > 0) {
          let data = [];
          document.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setUserStudent(data);
          setLoading(false);  
        } else {
          console.log("No such Collection!!");
        }
      });
  };
  return (
    <>
    <ToastContainer/>
    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
      <div className="wrapper wrapper--w680">
       <div className="row row-space">
            <button type="submit" style={{float: "left"}} className="btn btn--radius-2 btn--blue" onClick={()=>handleCreate()}>
              Create
            </button>
            <div className="search-container"> 
              <input type="text" placeholder="Search by Name" onChange={Searchhandle} />
              <div className="search-icon">
                  <SearchIcon />
              </div>
           </div>
            <button type="submit" style={{float: "right"}} className="btn btn--radius-2 btn--blue" onClick={()=>handleLogout()}>
              Logout
            </button>
      </div>
    <TableForm>
      <div className="home">
        {!loading ?
          <table>
            <thead>
              <tr>
                <th>I.D</th>
                <th>First_Name</th>
                <th>Last_Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userStudent.length > 0 ? (
                userStudent.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.country}</td>
                    <td>
                        <Link to={`/update/${item.id}`}>
                          <FontAwesomeIcon icon={faPen} style={{color:"green"}}></FontAwesomeIcon>
                       </Link>
                    </td>
                    <td>
                    <FontAwesomeIcon icon={faTrash} style={{color:"red"}} onClick={() => handleDelete(item.id)}></FontAwesomeIcon>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="8">No Record Found...</td>
              </tr>
            )}
          </tbody>
        </table>
        :''}
      </div>
      <br />
    </TableForm> 
   </div>
 </div>
 </>
  );
};

export default Home;

const TableForm = styled.div`
  .home {
    width: 100%;
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  table {
    border: 2px solid black;
    width: 600px;
    height: 100px;
  }

  th {
    border-bottom: 1px solid black;
  }

  td {
    text-align: center;
  }

`;
