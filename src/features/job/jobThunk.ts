import customFetch, { checkForUnauthorizedResponse } from '../../utils/customFetch';
import { getAllJobs, hideLoading, showLoading } from "../AllJobs/allJobsSlice";
import { clearValues } from './jobSlice';
import { Job } from "../../models/states/JobState";

export const createJobThunk = async (job: Job, thunkAPI: any) => {
	try {
		const resp = await customFetch.post('/jobs', job);
		thunkAPI.dispatch(clearValues());
		return resp.data;
	} catch (error: any) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export const deleteJobThunk = async (jobId: string, thunkAPI: any) => {
	thunkAPI.dispatch(showLoading());
	try {
		const resp = await customFetch.delete(`/jobs/${jobId}`);
		thunkAPI.dispatch(getAllJobs(undefined));
		return resp.data;
	} catch (error: any) {
		thunkAPI.dispatch(hideLoading());
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export const editJobThunk = async ({ jobId, job }: {jobId: string, job: Job}, thunkAPI: any) => {
	try {
		const resp = await customFetch.patch(`/jobs/${jobId}`, job);
		thunkAPI.dispatch(clearValues());
		return resp.data;
	} catch (error: any) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};
