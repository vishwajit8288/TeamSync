import React, {useEffect, useState } from 'react';
import axios from 'axios';
const EmployeeCreation = () => {
    const apiEndPoint = "https://onlinetestapi.gerasim.in/api/TeamSync/";

    let [employeeList, setEmployeeLIst] = useState([]);
    
    let [employeeObj, setEmployeeObj] = useState({
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
    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setisSaveLoader] = useState(false);

    useEffect(() => {
        getEmployeeList();
    }, [])

    const reset =() => {
        setEmployeeObj({
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
    }
    const changeFormValue = (event, key) => {
        setEmployeeObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const getEmployeeList = async () => {
         
        const result = await axios.get(apiEndPoint + 'GetAllEmployee');
        setIsLoader(false)
        setEmployeeLIst(result.data.data)
    }

    const saveEmployee = async () => {
        setisSaveLoader(true);
        try {
            const result = await axios.post(apiEndPoint + 'CreateEmployee', employeeObj);
            setisSaveLoader(false);
            if (result.data.result) {
                alert('Employee Created');
                getEmployeeList();
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            setisSaveLoader(false);
            debugger;
            alert(error.code)
        }
        
    }

    const onEdit = async (id) => {

        try {
            const result = await axios.get(apiEndPoint + 'GetEmployeeByEmpId?empid=' + id);
            setEmployeeObj(result.data.data)
        } catch (error) {
                alert('Error Occuored');
        }

        
    }

    const updateEmployee = async () => {
        const result = await axios.post(apiEndPoint + 'UpdateEmployee', employeeObj);
        if (result.data.result) {
            alert('Employee Updated');
            getEmployeeList();
        } else {
            alert(result.data.message)
        }
    }

    const onDelete = async (id) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.get(apiEndPoint + 'DeleteEmployeeByEmpId?empid=' + id);
            if (result.data.result) {
                alert('Employee Deleted');
                getEmployeeList();
            } else {
                alert(result.data.message)
            }
        }

    }
    return (
        <div>
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            Employee List
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Contact No</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                {
                                        isLoader && <tbody>
                                            <tr>
                                                <td colSpan={9} className='text-center'>
                                                    <div class="spinner-grow text-muted"></div>
                                                    <div class="spinner-grow text-primary"></div>
                                                    <div class="spinner-grow text-success"></div>
                                                    <div class="spinner-grow text-info"></div>
                                                    <div class="spinner-grow text-warning"></div>
                                                    <div class="spinner-grow text-danger"></div>
                                                    <div class="spinner-grow text-secondary"></div>
                                                    <div class="spinner-grow text-dark"></div>
                                                    <div class="spinner-grow text-light"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                {/* {
                                    isLoader && <tbody>
                                        <tr>
                                            <td colSpan='6' className="text-center">
                                                <img src={myImage} />
                                            </td>
                                        </tr>
                                    </tbody>
                                } */}
                                {
                                    !isLoader && <tbody>
                                        {
                                            employeeList.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1} </td>
                                                    <td> {item.empName} </td>
                                                    <td> {item.empContactNo}</td>
                                                    <td>{item.empEmail} </td>
                                                    <td>{item.city} </td>
                                                    <td><button className='btn btn-sm btn-primary' onClick={() => { onEdit(item.empId) }} > Edit</button> </td>
                                                    <td> <button className='btn btn-sm btn-danger' onClick={() => { onDelete(item.empId) }}> Delete</button></td>
                                                </tr>)
                                            })
                                        }

                                    </tbody>
                                }


                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            New Employee
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Name</label>
                                    <input type='text' value={employeeObj.empName} onChange={(event) => { changeFormValue(event, 'empName') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>Contact No</label>
                                    <input type='text' value={employeeObj.empContactNo} onChange={(event) => { changeFormValue(event, 'empContactNo') }} className='form-control' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Alt Contact</label>
                                    <input type='text' value={employeeObj.empAltContactNo} onChange={(event) => { changeFormValue(event, 'empAltContactNo') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>Email</label>
                                    <input type='text' value={employeeObj.empEmail} onChange={(event) => { changeFormValue(event, 'empEmail') }} className='form-control' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>
                                    <label>Pin Code</label>
                                    <input type='text' value={employeeObj.pincode} onChange={(event) => { changeFormValue(event, 'pincode') }} className='form-control' />
                                </div>
                                <div className='col-4'>
                                    <label>City</label>
                                    <input type='text' value={employeeObj.city} onChange={(event) => { changeFormValue(event, 'city') }} className='form-control' />
                                </div>
                                <div className='col-4'>
                                    <label>State</label>
                                    <input type='text' value={employeeObj.state} onChange={(event) => { changeFormValue(event, 'state') }} className='form-control' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Address Line 1</label>
                                    <textarea className='form-control' value={employeeObj.addressLine1} onChange={(event) => { changeFormValue(event, 'addressLine1') }} ></textarea>
                                </div>
                                <div className='col-6'>
                                    <label>Address Line 2</label>
                                    <textarea className='form-control' value={employeeObj.addressLine2} onChange={(event) => { changeFormValue(event, 'addressLine2') }}  ></textarea>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Bank Name</label>
                                    <input type='text' value={employeeObj.bankName} className='form-control' onChange={(event) => { changeFormValue(event, 'bankName') }} />
                                </div>
                                <div className='col-6'>
                                    <label>Acc No</label>
                                    <input type='text' value={employeeObj.accountNo} className='form-control' onChange={(event) => { changeFormValue(event, 'accountNo') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>IFSC </label>
                                    <input type='text' value={employeeObj.ifsc} className='form-control' onChange={(event) => { changeFormValue(event, 'ifsc') }} />
                                </div>
                                <div className='col-6'>
                                    <label>Branch</label>
                                    <input type='text' value={employeeObj.bankBranch} className='form-control' onChange={(event) => { changeFormValue(event, 'bankBranch') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Salary </label>
                                    <input type='text' value={employeeObj.salary} className='form-control' onChange={(event) => { changeFormValue(event, 'salary') }} />
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-6 text-center'>
                                    <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                </div>
                                <div className='col-6 text-center'>
                                    {
                                        employeeObj.empId == 0 && <button className='btn btn-sm btn-success' onClick={saveEmployee}>
                                             {isSaveLoader && <span class="spinner-border spinner-border-sm"></span>} 
                                             Save Employee</button>
                                    }
                                    {
                                        employeeObj.empId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateEmployee}> Update Employee</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div >
    );
};

export default EmployeeCreation;