import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

customFetch.interceptors.request.use(
	async (config) => {
		const user = getUserFromLocalStorage();
		if (user) {
			console.log(config.headers);
			// @ts-ignore
			config.headers.common['Authorization'] = `Bearer ${user.token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);


export default customFetch;
