import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

const MyDataTable = () => {
    const tableRef = useRef(null);
  
    useEffect(() => {
      // Initialize DataTable when the component mounts
      $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50],
      });
  
      // Destroy the DataTable when the component unmounts to avoid memory leaks
      return () => $(tableRef.current).DataTable().destroy();
    }, []);
  
    return (
      <table ref={tableRef} className="table table-bordered">
        {/* Your table content here */}
      </table>
    );
  };
  
  export default MyDataTable;
  