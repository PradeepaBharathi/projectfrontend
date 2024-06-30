import React, { useEffect } from 'react';
import './home.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, fetchProjectById } from '../Store/ProjectSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.projects);
const[status,setStatus] =('')
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleRowClick = (id) => {
    dispatch(fetchProjectById(id)).then(() => {
       
      navigate(`/edit/${id}`);
    });
  };

  return (
    <div className='home-container'>
      <button className='new-project-btn' onClick={() => navigate("/add")}>➕ New Project</button>
      <div className='project-list'>
        <div className='count'>{projects.length} Projects</div>
        <table>
          <thead>
            <tr>
              <th>*</th>
              <th>Name</th>
              <th>StartBy</th>
              <th>DueBy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} >
                <td onClick={() => handleRowClick(project._id)}>➡️</td>
                <td>{project.projectname}</td>
                <td>{project.startby}</td>
                <td>{project.dueby}</td>
                <td>
                  <select
                    value={status}
                   key={project._id}
                  
                  >
                  
                   
                    <option value="Open" >Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Review">In Review</option>
                    <option value="Completed">Completed</option>
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
