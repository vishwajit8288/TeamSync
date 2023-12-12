import React, { useState } from 'react';
import axios from 'axios';
const EmployeeCreation = () => {
    let [employeeList, setEmployeeList] = useState([]);
    let [employeeobj, setEmployeeObj] = useState({
        "empId": 0,
        "empName": "",
        "empContactNo": "",
        "empAltContactNo": "",
        "empEmail": "",
        "addressLine1": "",
        "addressLine2": "",
        "pincode": "",
        "city": "",
        "state": "",
        "bankName": "",
        "ifsc": "",
        "accountNo": "",
        "bankBranch": "",
        "salary": 0
    })

    const changeFormValue = (event, key) => {
        setEmployeeObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const getAllEmployee = async () => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
        setEmployeeList(result.data.data);
    }
    const saveEmployee = async () => {
        const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/CreateEmployee", employeeobj);
        if (result.data.result) {
            alert("Employee Created Succefully")
            getAllEmployee() //table mdhe automatic new user refress n karta disel
        } else {
            alert(result.data.message)
        }
    }
    const editEmployee = async (id) => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetEmployeeByEmpId?empid=" + id);
        debugger;
        if (result.data.result) {
            setEmployeeObj(result.data.data)

        } else {
            alert(result.data.message)
        }
    }
    const UpdateEmployee = async () => {
        const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateEmployee", employeeobj);
        debugger;
        if (result.data.data) {
            alert("Employee Update Successfull");
            getAllEmployee();

        } else {
            alert(result.data.massage)
        }
    }
    const deleteEmployee = async (id) => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteEmployeeByEmpId?empid=" + id);
        debugger;
        if (result.data.result) {
            alert("Employee Deleted Succefully")
            getAllEmployee()
        } else {
            alert(result.data.message)
        }
    }
    return (
        <div>
            <div className='container bg-success mt-2'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12   mt-3'>
                        <div className='row'>
                            <div className='col-md-12  d-flex  justify-content-end'>
                                <h4>Employee Creation</h4>
                                <div className='col-md-3'>
                                    <button className='btn btn-sm btn-danger' onClick={getAllEmployee}>Show Employee</button>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-12 col-sm-12 pt-2'>
                                    <table className="table table-bordered">

                                        <thead className='me-2'>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Name</th>
                                                <th>Contact No</th>
                                                <th>Alt No</th>
                                                <th>Email</th>
                                                <th>City</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                employeeList.map((item, index) => {

                                                    return (<tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>  {item.empContactNo} </td>
                                                        <td>  {item.empAltContactNo} </td>
                                                        <td>  {item.empEmail} </td>
                                                        <td>  {item.city} </td>
                                                        <td>
                                                            <button className='btn btn-sm btn-primary' onClick={() => { editEmployee(item.empId) }}>Edit</button>
                                                        </td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12 mt-5'>
                        <div className='row ms-2 p-2'>
                            <div className='row'>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'empName') }} value={employeeobj.empName} className='form-control' placeholder='Enter Name' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'empContactNo') }} value={employeeobj.empContactNo} className='form-control' placeholder='Enter Contact No' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'empAltContactNo') }} value={employeeobj.empAltContactNo} className='form-control' placeholder='Enter Alt Contact' />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'empEmail') }} className='form-control' value={employeeobj.empEmail} placeholder='Enter Email' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'pincode') }} className='form-control' value={employeeobj.pincode} placeholder='Enter Pin Code' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'city') }} className='form-control' value={employeeobj.city} placeholder='Enter City' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'state') }} className='form-control' value={employeeobj.state} placeholder='Enter State' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <textarea onChange={(event) => { changeFormValue(event, 'addressLine1') }} className='form-control' value={employeeobj.addressLine1} placeholder='Enter Address Line 1'></textarea>
                                </div>
                                <div className='col-md-4 p-2'>
                                    <textarea onChange={(event) => { changeFormValue(event, 'addressLine2') }} className='form-control' value={employeeobj.addressLine2} placeholder='Enter Address Line 2'></textarea>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'bankName') }} className='form-control' value={employeeobj.bankName} placeholder=' Enter Bank Name' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'accountNo') }} className='form-control' value={employeeobj.accountNo} placeholder='Enter Acc No' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'ifsc') }} className='form-control' value={employeeobj.ifsc} placeholder='Enter IFSC' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'bankBranch') }} className='form-control' value={employeeobj.bankBranch} placeholder='Enter Branch' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    <input type='text' onChange={(event) => { changeFormValue(event, 'salary') }} className='form-control' value={employeeobj.salary} placeholder='Enter Salary' />
                                </div>
                                <div className='col-md-4 p-2'>
                                    {employeeobj.empId == 0 && <button className='btn btn-primary btn-sm p-2' onClick={saveEmployee}>Add Employee</button>}&nbsp;
                                    {employeeobj.empId !== 0 && <button className='btn btn-primary btn-sm p-2' onClick={UpdateEmployee}>Update</button>}&nbsp;
                                    <button className='btn btn-danger btn-sm p-2' onClick={deleteEmployee}>Delete</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCreation;