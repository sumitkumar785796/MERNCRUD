import React, { useCallback, useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

const UpdateData = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [getUserData, setUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
  });

  const setRecord = (e) => {
    const { name, value } = e.target;
    setUserData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const {id} = useParams("")
  // console.log(id)
  // console.log(getUserData)
  const getData = useCallback(async () => {
    try {
      const res = await fetch(`/view/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (!res.ok) {
        // Check for HTTP error status (not 2xx)
        alert("Error fetching data");
        console.error("Error fetching data:", res.statusText);
        return;
      }
  
      const data = await res.json();
  
      if (!data.message) {
        // get the data validity
        console.error("Invalid data received");
      } else {
        setUserData(data.message[0]);
        // console.log('getdata', data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },[id]);
  useEffect(()=>{
    getData()
  },[getData])

  const updateUser = async (e) =>{
    e.preventDefault();
    const { fname, lname, email, mobile } = getUserData;
    try {
      const res2 = await fetch(`/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          mobile,
        }),
      })
      if (!res2.ok) {
        // Check for HTTP error status (not 2xx)
        setAlertMessage("Error adding data");
        setAlertType("danger");
        console.error("Error adding data:", res2.statusText);
        return;
      }

      const data2 = await res2.json();

      if (!data2) {
        // Check for data validity
        setAlertMessage("Invalid data received");
        setAlertType("danger");
        console.error("Invalid data received");
      } else {
        setAlertMessage("Data is added");
        setAlertType("success");
        console.log('Update Data successfully...', data2);
       

        // Clear the alert after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setAlertMessage(null);
          setAlertType(null);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Navbar />
      <h1 className="text-center">Update Record</h1>
      <div className="container">
      {alertMessage && alertType && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )} 
        <form action="">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="fname">First Name</label>
              <input type="text" value={getUserData.fname} onChange={setRecord} name="fname" className='form-control' />
            </div>
            <div className="col-sm-6">
              <label htmlFor="lname">Last Name</label>
              <input type="text" value={getUserData.lname} onChange={setRecord} name='lname' className='form-control' />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="Email">Email</label>
              <input type="email" value={getUserData.email} onChange={setRecord} name="email" className='form-control' />
            </div>
            <div className="col-sm-6">
              <label htmlFor="mobile">Mobile</label>
              <input type="number" value={getUserData.mobile} onChange={setRecord} name='mobile' className='form-control' />
            </div>
          </div>
          <br />
          <button type="submit" onClick={updateUser} className='btn btn-success'>Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateData;
