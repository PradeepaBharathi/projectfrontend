import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import AddProject from './Components/Add/AddProject';
import EditProject from './Components/Edit/EditProject';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/add' element={<AddProject/>}/>
      <Route path='/edit/:id' element={<EditProject/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
