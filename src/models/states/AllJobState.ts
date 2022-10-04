import { Job } from "./JobState";

export interface FilterState {
	search: string;
	searchStatus: string;
	searchType: string;
	sort: string;
	sortOptions: string[];
}

export interface AllJobState extends FilterState {
	isLoading: boolean;
	jobs: JobItem[];
	totalJobs: number;
	numOfPages: number;
	page: number;
	stats: any;
	monthlyApplications: any[];
}

export interface JobItem extends Job {
	_id: string;
	createdAt: string;
	createBy: string;
	updateAt: string;
}

