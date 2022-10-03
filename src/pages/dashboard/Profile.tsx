import { ChangeEvent, FormEvent, useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from "../../store";
import { updateUser } from "../../features/user/userSlice";
import { User } from "../../models/states/UserState";


const Profile = () => {
	const { isLoading, user } = useSelector((store: RootState) => store.user);
	const dispatch = useDispatch<AppDispatch>();

	const [userData, setUserData] = useState({
		name: user?.name || '',
		email: user?.email || '',
		lastName: user?.lastName || '',
		location: user?.location || '',
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { name, email, lastName, location } = userData;

		if (!name || !email || !lastName || !location) {
			toast.error('Please fill out all fields');
			return;
		}
		dispatch(updateUser({ name, email, lastName, location } as User));
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
		const name = e.target.name
		const value = e.target.value
		setUserData({...userData,[name]:value})
	};

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>profile</h3>

				<div className='form-center'>
					<FormRow
						type='text'
						name='name'
						value={userData.name}
						handleChange={handleChange}
					/>
					<FormRow
						type='text'
						labelText='last name'
						name='lastName'
						value={userData.lastName}
						handleChange={handleChange}
					/>
					<FormRow
						type='email'
						name='email'
						value={userData.email}
						handleChange={handleChange}
					/>
					<FormRow
						type='text'
						name='location'
						value={userData.location}
						handleChange={handleChange}
					/>
					<button className='btn btn-block' type='submit' disabled={isLoading}>
						{isLoading ? 'Please Wait...' : 'save changes'}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default Profile;
