import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { column, DepartmentButtons } from '../../utils/HelperDepartment';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const[filteredDepartment,setFilteredDepartments ] = useState([])

  const onDepartmentDelete = async (id) =>{
    const data = departments.filter(dep=> dep._id !== id)
    setDepartments(data);
    // setFilteredDepartments(data); 
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("Response from API (Departments):", response.data.departments); // Check for departments data
        
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,  // Add serial number
            dep_name: dep.dep_name,
            action: (<DepartmentButtons Id ={dep._id} onDepartmentDelete= {onDepartmentDelete}/>),
          }));
          setDepartments(data); // Setting department data in state
          setFilteredDepartments(data)
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.server);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);


  const handleFilter = (e) =>{
    const searchValue = e.target.value.toLowerCase();
    const records = departments.filter((dep)=>
        dep.dep_name.toLowerCase().includes(searchValue)
    );
    setFilteredDepartments(records)
  }

  return (
    <>
      {depLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input type="text" placeholder="Search By Department" className="px-4 py-1 border" 
               onChange={handleFilter} 
            />
            <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-green-600 rounded text-white">
              Add New Department
            </Link>
          </div>
          <div className='mt-5'>
            <DataTable columns={column} data={filteredDepartment} pagination/>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;


// add