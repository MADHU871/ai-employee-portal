import './App.css';

import { useEffect, useState } from 'react';

import Login from './Login';

import {

  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt

} from 'react-icons/fa';

function App() {

  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState('');

  const [roleInput, setRoleInput] = useState('');

  const [editId, setEditId] = useState(null);

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

  const addEmployee = () => {

    if (!name || !roleInput) {

      return alert('Enter all fields');
    }

    const newEmployee = {

      id: Date.now(),

      name,

      role: roleInput
    };

    setEmployees([...employees, newEmployee]);

    setName('');

    setRoleInput('');
  };

  const deleteEmployee = (id) => {

    const updatedEmployees = employees.filter(

      emp => emp.id !== id
    );

    setEmployees(updatedEmployees);
  };

  const editEmployee = (emp) => {

    setName(emp.name);

    setRoleInput(emp.role);

    setEditId(emp.id);
  };

  const updateEmployee = () => {

    const updatedEmployees = employees.map(emp => {

      if (emp.id === editId) {

        return {

          ...emp,

          name,

          role: roleInput
        };
      }

      return emp;
    });

    setEmployees(updatedEmployees);

    setName('');

    setRoleInput('');

    setEditId(null);
  };

  return (

    <div className="main-container">

      <div className="sidebar">

        <h2>HR Portal</h2>

        <ul>

          <li>
            <FaUsers /> Employees
          </li>

          <li>
            <FaChartBar /> Analytics
          </li>

          <li>
            <FaCog /> Settings
          </li>

          <li
            onClick={() => {

              localStorage.clear();

              window.location.reload();

            }}
          >
            <FaSignOutAlt /> Logout
          </li>

        </ul>

      </div>

      <div className="content">

        <h1>AI Employee Management Portal</h1>

        <h3>Logged in as: {role}</h3>

        <div className="dashboard">

          <div className="card">

            <h2>Total Employees</h2>

            <p>{employees.length}</p>

          </div>

          <div className="card">

            <h2>Active Employees</h2>

            <p>{employees.length}</p>

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

        <div className="form-section">

          <h2>Employee Management</h2>

          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Employee Role"
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
          />

          {

            editId ? (

              <button onClick={updateEmployee}>
                Update Employee
              </button>

            ) : (

              <button onClick={addEmployee}>
                Add Employee
              </button>
            )
          }

        </div>

        <h2>Employee List</h2>

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Role</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              employees.map(emp => (

                <tr key={emp.id}>

                  <td>{emp.id}</td>

                  <td>{emp.name}</td>

                  <td>{emp.role}</td>

                  <td>

                    <button
                      onClick={() => editEmployee(emp)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;