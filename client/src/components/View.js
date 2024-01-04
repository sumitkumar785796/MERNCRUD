import React, { useState, useEffect } from 'react';
import DataStore from './DataStore';
import Navbar from './Navbar';

const View = () => {
  const [getUserData, setUserData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
        setUserData(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    try {
      // Display a confirmation alert before deleting the user
      const isConfirmed = window.confirm('Are you sure you want to delete this user?');

      if (!isConfirmed) {
        return;
      }

      const res2 = await fetch(`/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res2.ok) {
        // Check for HTTP error status (not 2xx)
        alert('Error deleting user');
        console.error('Error deleting user:', res2.statusText);
        return;
      }

      const deleteData = await res2.json();

      if (!deleteData.message) {
        // Handle invalid data received
        console.error('Invalid data received');
      } else {
        // Update the state to reflect the deletion
        setUserData((prevData) => prevData.filter((user) => user._id !== id));
        console.log('User deleted');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center">View Record</h1>
        <table className="table" id="example">
          <thead>
            <tr className='table-dark'>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {getUserData.map((element, index) => (
              <DataStore
                id={element._id}
                index={index}
                key={element._id}
                fname={element.fname}
                lname={element.lname}
                email={element.email}
                mobile={element.mobile}
                deleteUser={() => deleteUser(element._id)} // Pass the id to deleteUser
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default View;
