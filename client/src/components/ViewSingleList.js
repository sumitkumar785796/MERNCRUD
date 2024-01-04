import React, { useCallback, useEffect, useState } from 'react'
import {  NavLink, useParams } from 'react-router-dom'
import Navbar from './Navbar'

const ViewSingleList = () => {
  const [getUserData, setUserData] = useState([]);
  const {id} = useParams("")
  console.log(id)
  console.log(getUserData)
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
  return (
    <>
        <Navbar/>
        <br />
        <div className="container">
        <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h1 className="card-title">{getUserData.fname} {getUserData.lname}</h1>
          <p className="card-text">{getUserData.email}</p>
          <p className="card-text">{getUserData.mobile}</p>
          <NavLink to={`/update/${id}`} className="btn btn-primary">Update</NavLink>
        </div>
      </div>
        </div>
    </>
  )
}

export default ViewSingleList