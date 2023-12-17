import React, { useEffect, useState } from 'react';
import axios from 'axios';
const SalaryAdvance = () => {

    //select employee from dropdown 
    let [employeeAdvance, setEmployeeAdvance] = useState([]);


    //employee list data store
    let [employeeList, SetEmployeeList] = useState([]);

    useEffect(() => {
        getEmployee();
        getSalaryAdvance();
    }, []);
    const getSalaryAdvance = async () => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance");
        SetEmployeeList(result.data.data);
    }






    const getEmployee = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');
        setEmployeeAdvance(result.data.data);
    }


    //Add Salary Advance
    //create obj
    let [addAdvanceobj, setAddAdvanceObj] = useState({
        "advanceId": 0,
        "employeeId": 0,
        "advanceDate": "",
        "advanceAmount": 0,
        "reason": ""
    })
  
    const addAdvance = async () => {
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAdvance", addAdvanceobj);
            if (result.data.result) {
                alert('Advance Added Successfully');
                getSalaryAdvance();
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }
    
    }
    //Read Input Value
    const changeValue = (event, key) => {
        setAddAdvanceObj(prevobj => ({ ...prevobj, [key]: event.target.value }));
    }

    //edit
    const onEdit = (item) => {
        debugger;
        setAddAdvanceObj(prevObj => ({
            ...prevObj, employeeId: item.employeeId,
            advanceDate: item.advanceDate,
            advanceAmount: item.advanceAmount,
            reason: item.reason

        }))
        debugger;
    }
    //update 
    const updateSalary = async () => {
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance", addAdvanceobj);
            debugger;
            if (result.data.data) {
                alert("Salary Update Successfully");
                getSalaryAdvance();
                debugger;
            } else {
                alert(result.data.massage)
            }
        } catch (error) {
            alert(error.code)
        }
      
    }
    //delete 
  
    const deleteAdvance = async (id) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAdvanceById?advanceid=" + id);
            debugger;
            if (result.data.result) {
                debugger;
                alert("Advance Delete Succefully")
                getSalaryAdvance();
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
                                Salary Advance
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Employee</th>
                                            <th>AdvanceDate </th>
                                            <th>AdvanceAmount </th>
                                            <th>Reason</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            employeeList.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>{item.advanceDate}</td>
                                                        <td>{item.advanceAmount}</td>
                                                        <td>{item.reason}</td>
                                                        <td><button className='btn btn-sm btn-primary' onClick={() => onEdit(item)}>Edit</button></td>
                                                        <td>  <button className='btn btn-danger btn-sm' onClick={() => deleteAdvance(item.advanceId)}>Delete</button></td>

                                                    </tr>
                                                )
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
                                New Salary Advance
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Select Employee</label>
                                        <select className='form-select' onChange={(event) => { changeValue(event, 'employeeId') }} value={addAdvanceobj.employeeId} >
                                            <option value=''>Select Employee</option>
                                            {
                                                employeeAdvance.map((item) => {
                                                    return (<option value={item.empId}> {item.empName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>Advance Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeValue(event, 'advanceDate') }} value={addAdvanceobj.advanceDate} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 pt-1'>
                                        <label>Advance Amount</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeValue(event, 'advanceAmount') }} value={addAdvanceobj.advanceAmount} />
                                    </div>
                                    <div className='col-6'>
                                        <label>Reason</label>
                                        <textarea className='form-control' onChange={(event) => { changeValue(event, 'reason') }} value={addAdvanceobj.reason} />
                                    </div>
                                </div>

                                <div className='row pt-3'>
                                    <div className='col-12'>
                                        <button className='btn btn-secondary'>Reset</button>&nbsp;
                                        <button className='btn btn-success' onClick={addAdvance}>Add Advance</button>&nbsp;
                                        <button className='btn btn-success' onClick={updateSalary}>Update</button>&nbsp;

                                    </div>

                                    {/* <p>{JSON.stringify(addAdvanceobj) }</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryAdvance;