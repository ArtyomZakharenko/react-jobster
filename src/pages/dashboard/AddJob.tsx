import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from "../../store";
import { ChangeEvent, MouseEvent, useEffect } from "react";
import FormRowSelect from "../../components/FormRowSelect";
import { handleChange, clearValues, createJob } from "../../features/job/jobSlice";
import { Job } from "../../models/states/JobState";

function AddJob() {
	const { user } = useSelector((store: RootState) => store.user);
	const {
		isLoading,
		position,
		company,
		location,
		type,
		typeOptions,
		status,
		statusOptions,
		isEditing,
	} = useSelector((store: RootState) => store.job);
	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!position || !company || !location) {
			toast.error('Please fill out all fields');
			return;
		}
		dispatch(createJob({ position, company, location, type, status } as Job));
	};
	const handleJobInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	useEffect(() => {
		if (!isEditing) {
			dispatch(handleChange({ name: 'location', value: user.location }));
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
					{/* location */}
					<FormRow
						type='text'
						labelText='job location'
						name='location'
						value={location}
						handleChange={handleJobInput}
					/>
					{/* job status */}
					<FormRowSelect
						name='status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>
					{/* job type */}
					<FormRowSelect
						name='type'
						labelText='job type'
						value={type}
						handleChange={handleJobInput}
						list={typeOptions}
					/>
					{/* btn container */}
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
