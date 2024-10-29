import React, { useState } from "react";
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

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={authToken ? <Navigate to='/dashboard'/>:<Navigate to='/login'/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
          <Route path='/dashboard' element={<PrivateRoute>
            <Dashboard/>
          </PrivateRoute>}/>
          <Route path='/form' element={<PrivateRoute>
            <CreateForm/>
          </PrivateRoute>}/>

          {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <Signup />
              </PrivateRoute>
            }
          /> */}

          {/* If the user is not authenticated, they will be redirected to the login page */}
          <Route path="*" element={ <NotFound/>} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
