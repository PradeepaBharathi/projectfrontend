import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { toast } from "react-toastify";


const base_url = 'https://projectbackend-p822.onrender.com';
// const base_url ='http://localhost:5000'
interface Project {
  _id: string ;
  projectname: string;
  detail: string;
  startby: string;
  dueby: string;
  status: string;
 
  data?: any;
}

interface EditProject {
  _id: string | undefined;
  projectname: string;
 overview:string;
  startby: string;
  dueby: string;
  status: string;
 
  data?: any;
}
interface ApiResponse<T> {
  data: T;
}

const getToken = () => {
  return localStorage.getItem('token'); 
};

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${base_url}/project/all-project`, {
        method: 'GET',
        headers: {
          'x-auth-token': token
        }
      });
      const data: ApiResponse<Project[]> = await response.json();
      console.log(data);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProject = createAsyncThunk<Project, Project>(
  "projects/addProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${base_url}/project/add-project`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });
      const data: Project = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjectById = createAsyncThunk<Project, string>(
  'projects/fetchProjectById',
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${base_url}/project/project/${id}`, {
        method: 'GET',
        headers: {
          'x-auth-token': token
        }
      });
      const data: Project = await response.json();
      console.log(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk<EditProject, EditProject>(
  'projects/updateProject',
  async (project, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
      const { _id, ...updatedFields } = project;
      const response = await fetch(`${base_url}/project/edit/${_id}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
      });
      const data: EditProject = await response.json();
      return data;
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProjectStatus = createAsyncThunk<{ id: string; status: string }, { id: string; status: string }>(
  'projects/updateProjectStatus',
  async ({ id, status }) => {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(`${base_url}/project/edit/${id}`, {
      method: 'PUT',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    console.log(data.data.status);
    return { id, status: data.data.status };
  }
);
interface ProjectsState {
  loading: boolean;
  projects: Project[];
  editProject:EditProject[]
  error: any;
  addProjectStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  EditProjectStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ProjectsState = {
  loading: false,
  projects: [],
  editProject:[],
  error: null,
  addProjectStatus: 'idle',
  EditProjectStatus:'idle'
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<any>) => {
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
      .addCase(addProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.addProjectStatus = 'succeeded';
        if (action.payload && action.payload.message) {
          toast(action.payload.message);
        }
      })
      .addCase(addProject.rejected, (state,  action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.addProjectStatus = 'failed';
        if (action.payload && action.payload.message) {
          toast.error(action.payload.message);
        }
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
        
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error fetching project: ${action.payload}`);
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.EditProjectStatus = 'pending';

      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index >= 0) {
          state.editProject[index] = action.payload;
        }
        state.EditProjectStatus = 'succeeded';
        console.log(action.payload.message)
        toast.success(action.payload.message);
      })
      .addCase(updateProject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.EditProjectStatus = 'failed';

        state.error = action.payload;
        toast.error(`Error updating project: ${action.payload.message}`);
      });
  },
});

export default projectsSlice.reducer;
