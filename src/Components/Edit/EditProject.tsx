import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectById, updateProject } from '../Store/ProjectSlice';
import './edit.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../Store/index';
import { CloseRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../Store/react-hooks';

const EditProject: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projects = useAppSelector((state: RootState) => state.projects.projects); // Assuming this is an array
  const editProjectStatus = useAppSelector((state: RootState) => state.projects.EditProjectStatus);

  const [projectDetails, setProjectDetails] = useState({
    projectname: '',
    overview: '',
    startby: '',
    dueby: '',
    status: '',
  });

  useEffect(() => {
    if (id) {
      dispatch<any>(fetchProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (projects.length > 0 && id) {
      const foundProject = projects.find(p => p._id === id);
      if (foundProject) {
        setProjectDetails({
          projectname: foundProject.projectname,
          overview: foundProject.detail,
          startby: foundProject.startby,
          dueby: foundProject.dueby,
          status: foundProject.status,
        });
      }
    }
  }, [projects, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProjectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (id) {
      dispatch<any>(updateProject({ ...projectDetails, _id: id })).then(() => {
        if (editProjectStatus === 'succeeded') {
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        }
      });
    } else {
      console.error("Project ID is undefined");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  if (projects.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="project-container" data-testid='editProject'>
      <button type="submit" className='cancel-edit' onClick={handleCancel} data-testid='Cancel'>
        <CloseRounded />
      </button>

      <ToastContainer />
      <div className="project-header">
        <div>
          <div className='statusdiv'>Status</div>
          <div className="status open">
            <select
              name="status"
              value={projectDetails.status}
              onChange={handleChange}
              className='dropdown'
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <span className="due-date">Due by:
          <div>
            <input
              type='datetime-local'
              className='duedate'
              name='dueby'
              value={projectDetails.dueby}
              onChange={handleChange}
              data-testid='end'
            />
          </div>
        </span>
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
          placeholder='project-overview'
          value={projectDetails.overview}
          onChange={handleChange}
        ></textarea>
        <span className="start-date">Start by:
          <input
            type='datetime-local'
            className='start'
            name='startby'
            value={projectDetails.startby}
            onChange={handleChange}
            data-testid='start'
          />
        </span>
      </div>
      <button className='add-btn' onClick={handleSubmit}>Update Project</button>
    </div>
  );
}

export default EditProject;
