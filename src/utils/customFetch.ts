import axios from "axios";
import { clearStore } from '../features/user/userSlice';
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

customFetch.interceptors.request.use(
	async (config) => {
		const user = getUserFromLocalStorage();
		if (user) {
			// @ts-ignore
			config.headers.common['Authorization'] = `Bearer ${user.token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
	if (error.response.status === 401) {
		thunkAPI.dispatch(clearStore(undefined));
		return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
	}
	return thunkAPI.rejectWithValue(error.response.data.msg);
};


export default customFetch;
