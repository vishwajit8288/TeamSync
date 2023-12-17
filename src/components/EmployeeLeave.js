import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeLeave = () => {
    let [empleaves, setEmpLeaves] = useState([]);//1 variable  to store array to display in table
    // let [isLoader, setIsLoader] = useState(true);
    let [employeeLeave, setEmployeeLeave] = useState([]);//3 one more variable to store another array

    //which we are going to bind to dropdwon
    let [empleaveobj, setEmpLeaveObj] = useState({//2variable  to store object (post object)
        //if you have another primary key in ur object 
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
    })
    useEffect(() => {
        getAllLeave();
        getEmployee();
    }, []);

    const changeFormValue = (event, key) => {
        setEmpLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const getAllLeave = async () => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves");
        setEmpLeaves(result.data.data)
    }

    const getEmployee = async () => {

        const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');

        setEmployeeLeave(result.data.data);
    }

    const addLeave = async () => {
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddLeave", empleaveobj);
            debugger;
            if (result.data.result) {
                debugger;
                alert('Leave Added Successfull');
                getAllLeave()
                debugger;
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }

    }
    //edit
    // const onEdit = async (id) => {
    //     const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeavesByEmpId?empid" + id);
    //     debugger;
    //     if (result.data.result) { //result.data mdhe purn object bhetla
    //         setEmpLeaveObj(result.data.data)
    //         debugger;

    //     } else {
    //         alert(result.data.message)
    //     }
    // }
    const onEdit = (item) => {
        try {
            setEmpLeaveObj(prevObj => ({
                ...prevObj, leaveId: item.leaveId,
                employeeId: item.employeeId,
                leaveDate: item.leaveDate,
                leaveReason: item.leaveReason,
                noOfFullDayLeaves: item.noOfFullDayLeaves,
                noOfHalfDayLeaves: item.noOfHalfDayLeaves

            }))

        } catch (error) {
            alert('Error Occuored');
        }
    }
    //update 
    const updateLeave = async () => {
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeave", empleaveobj);
            debugger;
            if (result.data.result) {
                alert("Leave  Update Successfully");
                getAllLeave();
                debugger;
            } else {
                alert(result.data.massage)
            }
        } catch (error) {
            alert(error.code)
        }

    }

    const deleteLeave = async (id) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteLeaveById?leaveid=" + id);
            debugger;
            if (result.data.result) {
                debugger;
                alert("Leave Delete Succefully")
                getAllLeave();
            } else {
                alert(result.data.message)
            }
        }

    }
    const reset = () => {
        setEmpLeaveObj({
            "leaveId": 0,
            "employeeId": 0,
            "leaveDate": "",
            "leaveReason": "",
            "noOfFullDayLeaves": 0,
            "noOfHalfDayLeaves": 0
        })
    }


    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                Employee Leave
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Employee </th>
                                            <th>LeaveDate </th>
                                            <th>LeaveReason</th>
                                            <th>Full Day Leaves</th>
                                            <th>Half Day Leaves</th>
                                            <th>Edit</th>
                                            <th>Delete</th>


                                        </tr>
                                    </thead>
                                  
                                    
                                   
                                  <tbody>
                                        {
                                            empleaves.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.empName}</td>
                                                    <td>{item.leaveDate}</td>
                                                    <td>{item.leaveReason}</td>
                                                    <td>{item.noOfFullDayLeaves}</td>
                                                    <td>{item.noOfHalfDayLeaves}</td>
                                                   
                                                        <td>
                                                            <td><button className='btn btn-sm btn-primary' onClick={() => { onEdit(item) }}>Edit</button></td>
                                                        </td>
                                                        <td>
                                                            <td>  <button className='btn btn-danger btn-sm' onClick={() => deleteLeave(item.leaveId)}>Delete</button></td>
                                                        </td>
                                                   
                                                </tr>)

                                            })
                                        }
                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                New Leave
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Select Employee</label>
                                        <select className='form-select' onChange={(event) => { changeFormValue(event, 'employeeId') }} value={empleaveobj.employeeId}>
                                            <option value=''>Select Employee</option>
                                            {
                                                employeeLeave.map((item) => {
                                                    return (<option value={item.empId}> {item.empName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>Select Leave Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeFormValue(event, 'leaveDate') }} value={empleaveobj.leaveDate} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>LeaveReason</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'leaveReason') }} value={empleaveobj.leaveReason} />
                                    </div>
                                    <div className='col-6'>
                                        <label>No Of Full Day Leaves</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'noOfFullDayLeaves') }} value={empleaveobj.noOfFullDayLeaves} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>No Of Half Day Leaves</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'noOfHalfDayLeaves') }} value={empleaveobj.noOfHalfDayLeaves} />
                                    </div>
                                </div>
                                <div className='row pt-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-secondary' onClick={reset}>Reset</button>
                                        </div>
                                        <div className='col-6'>
                                        {empleaveobj.leaveId == 0 && <button className='btn btn-success' onClick={addLeave}>Save Leave</button>}
                                       {empleaveobj.leaveId !== 0 &&  <button className='btn btn-warning' onClick={updateLeave}>Update</button>}
                                        {/* <p>{JSON.stringify(empleaveobj) }</p> */}
                                        </div>
                                      
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLeave;