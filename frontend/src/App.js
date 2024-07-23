import Home from './components/Home'
import './App.css';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import Assessment from './components/Assessment'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/submission" element = {<Assessment/>} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} /> 
  
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
