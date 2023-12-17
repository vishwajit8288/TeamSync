import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeAttendance = () => {


    let [attendanceData, setAttendanceData] = useState([]);//1
    let [attendanceObj, setAttendanceObj] = useState({//2
        "attendanceId": 0,
        "employeeId": 0,
        "attendanceDate": "",
        "inTime": "",
        "outTime": "",
        "isFullDay": false
    });
    let [employeeList, setEmployeeList] = useState([]);//3
    let [isLoader, setIsLoader] = useState(true); //4

    useEffect(() => {
        getAllAttendance();
        getEmployee();
    }, [])

    const changeFormValue = (event, key) => {
        setAttendanceObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const changeFullDay = (event) => {
        setAttendanceObj(prevObj => ({ ...prevObj, IsFullDay: event.target.checked }))
    }

    const getAllAttendance = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendance');
        setAttendanceData(result.data.data);
        setIsLoader(false)
    }
    const getEmployee = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');
        setEmployeeList(result.data.data);
    }

    const saveAttendance = async () => {
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAttendance", attendanceObj);
            debugger;
            if (result.data.result) {
                alert('Attendance Added');
                getAllAttendance();
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }

    }
    const onEdit = (item) => {
        try {
            setAttendanceObj(prevObj => ({
                ...prevObj, attendanceId: item.attendanceId,
                employeeId: item.employeeId,
                attendanceDate: item.attendanceDate,
                inTime: item.inTime,
                outTime: item.outTime,
                isFullDay: item.isFullDay

            }))

        } catch (error) {
            alert('Error Occuored');
        }


    }

    const updateAttendance = async () => {
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAttendance", attendanceObj);
            debugger;
            if (result.data.result) {
                debugger;
                alert("Attendance Update Successfull");
                getAllAttendance();

            } else {
                alert(result.data.massage)
            }

        } catch (error) {
            alert(error.code)
        }

    }

    const deleteAttendance = async (id) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById?attendanceId=" + id);
            debugger;
            if (result.data.result) {
                alert("Attendance Deleted Succefully")
                getAllAttendance();
            } else {
                alert(result.data.message)
            }
        }
        // const reset = () => {
        //     setAttendanceObj({
        //         "attendanceId": 0,
        //         "employeeId": 0,
        //         "attendanceDate": "",
        //         "inTime": "",
        //         "outTime": "",
        //         "isFullDay": false
        //     })
        // }



    }
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                Attendance List
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Employee </th>
                                            <th>Contact No</th>
                                            <th>Attendance Date</th>
                                            <th>In-Time</th>
                                            <th>Out-time</th>
                                            <th>Is Full Day</th>
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
                                    {
                                        isLoader == false && <tbody>
                                            {
                                                attendanceData.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>{item.empContactNo}</td>
                                                        <td>{item.attendanceDate}</td>
                                                        <td>{item.inTime}</td>
                                                        <td>{item.outTime}</td>
                                                        <td>{item.isFullDay ? 'Full Day' : 'Half day'}</td>
                                                        <td><button className='btn btn-primary btn-sm' onClick={() => { onEdit(item) }}>Edit</button></td>
                                                        <td><button className='btn btn-danger btn-sm' onClick={() => { deleteAttendance(item.attendanceId) }}>Delete</button></td>
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
                                New Attendance
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Select Employee</label>
                                        <select className='form-select' onChange={(event) => { changeFormValue(event, 'employeeId') }} value={attendanceObj.employeeId}>
                                            <option value=''>Select Employee</option>
                                            {
                                                employeeList.map((item) => {
                                                    return (<option value={item.empId}> {item.empName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>Select Date</label>
                                        <input type='date' onChange={(event) => { changeFormValue(event, 'attendanceDate') }} value={attendanceObj.attendanceDate} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>In-Time</label>
                                        <input type='time' onChange={(event) => { changeFormValue(event, 'inTime') }} value={attendanceObj.inTime} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>Out-time</label>
                                        <input type='time' onChange={(event) => { changeFormValue(event, 'outTime') }} value={attendanceObj.outTime} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Is Full Day</label>
                                        <input type='checkbox' onChange={(event) => { changeFullDay(event, 'isFullDay') }} checked={attendanceObj.isFullDay} />
                                    </div>
                                </div>
                                <div className='row pt-3'>
                                    <div className='col-12'>
                                        <button className='btn btn-secondary' >Reset</button>&nbsp;
                                        <button className='btn btn-success' onClick={saveAttendance}>Save Attendance</button>&nbsp;
                                        <button className='btn btn-success' onClick={updateAttendance}>Update</button>&nbsp;

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

export default EmployeeAttendance;


