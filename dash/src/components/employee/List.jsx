import React ,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelpers';
import DataTable from 'react-data-table-component';
import axios from "axios";
 


const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const[filteredEmployee,setFilteredEmployees ] = useState([])
    // add

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
          try {
            const response = await axios.get('http://localhost:5000/api/employee', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            console.log("Fetched Employees:", response.data.employees); 
            
            if (response.data.success) {
              let sno = 1;
              const data = response.data.employees.map((emp) => ({
                _id: emp._id,
                sno: sno++,  // Add serial number
                dep_name: emp.department ? emp.department.dep_name : 'N/A',
                name:emp.userId.name,
                dob:new Date(emp.dob).toLocaleDateString(),
                maritalStatus: emp.maritalStatus,
                profileImage: <img width={40} className='rounded-full' src={`http://localhost:5000/${emp.userId.profileImage}`}/>,

                action: (<EmployeeButtons Id={emp._id}/>),
              }));
              setEmployees(data); // Setting department data in state
              setFilteredEmployees(data)
            }
          } catch (error) {
            console.error("Error fetching departments:", error);
            if (error.response && !error.response.data.success) {
              alert(error.response.data.server);
            }
          } finally {
            setEmpLoading(false);
          }
        };
        fetchEmployees();
      }, []);

      const handleFilter = (e) =>{
        const searchValue = e.target.value.toLowerCase();
        const records = employees.filter((emp)=>
            emp.name.toLowerCase().includes(searchValue)
        );
        setFilteredEmployees(records)
      }

  return (
    <div className='p-6'>
         <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input type="text" placeholder="Search" 
            className="px-4 py-1 border" 
            onChange={handleFilter}
            />


            <Link to="/admin-dashboard/add-employee" 
            className="px-4 py-1 bg-green-600 rounded text-white">
              Add New Employee
            </Link>
          </div>
          <div className='mt-6'>
            <DataTable columns={columns} data={filteredEmployee}pagination/>
          </div>
    </div>
  )
}

export default List