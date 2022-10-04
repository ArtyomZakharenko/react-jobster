import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from "../../store";
import { ChangeEvent, MouseEvent, useEffect } from "react";
import { handleChange, clearValues, createJob, editJob } from "../../features/job/jobSlice";
import { Job } from "../../models/states/JobState";

function AddJob() {
	const { user } = useSelector((store: RootState) => store.user);
	const {
		isLoading,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		isEditing,
		editJobId,
	} = useSelector((store: RootState) => store.job);
	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!position || !company || !jobLocation) {
			toast.error('Please fill out all fields');
			return;
		}
		if (isEditing) {
			dispatch(
				editJob({
					jobId: editJobId,
					job: { position, company, jobLocation, jobType, status },
				})
			);
			return;
		}
		dispatch(createJob({ position, company, jobLocation, jobType, status } as Job));
	};
	const handleJobInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	useEffect(() => {
		if (!isEditing) {
			dispatch(handleChange({ name: 'jobLocation', value: user.location }));
		}
	}, []);

	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>

				<div className='form-center'>
					{/* position */}
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					{/* company */}
					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					{/* jobLocation */}
					<FormRow
						type='text'
						name='jobLocation'
						labelText='job location'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					{/* status */}
					<FormRowSelect
						name='status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>
					{/* job type*/}
					<FormRowSelect
						name='jobType'
						labelText='job type'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>
					<div className='btn-container'>
						<button
							type='button'
							className='btn btn-block clear-btn'
							onClick={() => dispatch(clearValues())}
						>
							clear
						</button>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							onClick={handleSubmit}
							disabled={isLoading}
						>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
}

export default AddJob;
