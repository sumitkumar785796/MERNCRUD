import React from 'react';
import { NavLink } from 'react-router-dom';

const DataStore = ({ index, id, fname, lname, email, mobile,deleteUser }) => {
 
  return (
    <tr className='table-primary'>
      <th scope="row">{index + 1}</th>
      <td>{fname}</td>
      <td>{lname}</td>
      <td>{email}</td>
      <td>{mobile}</td>
      <td>
        <NavLink to={`view/${id}`} className='btn btn-primary' style={{ margin: '10px' }}>
          <i className="fa-regular fa-eye" />
        </NavLink>
        <NavLink to={`update/${id}`} className='btn btn-success' style={{ margin: '10px' }}>
          <i className="fa-solid fa-pen-to-square" />
        </NavLink>
        <button type="button" className='btn btn-danger' style={{ margin: '10px' }} onClick={deleteUser}>
          <i className="fa-sharp fa-solid fa-trash" />
        </button>
      </td>
    </tr>
  );
};

export default DataStore;
