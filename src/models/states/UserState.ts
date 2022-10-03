export interface UserState {
	user: User | null;
	isLoading: boolean;
}

export interface User {
	name: string;
	lastName: string;
	email: string;
	location: string;
	token: string;
}
