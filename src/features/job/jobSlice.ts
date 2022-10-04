import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { Job, JobState } from "../../models/states/JobState";
import { logoutUser } from "../user/userSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "../AllJobs/allJobsSlice";

const initialState: JobState = {
	company: '',
	editJobId: '',
	isEditing: false,
	isLoading: false,
	jobLocation: '',
	position: '',
	status: 'pending',
	statusOptions: ['interview', 'declined', 'pending', 'offer'],
	jobType: 'full-time',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
};

export const createJob = createAsyncThunk(
	'job/createJob',
	async (job: Job, thunkAPI: any) => {
		try {
			const resp = await customFetch.post('/jobs', job, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			});
			thunkAPI.dispatch(clearValues());
			return resp.data;
		} catch (error: any) {
			if (error.response.status === 401) {
				thunkAPI.dispatch(logoutUser(null));
				return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
			}
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const editJob = createAsyncThunk(
	'job/editJob',
	async ({ jobId, job }: {jobId: string, job: Job}, thunkAPI: any) => {
		try {
			const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			});
			thunkAPI.dispatch(clearValues());
			return resp.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const deleteJob = createAsyncThunk(
	'job/deleteJob',
	async (jobId: string, thunkAPI:any) => {
		thunkAPI.dispatch(showLoading());
		try {
			const resp = await customFetch.delete(`/jobs/${jobId}`, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			});
			thunkAPI.dispatch(getAllJobs());
			return resp.data;
		} catch (error: any) {
			thunkAPI.dispatch(hideLoading());
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);


const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state: Draft<JobState>, action ) => {
			const { name, value }: { name: string, value: string} = action.payload;
			// @ts-ignore
			state[name] = value;
		},
		clearValues: () => {
			return {
				...initialState,
				jobLocation: getUserFromLocalStorage()?.location || '',
			};
		},
		setEditJob: (state,  action ) => {
			return { ...state, isEditing: true, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createJob.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createJob.fulfilled, (state) => {
			state.isLoading = false;
			toast.success('Job created successfully!');
		});
		builder.addCase(createJob.rejected, (state, action) => {
			state.isLoading = false;
			toast.error(action.payload as string);
		});
		builder.addCase(editJob.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(editJob.fulfilled, (state) => {
			state.isLoading = false;
			toast.success('Job edited successfully!');
		});
		builder.addCase(editJob.rejected, (state, action) => {
			state.isLoading = false;
			toast.error(action.payload as string);
		});
	}
});

export default jobSlice.reducer;
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
