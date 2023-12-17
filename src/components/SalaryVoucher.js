import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SalaryVoucher = () => {
    let [salaryVoucher, setsalaryVoucher] = useState([]);
    let [employeeLeave, setEmployeeLeave] = useState([]);
    let [voucherObj, setVoucherObj] = useState({
        "salaryId": 0,
        "employeeId": 0,
        "salaryDate": "",
        "presentDays": 0,
        "salaryAmount": 0,
        "totalAdvance": 0
    })
    useEffect(() => {
        getSalaryVoucher()
        getEmployee()
    }, [])
    const changeValue = (event, key) => {
        setVoucherObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    }
    const getSalaryVoucher = async () => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalary");
        setsalaryVoucher(result.data.data);
    }
    const addSalary = async () => {
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddSalary", voucherObj);
            debugger;
            if (result.data.result) {
                debugger;
                alert('Salary Added Successfull');
                getSalaryVoucher()
                debugger;
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }
      

    }
    const getEmployee = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');
        setEmployeeLeave(result.data.data);

    }


    //edit
    const onEdit = (item)=> {
        setVoucherObj(prevObj => ({...prevObj,salaryId:item.salaryId,
            employeeId:item.employeeId, 
            salaryDate:item.salaryDate, 
            presentDays:item.presentDays,
            salaryAmount:item.salaryAmount,
            totalAdvance:item.totalAdvance,
        
            
        }))
        
    }
//delete

const deleteVoucher = async (id) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteSalaryById?salaryid=" + id);
        debugger;
        if (result.data.result) {
            debugger;
            alert("Voucher Delete Succefully")
            getSalaryVoucher();
        } else {
            alert(result.data.message)
        }
    }
   
}
//Update
const updateSalaryVoucher = async()=>{
    try {
        const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateSalary",voucherObj);
        debugger;
        if (result.data.data) {
            alert("Salary Voucher Update Successfully");
            getSalaryVoucher();
            debugger;
        } else {
            alert(result.data.massage)
        }
    } catch (error) {
        alert(error.code)
    }
    
}




    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                Salary Vouchers
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Employee Name</th>
                                            <th>Salary Date </th>
                                            <th>Present Days</th>
                                            <th>Salary Amountnt Days</th>
                                            <th>Total Advance </th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            salaryVoucher.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>{item.salaryDate}</td>

                                                        <td>{item.presentDays}</td>
                                                        <td>{item.salaryAmount}</td>
                                                        <td>{item.totalAdvance}</td>
                                                        <td><button className='btn btn-sm btn-primary' onClick={() => { onEdit(item) }}>Edit</button></td>
                                                         <td>  <button className='btn btn-danger btn-sm' onClick={() => deleteVoucher(item.salaryId)}>Delete</button></td> 

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
                                        <select className='form-select' onChange={(event) => { changeValue(event, 'employeeId') }} value={voucherObj.employeeId} >
                                            <option value=''>Select Employee</option>
                                            {
                                                employeeLeave.map((item) => {
                                                    return (<option value={item.empId}> {item.empName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>Salary Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeValue(event, 'salaryDate') }} value={voucherObj.salaryDate} />
                                    </div>
                                    <div className='col-6'>
                                        <label>Present Days</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeValue(event, 'presentDays') }} value={voucherObj.presentDays} />
                                    </div>
                                    <div className='col-6'>
                                        <label>Present Salary Amount</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeValue(event, 'salaryAmount') }} value={voucherObj.salaryAmount} />
                                    </div>
                                </div>
                                <div className='row'>
                               
                                    <div className='col-6 pt-1'>
                                        <label>Total Advance</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeValue(event, 'totalAdvance') }} value={voucherObj.totalAdvance} />
                                    </div>
                                   
                                   
                                    
                                </div>

                                <div className='row pt-3'>
                                    <div className='col-12'>
                                        <button className='btn btn-secondary'>Reset</button>&nbsp;
                                        <button className='btn btn-success' onClick={addSalary}>Add Salary</button>&nbsp;
                                         <button className='btn btn-success' onClick={updateSalaryVoucher}>Update</button>&nbsp;

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

export default SalaryVoucher;