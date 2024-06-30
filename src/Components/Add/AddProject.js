import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../Store/ProjectSlice'; 
import './add.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddProject() {
  const [projectname, setProjectname] = useState('');
  const [detail, setDetail] = useState('');
  const [startby, setStartby] = useState('');
  const [dueby, setDueby] = useState('');
  const [status, setStatus] = useState('OPEN');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addProjectStatus = useSelector((state) => state.projects.addProjectStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", { projectname, startby, dueby, status, detail });
    dispatch(addProject({ projectname, detail, startby, dueby, status }));
  };

  useEffect(() => {
    if (addProjectStatus === 'succeeded') {
      toast.success("Project added");
      setTimeout(() => {
        navigate('/home');
      }, 1000); 
    }
  }, [addProjectStatus, navigate]);

  return (
    <div className="project-container">
      <ToastContainer />
      <div className="project-header">
        <span className="status open">{status}</span>
      </div>
      <div className="project-body">
        <input
          type="text"
          className="project-title"
          placeholder="Test Project 1"
          value={projectname}
          onChange={(e) => setProjectname(e.target.value)}
        />
        <textarea
          className="project-overview"
          placeholder="Project overview"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
        <span className="start-date">
          Start by: <input type='date' className='start' value={startby} onChange={(e) => setStartby(e.target.value)} />
        </span>
        <span className="due-date">
          Due by: <input type='date' className='due' value={dueby} onChange={(e) => setDueby(e.target.value)} />
        </span>
      </div>
      <button type="submit" onClick={handleSubmit} className='add-btn'>Add Project</button>
    </div>
  );
}

export default AddProject;