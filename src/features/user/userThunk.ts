import customFetch from '../../utils/customFetch';
import { logoutUser } from './userSlice';
import { User } from "../../models/states/UserState";
import { RegisterState } from "../../pages/Register";

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
		if (error.response.status === 401) {
			thunkAPI.dispatch(logoutUser(null));
			return thunkAPI.rejectWithValue('Unauthorized access. Logging out...');
		}
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
