import { User } from "../models/states/UserState";

export const addUserToLocalStorage = (user: User): void => {
	localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = (): void => {
	localStorage.removeItem('user');
};

export const getUserFromLocalStorage = (): User | null => {
	const result = localStorage.getItem('user');
	return result ? JSON.parse(result) : null;
};
