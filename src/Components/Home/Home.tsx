import React, { useEffect } from 'react';
import './home.css';

import {  fetchProjectById, fetchProjects, updateProjectStatus } from '../Store/ProjectSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Store/index';
import arrow from './arrow.png'
import { useAppDispatch, useAppSelector } from '../Store/react-hooks';
const Home : React.FC=()=> {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { projects } = useAppSelector((state:RootState) => state.projects);


  useEffect(() => {
    dispatch<any>(fetchProjects());
  }, [dispatch]);

  const handleRowClick = (id:string) => {

    dispatch<any>(fetchProjectById(id)).then(() => {
       
      navigate(`/edit/${id}`);
    });
  };
  const handleStatusChange = (id:string, status:string) => {
    dispatch<any>(updateProjectStatus({ id, status }));
    window.location.reload()
  };

  return (
    <div className='home-container' data-testid='home'>
      <button className='new-project-btn' onClick={() => navigate("/add")}>➕ New Project</button>
      <div className='project-list'>

        <table>
          <thead>
            <tr>
              <th>{projects.length} Projects </th>
         
              <th>StartBy</th>
              <th>DueBy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} >
                <td  className='arrow'><span  onClick={() => handleRowClick(project._id)}><img src={arrow} className='arrowimg'/></span> {project.projectname}</td>
               
                <td>{project.startby}</td>
                <td>{project.dueby}</td>
                <td>
                  <select
                    value={project.status}
                   key={project._id}
                   onChange={(e) => handleStatusChange(project._id, e.target.value)}
                   className='options'
                   data-testid='project1-select'
                  >
                  
                   
                    <option value="Open" className='opt'>Open</option>
                    <option value="In Progress"  className='opt'>In Progress</option>
                    <option value="In Review"  className='opt'>In Review</option>
                    <option value="Completed"  className='opt'>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
