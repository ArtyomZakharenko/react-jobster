import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AllJobState, FilterState } from "../../models/states/AllJobState";
import { getAllJobsThunk, showStatsThunk } from "./allJobThunk";

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
	stats: {
		interview: 0,
		declined: 0,
		pending: 0,
		offer: 0,
	},
	monthlyApplications: [],
	...initialFiltersState,
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

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
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			// @ts-ignore
			state[name] = value;
		},
		clearFilters: (state) => {
			return { ...state, ...initialFiltersState };
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsState: () => initialState,
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
		builder.addCase(showStats.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(showStats.fulfilled, (state, action) => {
			state.isLoading = false;
			state.stats = action.payload.defaultStats;
			state.monthlyApplications = action.payload.monthlyApplications;
		});
		builder.addCase(showStats.rejected, (state, action) => {
			state.isLoading = false;
			toast.error(action.payload as string);
		});
	}
});


export const {
	showLoading,
	hideLoading,
	handleChange,
	clearFilters,
	changePage,
	clearAllJobsState
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
