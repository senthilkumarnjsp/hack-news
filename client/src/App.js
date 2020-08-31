import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [employee, setEmployee] = useState(null);

  // Method to set the employee ID to provide the same to all components
  const handleEmployeeChange = (user) => {
    setEmployee(user.employeeID);
    console.log(
      `User value received is ${user} and the employee state set to ${employee}`
    );
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Login handleUser={handleEmployeeChange} />}
          />
          <Route path="/home" render={() => <Home employee={employee} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
