import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { JobState } from "../../models/states/JobState";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

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

export const createJob = createAsyncThunk('job/createJob', createJobThunk);
export const editJob = createAsyncThunk(	'job/editJob', editJobThunk);
export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

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
