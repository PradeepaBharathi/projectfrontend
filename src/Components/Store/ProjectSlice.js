import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = 'https://projectbackend-p822.onrender.com';


const getToken = () => {
  return localStorage.getItem('token'); 
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${base_url}/project/all-project`, {
        headers: {
          'x-auth-token': token 
        }
      });
      console.log(response.data); 
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const addProject = createAsyncThunk(
    "projects/addProject",
    async (projectData, { rejectWithValue }) => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No token found");
        }
  
        const response = await axios.post(`${base_url}/project/add-project`, projectData, {
          headers: {
            'x-auth-token': token
          }
        });
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (id, { rejectWithValue }) => {
    try {
        const token = getToken();
        if (!token) {
          throw new Error("No token found");
        }
      const response = await axios.get(`${base_url}/project/project/${id}`,{
        headers: {
            'x-auth-token': token
          }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (project, { rejectWithValue }) => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No token found");
        }
        console.log(project)
        const { _id, ...updatedFields } = project; 
        console.log(_id)
        const response = await axios.put(
          `${base_url}/project/edit/${_id}`,
          updatedFields,
          {
            headers: {
              'x-auth-token': token
            }
          }
        );
  
        console.log(response.data);
        return response.data;
  
      } catch (error) {
        console.error(error.message);
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateProjectStatus = createAsyncThunk('projects/updateProjectStatus', async ({ id, status }) => {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.put(`${base_url}/project/edit/${id}`, { status },{
      headers: {
        'x-auth-token': token
      }
    });
    console.log(response.data.data.status)
    return { id, status: response.data.data.status };
  });

const projectsSlice = createSlice({
    name: "projects",
    initialState: {
      loading: false,
      projects: [],
      error: null,
      addProjectStatus: 'idle', 
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProjects.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
          state.loading = false;
          state.projects = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(addProject.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.addProjectStatus = 'pending'; 
        })
        .addCase(addProject.fulfilled, (state, action) => {
          state.loading = false;
          state.projects.push(action.payload);
          state.addProjectStatus = 'succeeded'; 
          
        })
        .addCase(addProject.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.addProjectStatus = 'failed'; 
          toast.error("Error Occurred!");
        })
              
              .addCase(fetchProjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex(p => p._id === action.payload._id);
                if (index >= 0) {
                  state.projects[index] = action.payload;
                } else {
                  state.projects.push(action.payload);
                }
                toast.success('Project fetched successfully');
              })
              .addCase(fetchProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(`Error fetching project: ${action.payload}`);
              })
              .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex(p => p._id === action.payload._id);
                if (index >= 0) {
                  state.projects[index] = action.payload;
                }
                toast.success('Project updated successfully');
              })
              .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(`Error updating project: ${action.payload}`);
              });
              
    },
  });

export default projectsSlice.reducer;
