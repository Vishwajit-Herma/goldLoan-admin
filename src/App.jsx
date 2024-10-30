import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './Admin';
import Users from './users/Users';
import OneUser from './users/oneuser.jsx/OneUser';
import Messages from './Messages/Messages';
import SignInForm from './AdminSignin/Signinform';
import SignUpForm from './AdminSignup/Signupform';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<OneUser />} />
        <Route path='/users/pending' element={<Users />} />
        <Route path='/login' element={<SignInForm/>}/>
        <Route path='/logup' element={<SignUpForm/>}/>
        <Route path='/message' element={<Messages />} />
      </Routes>
    </Router>
  );
}

export default App;
