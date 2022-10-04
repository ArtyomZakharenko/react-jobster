import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { AllJobState, FilterState } from "../../models/states/AllJobState";

const initialFiltersState: FilterState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState: AllJobState = {
	isLoading: false,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
	'allJobs/getJobs',
	async (_, thunkAPI: any) => {
		try {
			const resp = await customFetch.get(`/jobs`, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			});

			return resp.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isLoading = true;
		},
		hideLoading: (state) => {
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllJobs.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getAllJobs.fulfilled, (state, action) => {
			state.isLoading = false;
			state.jobs = action.payload.jobs;
			state.totalJobs = action.payload.totalJobs;
			state.numOfPages = action.payload.numOfPages;
		});
		builder.addCase(getAllJobs.rejected, (state, action) => {
			state.isLoading = false;
			toast.error(action.payload as string);
		});
	}
});


export const {
	showLoading,
	hideLoading,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
