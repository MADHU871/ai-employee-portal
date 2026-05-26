import './App.css';
import { useEffect, useState } from 'react';
import Login from './Login';

function App() {

  const [employees, setEmployees] = useState([]);

  const [token, setToken] = useState(

    localStorage.getItem('token')
  );

  const [role, setRole] = useState(

    localStorage.getItem('role')
  );

  useEffect(() => {

    if (token) {

      fetch('http://localhost:5001/employees', {

        headers: {

          Authorization: `Bearer ${token}`
        }
      })

      .then(response => response.json())

      .then(data => setEmployees(data));
    }

  }, [token]);

  if (!token) {

    return <Login setToken={setToken} setRole={setRole} />;
  }

  return (

    <div className="container">

      <h1>AI Employee Management Portal</h1>

      <h2>Logged in as: {role}</h2>

      <button onClick={() => {

        localStorage.clear();

        window.location.reload();

      }}>
        Logout
      </button>

      <div className="dashboard">

        <div className="card">
          <h2>Total Employees</h2>
          <p>120</p>
        </div>

        <div className="card">
          <h2>Active Employees</h2>
          <p>110</p>
        </div>

        <div className="card">
          <h2>Leave Requests</h2>
          <p>12</p>
        </div>

        <div className="card">
          <h2>HR Messages</h2>
          <p>5</p>
        </div>

      </div>

      <h2>Employee List</h2>

      {

        employees.map(emp => (

          <div className="employee-card" key={emp.id}>

            <h3>{emp.name}</h3>

            <p>{emp.role}</p>

          </div>

        ))
      }

    </div>
  );
}

export default App;