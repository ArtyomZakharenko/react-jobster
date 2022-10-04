import customFetch, { checkForUnauthorizedResponse } from '../../utils/customFetch';
import { logoutUser } from './userSlice';
import { User } from "../../models/states/UserState";
import { RegisterState } from "../../pages/Register";
import { clearValues } from "../job/jobSlice";
import { clearAllJobsState } from "../AllJobs/allJobsSlice";

export const registerUserThunk = async (url: string, user: RegisterState, thunkAPI: any) => {
	try {
		const resp = await customFetch.post(url, user);
		return resp.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const loginUserThunk = async (url: string, user: RegisterState, thunkAPI: any) => {
	try {
		const resp = await customFetch.post(url, user);
		return resp.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const updateUserThunk = async (url: string, user: User, thunkAPI: any) => {
	try {
		const resp = await customFetch.patch(url, user);
		return resp.data;
	} catch (error: any) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export const clearStoreThunk = async (message: string, thunkAPI: any) => {
	try {
		thunkAPI.dispatch(logoutUser(message));
		thunkAPI.dispatch(clearAllJobsState());
		thunkAPI.dispatch(clearValues());
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
};
