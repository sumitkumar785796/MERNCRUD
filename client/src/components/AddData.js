import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AddData = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const setRecord = (e) => {
    const { name, value } = e.target;
    setState((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const addInpData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile } = state;

    try {
      const res = await fetch("/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          mobile,
        }),
      });

      if (!res.ok) {
        // Check for HTTP error status (not 2xx)
        setAlertMessage("Error adding data");
        setAlertType("danger");
        console.error("Error adding data:", res.statusText);
        return;
      }

      const data = await res.json();

      if (!data) {
        // Check for data validity
        setAlertMessage("Invalid data received");
        setAlertType("danger");
        console.error("Invalid data received");
      } else {
        setAlertMessage("Data is added");
        setAlertType("success");
        console.log('Data is added', data);
        // Optionally, clear the form after successful submission
        setState({
          fname: '',
          lname: '',
          email: '',
          mobile: '',
        });

        // Clear the alert after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setAlertMessage(null);
          setAlertType(null);
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("An error occurred");
      setAlertType("danger");
    }
  };  
  return (
    <>
      <Navbar />
      <h1 className="text-center">Add Record</h1>
      <div className="container">
      {alertMessage && alertType && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}
        <form>
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="fname">First Name</label>
              <input type="text" value={state.fname} onChange={setRecord} name="fname" id='fname' className='form-control' />
            </div>
            <div className="col-sm-6">
              <label htmlFor="lname">Last Name</label>
              <input type="text" value={state.lname} onChange={setRecord} name='lname' id='lname' className='form-control' />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="Email">Email</label>
              <input type="email" value={state.email} onChange={setRecord} name="email" className='form-control' />
            </div>
            <div className="col-sm-6">
              <label htmlFor="mobile">Mobile</label>
              <input type="number" value={state.mobile} onChange={setRecord} name='mobile' className='form-control' />
            </div>
          </div>
          <br />
          <button type="submit" onClick={addInpData} className='btn btn-success'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddData;
