import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject } from '../Store/ProjectSlice';
import './edit.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditProject() {
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((state) => state.projects.projects.find(p => p._id === id));
  const [projectDetails, setProjectDetails] = useState({
    projectname: '',
    startby: '',
    dueby: '',
    status: '',
    overview: ''
  });

  useEffect(() => {
    if (project) {
      setProjectDetails({
        projectname: project.projectname,
        startby: project.startby,
        dueby: project.dueby,
        status: project.status,
       
      });
      
    }
  }, [project]);

  const handleChange = (e) => {
    setProjectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateProject({ ...projectDetails, _id: id })).then(() => {
      
      navigate("/home");
    });
  };

  return (
    <div className="project-container">
      <ToastContainer/>
      <div className="project-header">
        <span className="status open">{projectDetails.status}</span>
        <span className="due-date">Due by: <input type='date' name='dueby' value={projectDetails.dueby} onChange={handleChange} /></span>
      </div>
      <div className="project-body">
        <input
          type="text"
          className="project-title"
          name="projectname"
          value={projectDetails.projectname}
          onChange={handleChange}
        />
        <textarea
          className="project-overview"
          name="overview"
          value={projectDetails.overview}
          onChange={handleChange}
        ></textarea>
        <span className="start-date">Start by: <input type='date' className='start' name='startby' value={projectDetails.startby} onChange={handleChange} /></span>
      </div>
      <button className='add-btn' onClick={handleSubmit}>Update Project</button>
    </div>
  );
}

export default EditProject;
