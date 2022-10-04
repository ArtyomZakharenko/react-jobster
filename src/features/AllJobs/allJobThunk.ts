import customFetch from '../../utils/customFetch';

export const getAllJobsThunk = async (_:any, thunkAPI: any) => {
	const { page, search, searchStatus, searchType, sort } =
		thunkAPI.getState().allJobs;

	let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
	if (search) {
		url = url + `&search=${search}`;
	}
	try {
		const resp = await customFetch.get(url);

		return resp.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const showStatsThunk = async (_: any, thunkAPI: any) => {
	try {
		const resp = await customFetch.get('/jobs/stats');
		return resp.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
