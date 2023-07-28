import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate} from "react-router-dom"
import Login from './Login';
import HomeLayout from './HomeLayout';
import OrderDetails from './OrderDetails';
import IncomingEmail from './IncomingEmail';
import InventoryStatus from './InventoryStatus';
import GenerateReport from './GenerateReport';
import OrderRejection from './OrderRejection';
import { AuthProvider } from './AuthContext';
import Home from './Home';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>

    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate replace to={"/login"}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="approval" element={<HomeLayout pageTitle='Order Approval'><IncomingEmail/></HomeLayout>}/>
        <Route path="order/:orderID" element={<OrderDetails/>}/>
        
        <Route path="tempDA" element={<HomeLayout pageTitle='Incoming Email'><IncomingEmail/></HomeLayout>}/>
        <Route path="tempOrder" element={<OrderDetails/>}/>
        <Route path="tempApproval" element={<HomeLayout pageTitle='Order Approval'><IncomingEmail/></HomeLayout>}/>
        <Route path="tempInventory" element={<HomeLayout pageTitle='Inventory Status'><InventoryStatus/></HomeLayout>}/>
        <Route path="report" element={<HomeLayout pageTitle='Generate Report'><GenerateReport/></HomeLayout>}/>
        <Route path="reject" element={<HomeLayout pageTitle='Order Rejection'><OrderRejection/></HomeLayout>}/>

      </Routes>
    </Router>
    </AuthProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
