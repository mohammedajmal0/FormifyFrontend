import React, { useState,useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";




import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import CreateForm from "./components/CreateForm";


const App = () => {
  // const [view, setView] = useState('generator');
  const {authToken}=useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  useEffect(() => {
    // Sync `isAuthenticated` state with `authToken`
    setIsAuthenticated(!!authToken);
  }, [authToken]);

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
          <Route path='/dashboard' element={<PrivateRoute>
            <Dashboard/>
          </PrivateRoute>}/>
          <Route path='/form/:formId?' element={<PrivateRoute>
            <CreateForm/>
          </PrivateRoute>}/>

          {/* If the user is not authenticated, they will be redirected to the login page */}
          <Route path="*" element={ <NotFound/>} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
