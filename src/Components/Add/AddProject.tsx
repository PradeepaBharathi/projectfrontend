import React, { useState, useEffect } from 'react';

import { addProject } from '../Store/ProjectSlice'; 
import './add.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Store/index';
import { CloseRounded } from '@mui/icons-material';
import { CalendarIcon } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from '../Store/react-hooks';

function AddProject(){
  const[_id,setId] = useState<string>("")
  const [projectname, setProjectname] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [startby, setStartby] = useState<string>('');
  const [dueby, setDueby] = useState<string>('');
  const [status, setStatus] = useState<string>('OPEN');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addProjectStatus = useAppSelector((state:RootState) => state.projects.addProjectStatus);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("btn")
    console.log("Form Submitted: ", { projectname, startby, dueby, status, detail });
    dispatch<any>(addProject({ _id,projectname, detail, startby, dueby, status })).then(()=>{
      if(addProjectStatus == 'succeeded'){
       
        setTimeout(()=>{
          navigate('/home')
        },1000)
      }
     
    })
   
  }

const handleCancel=()=>{
  navigate("/home")
}

  return (
    <div data-testid="project"  className="project-container-add">
    <ToastContainer />
    <div className="project-header">
      <span className="status open">{status}</span>
    </div>
    <div className="project-body-add">
      <input
        type="text"
        className="project-title"
        placeholder="Test Project 1"
        value={projectname}
        onChange={(e) => setProjectname(e.target.value)}
        required
      />
    

<span className="start-date-add">
<CalendarIcon/>
        
        <input  type={startby ? "datetime-local" : "text"} className='sd' value={startby}
         onChange={(e) => setStartby(e.target.value)} 
         onFocus={(e) => e.target.type = "datetime-local"} 
         onBlur={(e) => {
           if (!e.target.value) e.target.type = "text"}}
        required
        />
      
      </span>
      <span className="due-date-add">
      <CalendarIcon/>
        <input type={dueby ? "datetime-local" : "text"}className='dd' value={dueby} onChange={(e) => setDueby(e.target.value)}  onFocus={(e) => e.target.type = "datetime-local"} 
         onBlur={(e) => {
           if (!e.target.value) e.target.type = "text"}} required/>
       
      </span>
    </div>
    <button  type="submit" onClick={handleSubmit} className='add-btn-add' data-testid ='Addbtn'>Add Project</button>
    <button type="submit" className='cancel' onClick={handleCancel} data-testid='Cancel'><CloseRounded/></button>
  </div>
  );
}

export default AddProject;