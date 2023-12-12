import logo from './logo.svg';
import './App.css';
import {Routes,Route,BrowserRouter, Link} from 'react-router-dom';
import EmployeeCreation from './components/EmployeeCreation';
import EMployeeAttendance from './components/EmployeeAttendance';
import EmployeeLeave from './components/EmployeeLeave';
import SalaryVoucher from './components/SalaryVoucher';
import EmployeeAttendance from './components/EmployeeAttendance';
import SalaryAdvance from './components/SalaryAdvance';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">

                 <Link className="nav-link" to="/employeeCreation" >EmployeeCreation</Link> 
              </li>
              <li className="nav-item">
                 <Link className='nav-link' to="/employeeAttendence">EMployeeAttendance</Link>
              </li>
              <li className="nav-item">
                 <Link className='nav-link' to="/employeeLeave">EmployeeLeave</Link>
              </li>
              <li className="nav-item">
                 <Link className='nav-link' to="/salaryAdvancce">SalaryAdvance</Link>
              </li>
              <li className="nav-item">
                 <Link className='nav-link' to="/salaryVoucher">SalaryVouchers</Link>
              </li>
              
              
            </ul>
          </div>
        </nav>
     <Routes>
          <Route path='/employeeCreation' element={<EmployeeCreation/>}></Route>
          <Route path='/employeeAttendence' element={<EMployeeAttendance/>}></Route>
          <Route path='/employeeLeave' element={<EmployeeLeave/>}></Route>
          <Route path='/salaryAdvancce' element={<SalaryAdvance/>}></Route>
          <Route path='/salaryVoucher' element={<SalaryVoucher/>}></Route>
     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
