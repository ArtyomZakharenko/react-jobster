export interface Job {
	position: string;
	company: string;
	location: string;
	type: string;
	status: string;
}

export interface JobState extends Job {
	isLoading: boolean;
	typeOptions: string[];
	statusOptions: string[];
	isEditing: boolean;
	editId: string;
}


