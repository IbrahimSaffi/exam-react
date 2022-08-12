import './app.css';
import { useDispatch,useSelector } from 'react-redux';
import {Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Feedback from './components/Feedback';

function App() {
  let dispatch = useDispatch()
  let state =useSelector(state=>state.mainSlice)
  return (
  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="sign-up" element={<Signup/>} />
    <Route path="Messages" element={<Profile/>}/>
    <Route path= ":name" element={<Feedback/>}/>
  </Routes>
  );
}

export default App;
